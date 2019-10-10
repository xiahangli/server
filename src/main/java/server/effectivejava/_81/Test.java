package server.effectivejava._81;

import java.util.concurrent.*;

/**
 * Created by Administrator on 2019/10/8.
 */
public class Test {
    private static ConcurrentHashMap<String, String> map = new ConcurrentHashMap<>();
//static volatile int i;
    public static void main(String[] args) {
//        ExecutorService executorService = Executors.newFixedThreadPool(10);
//        Runnable runnable = ()-> {
////            @Override
////            public void run() {
//                System.out.println(Thread.currentThread().getName()+" out "+i++);
////            }
//        };
//        for (int i = 0; i < 10; i++) {
//            executorService.execute(runnable);
//        }
//        TestInterface test = (2)->{};


//        TestClass testClass = new TestClass();
//        testClass.a((s)-> System.out.println());
    }


    public static String intern(String s) {
        String prevValue = map.putIfAbsent(s, s);
        return prevValue == null ? s : prevValue;
    }

    public static String internOpt(String s) {
        String val = map.get(s);//get 做了优化，不到万不得已不需要使用putIfAbsent
        if (val == null) {
            val = map.putIfAbsent(s, s);
            if (val == null) {
                val = s;
            }
        }//else do nothing
        return val;
    }




    /**
     *
     * @param executor 线程池
     * @param concurrency 并发的任务数，这些个数的线程执行
     * @param action 并发执行的任务,这个任务
     * @return 任务执行需要的时间
     */
    public static long time(Executor executor, int concurrency, Runnable action) {
        long duration = 0;
        CountDownLatch ready = new CountDownLatch(concurrency);//优先级最高
        CountDownLatch start = new CountDownLatch(1);
        CountDownLatch done = new CountDownLatch(concurrency);
        for (int i = 0; i < concurrency; i++) {
            executor.execute(() -> {
                //任务体
                ready.countDown();//i加1则ready减1,逐渐解除ready锁
                try {
                    start.await();//将任务体卡住
                    action.run();//运行由外部提供的任务体
                } catch (InterruptedException e) {//shou
                    e.printStackTrace();
                    Thread.currentThread().interrupt();//收到中断通知就将当前的线程中断
                } finally {
                    //最后逐渐解除stop锁
                    done.countDown();
                }
            });
        }
        try {
            ready.await();
            //所有任务体的ready都准备好了以后，可以开始任务，这时候开始计时
            long startTime = System.currentTimeMillis();
            start.countDown();//解除start锁
            done.await();
           duration =System.currentTimeMillis() - startTime;
            System.out.println(duration);

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return duration;
    }
}
