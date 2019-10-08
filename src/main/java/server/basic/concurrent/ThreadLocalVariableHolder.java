package server.basic.concurrent;

import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**

 */

class Accessor implements Runnable {
    private final int id;//id在构造器中赋值

    public Accessor(int nid) {
        id = nid;
    }

    @Override
    public void run() {
        //isInterrupted测试线程是否被中断，不影响变量本省
        while (!Thread.currentThread().isInterrupted()) {
            ThreadLocalVariableHolder.increment();//只要咸亨没有被中断，一直累加这个变量
            System.out.println(this);//输出tostring的值
        }
    }

    public String toString() {
        return "#" + id + ": " + ThreadLocalVariableHolder.get();
    }
}


/**
 * Holder维护了一个
 */
public class ThreadLocalVariableHolder {
    //使用ThreadLocal的正确姿势，一般是静态，保证多个线程可以共同使用
    private static ThreadLocal<Integer> value = new ThreadLocal<Integer>() {
        private Random rand = new Random(44);//伪随机，每次new Random(44)的值是一样的

        @Override
        protected Integer initialValue() {
            return rand.nextInt(1000);//返回随机下一个伪随机数
        }
    };

    /**
     * 静态变量,注意由于ThreadLocal的存在，这里不需要同步方法块
     */
    public static void increment() {
        value.set(value.get() + 1);
    }

    public static int get() {
        return value.get();
    }

    public static void main(String[] arg) throws InterruptedException {
        ExecutorService executorService = Executors.newCachedThreadPool();
        for (int i = 0; i < 5; i++) {
            executorService.execute(new Accessor(i));//execute提交一个新任务
        }
        TimeUnit.MICROSECONDS.sleep(1);
        executorService.shutdownNow();//立马停止，线程池的状态编程SHUTDOWN,不能向线程池中添加任何任务，
    }
}
