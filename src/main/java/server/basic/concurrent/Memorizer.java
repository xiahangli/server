package server.basic.concurrent;

import java.util.Map;
import java.util.concurrent.*;

/**
 * Created by Administrator on 2019/9/16.
 */
public class Memorizer<A, V> implements Computable<A, V> {

    private final Map<A, Future<V>> cache = new ConcurrentHashMap<>();

    private final Computable<A, V> c;


    public Memorizer(Computable<A, V> c) {
        this.c = c;
    }

    @Override
    public V compute(A arg) {

        while (true) {//死循环保证一直执行
            Future<V> f = cache.get(arg);//get不需要保证原子性
            if (f == null) {
                Callable<V> callable = new Callable<V>() {
                    @Override
                    public V call() throws Exception {
                        return c.compute(arg);
                    }
                };
                FutureTask<V> ft = new FutureTask<V>(callable);
                f = cache.putIfAbsent(arg, f);//再次看一下有没有put成功
                if (f == null) {//原来没有key，put成功,代表是新的futuretask

                    ft.run();//保证只计算一次
                    f = ft;
                }
                try {
                    return f.get();//get会去尝试得到V的值
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
