package server.basic.concurrent;

import java.util.Map;
import java.util.concurrent.*;

/**
 * V为计算的结果，A为计算的对象
 *
 */
public class Memorizer3<A, V> implements Computable<A,V>{
    //future中泛型对象是返回值V
    private Map<A, Future<V>> cache = new ConcurrentHashMap<>();//缓存futureTask
    private Computable<A, V> c;

    public Memorizer3(Computable<A, V> c) {
        this.c = c;
    }

    /**
     * 计算的方法
     *
     * @param arg
     */
    public V compute(final A arg) {
        Future<V> f = cache.get(arg);
        if (f == null) {
            Callable<V> callable = new Callable<V>() {
                @Override
                public V call() throws Exception {
                    //做具体的计算任务
                    return c.compute(arg);
                }
            };

            FutureTask<V> ft = new FutureTask<V>(callable);
            f = ft;
            ft.run();//执行call方法，即执行Callable.compute计算方法,这里要保证ft只执行一次，即FutureTask为null的时候才执行

        }
        try {
            cache.put(arg, f);
            return f.get();//得到FutureTask的计算结果，可能会阻塞（未计算完）
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        return null;
    }
}
