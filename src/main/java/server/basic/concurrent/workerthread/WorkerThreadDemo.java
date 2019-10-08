package server.basic.concurrent.workerthread;


import java.util.Queue;
import java.util.concurrent.ArrayBlockingQueue;

/**
 * illustrates a way to structure a worker thread within a thread pool
 * 演示线程池中工作者线程的原理
 */
public class WorkerThreadDemo extends Thread {
    private Queue<Task> taskFromWorkerQueue = new ArrayBlockingQueue<Task>(10);

    public void run() {
        Throwable th = null;
        try {
            while (!isInterrupted()) {
                //从工作队列中国获取task,然后运行task
                runTask(getTaskFromWorkerQueue());
            }
        } catch (Throwable e) {//注意这里使用throwable,为了捕获一些error,而不是exception
            e.printStackTrace();
            th = e;
        } finally {
            threadExited(this,th);
        }
    }

    private void threadExited(WorkerThreadDemo workerThreadDemo, Throwable th) {
        //处理线程退出的清理工作
    }

    private void runTask(Task taskFromWorkerQueue) {
        //run task!
    }

    /**
     * 取队头的元素，并移除，peek不移除
     *
     * @return
     */
    public Task getTaskFromWorkerQueue() {
        return taskFromWorkerQueue.poll();
    }

    private class Task {

    }
}
