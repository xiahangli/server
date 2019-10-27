package server.basic.concurrent.ch7.timer;

import java.util.Timer;
import java.util.TimerTask;

/**
 *
 * Timer内部主要由两部分组成，任务队列和Timer线程。
 *
 *
 * Priority Queue 使用堆的数据结构实现
 * 任务队列是一个基于堆实现的优先级队列，按照下次执行的时间排优先级。
 *
 *
 * Timer线程负责执行所有的定时任务，需要强调的是，一个Timer对象只有一个Timer线程，所以，对于上面的例子，任务才会被延迟。
 *
 * Timer线程主体是一个循环，
 * 从队列中拿任务，
 *               如果队列中有任务且计划执行时间小于等于当前时间，就执行它，
 *
 *               如果队列中没有任务或第一个任务延时还没到，就睡眠。
 *
 *               如果睡眠过程中队列上添加了新任务且新任务是第一个任务，Timer线程会被唤醒，重新进行检查。
 *
 * 在执行任务之前，Timer线程判断任务是否为周期任务，如果是，就设置下次执行的时间并添加到优先级队列中，
 *               对于固定延时(fixed-delay)的任务，下次执行时间为当前时间加上period，
 *               对于固定频率（fixed-rate）的任务，下次执行时间为上次计划执行时间加上period。
 *
 * 需要强调是，下次任务的计划是在执行当前任务之前就做出了的，
 *              对于固定延时的任务，延时相对的是任务执行前的当前时间，而不是任务执行后，
 *              这与后面讲到的ScheduledExecutorService的固定延时计算方法是不同的，(相对的是任务执行厚的当前时间)
 *              后者的计算方法更合乎一般的期望。
 *
 * 另一方面，对于固定频率的任务，它总是基于最先的计划计划的，所以，很有可能会出现前面例子中一下子执行很多次任务的情况。
 *
 *
 *
 */
public class TimerFixedRate {

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
        //10ms后执行LongRunningTask任务体中的任务
        timer.schedule(new LongRunningTask(), 10);
        //然后执行FixRateTask任务，注意fixrate永远是基于最开始的时间开始算的，那么最开始假设是x秒，由于这个Period是基于x，加上1000ms,那么
        //前面longrunningtask消耗了6秒，而这个fixrate是基于上面longrunningtask的，故会取出x+1000,x+2000,x+3000,x+4000,x+5000的任务，执行，然后
        //x+6000 etc......
        //对于固定频率（fixed-rate）的任务，下次执行时间为上次计划执行时间加上period。
        timer.scheduleAtFixedRate(new FixedRateTask(), 100, 1000);
    }
}