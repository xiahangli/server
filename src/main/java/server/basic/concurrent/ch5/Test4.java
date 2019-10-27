package server.basic.concurrent.ch5;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CyclicBarrier;

public class Test4 {
    static Map<Integer, Thread> threads = new HashMap<>();

    public static void main(String[] args) throws InterruptedException {
        CyclicBarrier barrier = new CyclicBarrier(5, new Runnable() {
            @Override
            public void run() {
                String str = null;
                str.substring(0, 1);//异常，会导致所有的线程收到BarrierBrokenException异常
                System.out.println("发令枪响了，跑！");
            
            }
        });

        for (int i = 0; i < 5; i++) {
            MyThreadx t = new MyThreadx(barrier, "运动员" + i + "号", i);
            threads.put(i, t);
            t.start();
        }

    }

}