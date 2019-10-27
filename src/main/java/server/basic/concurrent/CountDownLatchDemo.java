package server.basic.concurrent;

import java.util.Random;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2019/8/22.
 */

/**
 * 执行任务的任务
 */
class TaskPortion implements Runnable {
    private static int counter = 0;
    private final int id = counter++;
    private final Random rand = new Random(2);
    /**
     * 不可变的引用，该引用不能指向其他对象
     */
    private final CountDownLatch latch;

    public TaskPortion(CountDownLatch latch) {
        this.latch = latch;
    }

    @Override
    public void run() {
        try {
            dowork();
            latch.countDown();// ===============================倒计时减一
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void dowork() throws InterruptedException {
        int i = rand.nextInt(2000);
        int i1 = rand.nextInt(2000);
        TimeUnit.MILLISECONDS.sleep(rand.nextInt(2000));
        
        System.out.println(this + "complete");
    }

    @Override
    public String toString() {
        return String.format("waiting task %1$-3d", id);
    }
}

/**
 * 等待倒计时结束的任务
 */
class WaitTask implements Runnable {
    private final CountDownLatch latch;
    private static int counter = 0;//线程共享
    private final int id = counter++;//先取值然后+1,如果是++i,那么就是从1开始计数

    public WaitTask(CountDownLatch latch) {
        this.latch = latch;
    }

    @Override
    public void run() {
        try {
            System.out.println("Latch barrier is ready for await" + this);
            //并发编程第14章
            latch.await();//==========================await阻塞，直到countdown 计数为0解除阻塞
            //this表示当前对象，而this不是string 所以会调用tostring方法
            System.out.println("Latch barrier passed for " + this);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Override
    public String toString() {
        return String.format("waiting task %1$-3d", id);
    }
}

public class CountDownLatchDemo {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newCachedThreadPool();
        CountDownLatch latch = new CountDownLatch(40);
        for (int i = 0; i < 10; i++) {//等待的任务放到线程池中
            WaitTask waitTask = new WaitTask(latch);
            executorService.execute(waitTask);
        }
        for (int i = 0; i < 40; i++) {//工作任务放到线程池中，用sleep模拟运行任务
            TaskPortion taskPortion = new TaskPortion(latch);
            executorService.execute(taskPortion);
        }
    }
}
