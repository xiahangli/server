package server.basic.concurrent.ch5;

import java.sql.SQLOutput;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class MyThread extends Thread {
    private CyclicBarrier cyclicBarrier;
    private String name;
    private int ID;

    public MyThread(CyclicBarrier cyclicBarrier, String name, int ID) {
        super();
        this.cyclicBarrier = cyclicBarrier;
        this.name = name;
        this.ID = ID;

    }

    @Override
    public void run() {
        System.out.println(name + "开始准备");
        try {
            Thread.sleep(ID* 1000);//这里如果不乘以ID,那么所有运动员都不会抛出超时，因为超时时间等不到
            System.out.println(name + "准备完毕！在起跑线等待发令枪");
            try {
                try {
                    System.out.println("=======pos="+ID+"========curs"+System.currentTimeMillis());
                    cyclicBarrier.await(ID * 1000, TimeUnit.MILLISECONDS);//第0个运动员等待超时了，
                    // 会导致所有其他的运动员报BrokenBarrierException

                } catch (TimeoutException e) {
                    // TODO Auto-generated catch block
                    System.out.println("===========pos="+ID+"=======curs"+System.currentTimeMillis());
                    e.printStackTrace();
                }
                System.out.println(name + "跑完了路程！");
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
                System.out.println(name + "看不见起跑线了");
            }
            System.out.println(name + "退场！");
        } catch (InterruptedException e) {

            e.printStackTrace();
        }

    }

}
class Testj {
    public static void main(String[] args) {
        CyclicBarrier barrier = new CyclicBarrier(5, new Runnable() {

            @Override
            public void run() {
                System.out.println("发令枪响了，跑！");

            }
        });
        for (int i = 0; i < 5; i++) {
            new MyThread(barrier, "运动员" + i + "号",i).start();
        }

    }

}