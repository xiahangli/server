package server.basic.concurrent.ch5;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CyclicBarrier;

public class Test3 {
static Map<Integer,Thread> threads=new HashMap<>();
    public static void main(String[] args) throws InterruptedException {
        CyclicBarrier barrier = new CyclicBarrier(5, new Runnable() {
            @Override
            public void run() {
                System.out.println("发令枪响了，跑！");

            }
        });

        for (int i = 0; i < 5; i++) {
        MyThreadx t = new MyThreadx(barrier, "运动员" + i + "号", i);
            threads.put(i, t);
            t.start();
        }
        Thread.sleep(500);
        //第0个线程在等在中，调用reset会产生一个BrokenBarrierException异常 ，这个异常会传播到其他的线程中去
        threads.get(0).interrupt();
    }

}