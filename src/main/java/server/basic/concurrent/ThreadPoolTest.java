package server.basic.concurrent;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * ThreadPoolExecutor执行策略
 *
 * 线程数量未达到corePoolSize,那么新建一个核心线程执行任务
 * 达到corePoolSize，将任务移入队列尾部等待
 * 队列满则新建非核心线程执行任务
 * 队列满，又达到maxPoolSize那么抛出异常
 */
public class ThreadPoolTest {
     public static void main(String[] args) {
         //单线程Executor在线程死亡的时候会重新唤醒线程
         ExecutorService singleService = Executors.newSingleThreadExecutor();
         //fixed thread pool是固定有线程数量的线程池
         ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5);
         //另外还有两种，分别是缓存，定时任务scheduledThreadPool
//        int i= new Random(44);//伪随机，每次new Random(44)的值是一样的
     }

}
