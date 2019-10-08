package server.basic.concurrent;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by henry on 2019/8/25.
 */
@NotThreadSafe
public class NumberRange {

    private final AtomicInteger lower = new AtomicInteger();
    private final  AtomicInteger upper = new AtomicInteger();


    /**
     * 注意这里的先检查后操作是不安全的
     * @param i
     */
    public void setLower(int i){

        //以下的两个步骤不是原子的，那么可能出现多线程问题，即A线程先调用setLower(7)，而B线程随后调用setUpper(6)，这样在检查的过程中，他们都不会发现操作的不合理性
        if (i > upper.get()){
            throw new  IllegalArgumentException("不合法的下限"+i);
        }
        lower.set(i);
    }

    public void setUpper(int i){
        if (i < lower.get()) {
            throw  new IllegalArgumentException("不合法的上限"+i);
        }
        upper.set(i);
    }

    public boolean isInRange(int i){
        return i >= lower.get() && i <= upper.get();
    }
}
