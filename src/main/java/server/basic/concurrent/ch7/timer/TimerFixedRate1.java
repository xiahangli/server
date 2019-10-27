
package server.basic.concurrent.ch7.timer;

import java.util.Timer;
import java.util.TimerTask;

public class TimerFixedRate1 {

    static class LongRunningTask extends TimerTask {
        @Override
        public void run() {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
            }
            System.out.println("long running finished");
        }
    }

    static class FixedRateTask extends TimerTask {

        @Override
        public void run() {
            System.out.println(System.currentTimeMillis());
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Timer timer = new Timer();
        //第一个任务必须先执行完成才能执行第二个任务
        timer.schedule(new LongRunningTask(), 10);
        //固定频率，第二个任务只有在第一个任务执行完后才能执行
        //第二个任务会将第一个任务执行周期的时间段内没有做的任务补回来
        timer.scheduleAtFixedRate(new FixedRateTask(), 100, 1000);
    }
}