package server.basic.concurrent;

/**
 * Created by Administrator on 2019/8/22.
 */


import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.PriorityBlockingQueue;
import java.util.concurrent.TimeUnit;

/**
 * 泛型中放了比较的对象，即当前的优先级任务
 */
class PrioritizedTask implements Runnable, Comparable<PrioritizedTask> {

    private Random rand = new Random(44);

    private static int counter = 0;
    private final int id = counter++;//每个任务的id
    private final int priority;//优先级定义，按照这个来排序PrioritizedTask
    private static List<PrioritizedTask> sequence = new ArrayList<>();//维护优先级任务列表

    public PrioritizedTask(int priority) {
        this.priority = priority;
        sequence.add(this);//每创建一个prioritizedTask,就放到列表中
    }

    /**
     * 降序排列，对比DelayQueueDemo的写法
     *
     * @param o 待比较的对象,上一个对象
     * @return -1代表当前对象比上一个对象小
     * 0代表当前对象和上一个对象相等
     * 1代表当前对象比上一个对象大（根据priority）
     */
    @Override
    public int compareTo(PrioritizedTask o) {
        return priority < o.priority ? 1 : (priority > o.priority ? -1 : 0);
    }

    /**
     * sleep模拟任务运行
     */
    @Override
    public void run() {
        try {
            //线程休眠0~220这个区间的任意值
            TimeUnit.MICROSECONDS.sleep(rand.nextInt(220));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(this);//输出tostring的值，也就是任务的优先级和任务id序号
    }

    public String summary() {
        return " （ " + id + " : " + priority + " ) ";
    }

    @Override
    public String toString() {
        return String.format("[%1$-3d]", priority) + " task " + id;
    }

    static class EndSentinel extends PrioritizedTask {

        private ExecutorService exec;

        public EndSentinel(ExecutorService exec) {
            super(-1);//priority为-1代表是优先级最低的
            this.exec = exec;
        }

        @Override
        public void run() {
            int count = 0;//5个一输出
            for (PrioritizedTask pt : sequence) {
                pt.summary();
                if (++count%5 == 0){
                    System.out.println("");
                }
            }
            System.out.println("shoutdown ");
            exec.shutdownNow();//立即停止
        }
    }
}


/**
 * 生产者,生产任务
 */
class PrioritizedTaskProducer implements Runnable {
    private Random rand = new Random(44);
    /**
     * 无界队列，永远不会阻塞
     */
    private Queue<Runnable> queue;
    private ExecutorService exec;

    public PrioritizedTaskProducer(Queue<Runnable> q, ExecutorService e) {
        queue = q;
        exec = e;
    }

    /**
     * run任务体 1、随机生成一个【0,10】的优先级任务
     *          2、放入优先级最高的任务 优先级为10，放10个，每隔250ms放一个
     *          3、优先级按照由低到高依次放入
     * */
    @Override
    public void run() {
//        System.out.println("===============PrioritizedTaskProducer start");
        for (int i = 0; i < 20; i++) {
            //随机生成一个【0,10】的优先级任务
            int r = rand.nextInt(10);
            queue.add(new PrioritizedTask(r));
            System.out.println("===============PrioritizedTaskProducer task = "+i+" task's pri "+r);
            Thread.yield();//只是让出cpu，不阻塞当前线程，而且只有优先级更高的有能力获取到cpU时间片,这时候消费者可以消费队列里的任务了
        }

        try {
            //放入优先级最高的任务 优先级为10，放10个，每隔250ms放一个
            for (int i = 0; i < 10; i++) {
                TimeUnit.MILLISECONDS.sleep(250);//250ms之后执行任务队列的添加
                queue.add(new PrioritizedTask(10));
                System.out.println("===============PrioritizedTaskProducer ="+i+" task's pri" + 10);
            }

            //优先级按照由低到高依次放入
            for (int i = 0; i < 10; i++) {
                queue.add(new PrioritizedTask(i));
                System.out.println("===============PrioritizedTaskProducer = "+" task's pri " + i);
            }

            queue.add(new PrioritizedTask.EndSentinel(exec));

            System.out.println("===============PrioritizedTaskProducer = 41 task's pri = -1 ");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

/**
 * 消费者，消费生产的任务
 */
class PrioritizedTaskConsumer implements Runnable {

    public PrioritizedTaskConsumer(PriorityBlockingQueue<Runnable> q) {
        this.q = q;
    }

    private final PriorityBlockingQueue<Runnable> q;

    @Override
    public void run() {
        while (!Thread.interrupted()) {
            try {
                q.take().run();//不断从队列中取出任务
//                System.out.println("===============PrioritizedTaskConsumer ");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("finish PrioritizedTaskConsumer");
    }
}

public class PriorityBlockingQueueDemo {

    public static void main(String[] args) {
        ExecutorService executorService = Executors.newCachedThreadPool();

        //这里只需要runable即可，多态性
        PriorityBlockingQueue<Runnable> queue = new PriorityBlockingQueue<>();
        executorService.execute(new PrioritizedTaskProducer(queue,executorService));
        executorService.execute(new PrioritizedTaskConsumer(queue));
    }

}
