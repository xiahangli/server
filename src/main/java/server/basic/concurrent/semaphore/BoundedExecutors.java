package server.basic.concurrent.semaphore;

import java.util.concurrent.*;

/**
 * 使用semaphore限制任务的到达率
 */
public class BoundedExecutors {
    private final Semaphore semaphore;
    private final Executor executor;

    public BoundedExecutors(Executor executor, int bound) {
        this.semaphore = new Semaphore(bound);
        this.executor = executor;
    }


    /**
     * 提交任务
     *
     * @param command 任务体
     */
    public void submitTask(Runnable command) throws InterruptedException {
        //Acquires a permit from this semaphore, blocking until one is available,会阻塞
        semaphore.acquire();//会抛出checked异常,计数器-1,即bound--
        try {
            executor.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        command.run();//延迟提交任务
                    } finally {
                        semaphore.release();//bound++
                    }
                }
            });
        } catch (RejectedExecutionException e) {//
            e.printStackTrace();
            System.out.println("==============================reject");
            semaphore.release();
        }


    }

    public static void main(String[] args) throws InterruptedException {
        ExecutorService executorService = Executors.newCachedThreadPool();
        BoundedExecutors boundedExecutors = new BoundedExecutors(executorService, 3);
        for (int i = 0; i < 30; i++) {
            final int finalI = i;//拷贝一份i变量
            boundedExecutors.submitTask(new Runnable() {
                @Override
                public void run() {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(finalI);
                }
            });
        }
//        for (int i = 0; i < 10; i++) {
//            executorService.execute(new Runnable() {
//                @Override
//                public void run() {
//                    System.out.println("i");
//                }
//            });
//        }
    }
}
