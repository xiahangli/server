package server.basic.concurrent;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * Created by Administrator on 2019/9/16.
 */
public class ThreadDeadlock {
    //单线程容易死锁,引用为final,不可指向其他引用
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    //
    private class LoadPageTask implements Callable<String> {

        private final String page;

        public LoadPageTask(String page) {
            this.page = page;
        }

        @Override
        public String call() throws Exception {
            //do real load things

            return null;
        }
    }
    public static void main(String[] args) {
        ThreadDeadlock threadDeadlock = new ThreadDeadlock();
        threadDeadlock.deadLock();

    }

    private void deadLock() {
        Future<String> submit = executorService.submit(new RenderPageTask());
        System.out.println("============end");
    }

    //
    private class RenderPageTask implements Callable<String> {

        @Override
        public String call() throws Exception {
            ///提交了两个任务 ====页眉 页脚,
            Future<String> header = executorService.submit(new LoadPageTask("header.html"));
            Future<String> footer = executorService.submit(new LoadPageTask("footer.html"));
            String page = renderPage();
            String res = header.get() + page + footer.get();
            System.out.println("result = "+res);
            return res;
        }

        private String renderPage() {
            return null;
        }
    }
}
