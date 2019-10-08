package server.basic.reference;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MapLeaker {
    public ExecutorService exec = Executors.newFixedThreadPool(5);
    public Map<Task, TaskStatus> taskStatus 
        = Collections.synchronizedMap(new HashMap<Task, TaskStatus>());
    private Random random = new Random();
    private enum TaskStatus { NOT_STARTED, STARTED, FINISHED };
    private class Task implements Runnable {
        private int[] numbers = new int[random.nextInt(200)];
        public void run() {
            int[] temp = new int[random.nextInt(10000)];
            taskStatus.put(this, TaskStatus.STARTED);
            doSomeWork();
            taskStatus.put(this, TaskStatus.FINISHED);
        }
		private void doSomeWork() {
			// TODO Auto-generated method stub
            System.out.println("ddd");
        }
    }
    public Task newTask() {
        Task t = new Task();
        taskStatus.put(t, TaskStatus.NOT_STARTED);
        exec.execute(t);
        return t;
    }
    public static void main(String[] args) throws Exception {
   MapLeaker ml = new MapLeaker();
   ml.newTask();
    }
}