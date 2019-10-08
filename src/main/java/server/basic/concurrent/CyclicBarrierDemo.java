package server.basic.concurrent;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

/**
 * 使用场景：多线程计算数据，最后合并计算结果的场景
 *
 * 对比CountDownLatch
 *   CDL为一次性的，CyclicBarrier是可循环利用的
 *   CDL参与的线程职责可以不一样，有的在等待倒计时，有的在倒计时，CB参与的线程的职责是一样的
 *
 */
public class CyclicBarrierDemo {

    static class TaskThread extends Thread{
        CyclicBarrier cyclicBarrier ;


        public TaskThread(CyclicBarrier barrier){
            this.cyclicBarrier = barrier;
        }

        @Override
        public void run() {
            super.run();
            try {
                Thread.sleep(1000);
                System.out.println(getName()+"到达栅栏A");
                cyclicBarrier.await();//等待所有线程到达栅栏后，执行CyclicBarrier任务
                System.out.println(getName()+"冲出栅栏A");

                Thread.sleep(1500);
                System.out.println(getName()+"到达栅栏B");
                cyclicBarrier.await();
                System.out.println(getName()+"冲出栅栏B");
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        }
    }


    public static void main(String[] args) {
        CyclicBarrier cyclicBarrier = new CyclicBarrier(3, new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName()+"完成最后任务");
            }
        });

        for (int i = 0; i < 3; i++) {
            new TaskThread(cyclicBarrier).start();
        }
    }
}
