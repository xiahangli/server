package server.basic.concurrent;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.*;

/**
 * DelayedTask需要实现Delayed接口
 */
class DelayedTask implements Runnable, Delayed {
    /**
     * 每次新建任务就一直累加，线程共享的变量
     */
    private static int counter = 0;
    /**
     * 每次初始化就固定值
     */
    private final int id = counter++;
    /**
     * 触发任务的时间
     */
    private final long trigger;
    /**
     * ms单位存储,是随机数生成的
     */
    private final int delta;

    private static List<DelayedTask> sequence = new ArrayList<>();

    public DelayedTask(int delayMilliseconds) {
        //given time duration
        //the given unit ,将delta毫秒单位转成nano单位
        this.delta = delayMilliseconds;
        //触发时间是构造函数的时间加上delta时间，即延迟时间
        this.trigger = System.nanoTime() + TimeUnit.NANOSECONDS.convert(delta, TimeUnit.MILLISECONDS);
        sequence.add(this);//将当前的对象放置到列表中
    }

    /**
     * delay的接口定义函数，用来告知延迟到期有多长时间，或者延迟在多长时间之前已经到期，该方法强制我们使用timeutil类因为这就是参数类型
     *
     * @param timeunit 这就是参数类型，
     * @return ms为单位的值
     */
    @Override
    public long getDelay(TimeUnit timeunit) {
        //将ns单位转成ms，即timeunit的单位，
        //希望使用的单位是作为unit参数传进来的，使用它将当前时间与触发时间之间的差作为转换为调用者要求的单位（是使用了策略模式，在这种模式中，算法的一部分是作为参数传递进来的
        return timeunit.convert(trigger - System.nanoTime(), TimeUnit.NANOSECONDS);
    }

    /**
     * 为了排序，需要实现compareTo方法，排序依据是trigger
     * 按照时间的从小到达的延迟顺序来执行
     *
     * @param o
     * @return
     */
    @Override
    public int compareTo(Delayed o) {
        DelayedTask that = (DelayedTask) o;
        if (trigger < that.trigger) return -1;
        if (trigger > that.trigger) return 1;
        return 0;
    }

    @Override
    public void run() {
        System.out.println(this + " is running");
    }

    /**
     * tostring和summery提供了输出格式化
     *
     * @return
     */
    @Override
    public String toString() {
        return String.format("[%1$-4d]", delta) + " task " + id;
    }


    public String summary() {
        return " ( " + id + " , " + delta + " )";
    }

    /**
     * 嵌套类
     * 提供了关闭所有事物的途径，即将其放置为队列的最后一个元素，由于这个任务的作用就是调用线程池的shutdownnow那么就会关闭线程池
     */
    static class EndSentinel extends DelayedTask {
        private ExecutorService exec;

        public EndSentinel(int delay, ExecutorService e) {
            super(delay);
            exec = e;
        }

        @Override
        public void run() {
            for (DelayedTask dt : sequence) {
                System.out.println(dt.summary() + "");
            }
            System.out.println("");
            System.out.println(this + " calling shutdownnow");
            exec.shutdownNow();
        }
    }
}

/**
 * 这个是一个任务消费者，他一直取出队列中的任务消费任务
 */
class DelayedTaskConsumer implements Runnable {

    //DelayQueue是一种优先级队列
    private DelayQueue<DelayedTask> q;

    public DelayedTaskConsumer(DelayQueue<DelayedTask> q) {
        this.q = q;
    }

    @Override
    public void run() {
        while (!Thread.interrupted()) {//只要没有被其他线程通过interrupt方式中断，那就一直取出队头的任务，并运行，一直会做到直到所有任务被消费完
            //take方法移除任务，他有可能会被中断
            try {
                //放入DelayQueue,通过take方法取出时，可根据compareTo方法定制的顺序来优先取出线程执行
                q.take().run();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("finished delaytaskconsumer");
    }
}

/**
 * Created by Administrator on 2019/8/22.
 */
public class DelayQueueDemo {
    public static void main(String[] args) {
        Random rand = new Random(44);
        ExecutorService exec = Executors.newCachedThreadPool();
        DelayQueue<DelayedTask> queue = new DelayQueue<>();
        for (int i = 0; i < 20; i++) {//生成20eg任务，放入到优先级队列，DelayQueue中,这个可以认为是生产者
            queue.put(new DelayedTask(rand.nextInt(5000)));
        }
        queue.add(new DelayedTask.EndSentinel(5000, exec));//用于销毁的
        exec.execute(new DelayedTaskConsumer(queue));//消费者线程一直消费任务

    }

}
