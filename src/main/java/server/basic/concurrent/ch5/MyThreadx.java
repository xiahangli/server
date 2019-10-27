package server.basic.concurrent.ch5;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class MyThreadx extends Thread {
    private CyclicBarrier cyclicBarrier;
    private String name;
    private int ID;

    public MyThreadx(CyclicBarrier cyclicBarrier, String name, int ID) {
        super();
        this.cyclicBarrier = cyclicBarrier;
        this.name = name;
        this.ID=ID;

    }
    @Override
    public void run() {
        System.out.println(name + "开始准备");
        try {
            Thread.sleep(ID*1000);  //不同运动员准备时间不一样，方便模拟不同情况
            System.out.println(name + "准备完毕！在起跑线等待发令枪");
            try {
                cyclicBarrier.await();
                System.out.println(name + "跑完了路程！");
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
                System.out.println(name+"看不见起跑线了");
            }
            System.out.println(name+"退场！");
        } catch (InterruptedException e) {

            e.printStackTrace();
        }

    }

}
 class Test {

    public static void main(String[] args) throws InterruptedException {
        CyclicBarrier barrier = new CyclicBarrier(5, new Runnable() {
            @Override
            public void run() {
                System.out.println("发令枪响了，跑！");

            }
        });

        for (int i = 0; i < 5; i++) {
            new MyThreadx(barrier, "运动员" + i + "号", i).start();
        }
        //延迟了1500ms，这时间内0号选手和1号选手都在准备，
        // 那么这两个选手都会收到BrokenBarrierException异常，只有没有阻塞的线程不受影响
        Thread.sleep(3500);
        barrier.reset();
    }

}