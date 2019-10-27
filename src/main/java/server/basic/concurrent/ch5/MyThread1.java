package server.basic.concurrent.ch5;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class MyThread1 extends Thread {
    private CyclicBarrier cyclicBarrier;
    private String name;

    public MyThread1(CyclicBarrier cyclicBarrier, String name) {
        super();
        this.cyclicBarrier = cyclicBarrier;
        this.name = name;
    }

    @Override
    public void run() {
        System.out.println(name + "开始准备");
        try {
            Thread.currentThread().sleep(5000);
            System.out.println(name + "准备完毕！等待发令枪");
            try {
                cyclicBarrier.await();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        } catch (InterruptedException e) {

            e.printStackTrace();
        }
    }
}
//测试类
 class Test1 {
    public static void main(String[] args) {
        CyclicBarrier barrier = new CyclicBarrier(5, new Runnable() {

            @Override
            public void run() {
                System.out.println("发令枪响了，跑！");

            }
        });
        for (int i = 0; i < 5; i++) {
            new MyThread1(barrier, "运动员" + i + "号").start();

        }

    }

}