package server.basic.concurrent.threadLocal;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * THreadLocal与县城池结合的时候的问题
 */
public class ThreadLocalVariableHolder {
    private static ThreadLocal<Integer> variableHolder = new ThreadLocal<Integer>() {
        @Override
        protected Integer initialValue() {
            return 0;
        }
    };

    public static int getValue() {
        return variableHolder.get();
    }

    public static void remove() {
        variableHolder.remove();
    }

    public static void increment() {
        variableHolder.set(variableHolder.get() + 1);
    }

    public static void main(String[] args) {
        ExecutorService executor = Executors.newCachedThreadPool();
        for (int i = 0; i < 20; i++) {
            executor.execute(() -> {
                try {
                    long threadId = Thread.currentThread().getId();
                    int before = getValue();
                    increment();
                    int after = getValue();
                    //线程池中不要使用threadlocal，会出现before不为0的情况，原因是因为线程池线程复用，复用会复用之前操作过的value对象，导致已经加过一了
                    System.out.println("threadId: " + threadId + ", before: " + before + ", after: " + after);
                } finally {
                    //在任务执行完成时候，需要清理threadlocal
                    variableHolder.remove();
                }
            });
        }

        executor.shutdown();
    }
}