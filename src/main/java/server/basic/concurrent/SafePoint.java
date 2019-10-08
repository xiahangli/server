package server.basic.concurrent;

/**
 * Created by henry on 2019/8/25.
 */
@ThreadSafe
public class SafePoint {
    @GuardedBy("this")
    private int x,y;

    /**
     * 私有构造函数
     * @param a
     */
    private SafePoint(int[] a ){
        this(a[0],a[1]);
    }

    public SafePoint(int x, int y) {
        this.x = x;
        this.y = y;
    }


    /**
     * 这里构造函数中传入的参数是其他对象的引用
     * @param safePoint
     */
    public SafePoint(SafePoint safePoint){
        this(safePoint.get());
    }

    /**
     * 同步的方法，保证线程安全
     * @return
     */
    public synchronized int[] get(){
        return new int[]{x,y};
    }


    /**
     * 同步的方法块
     * @param x
     * @param y
     */
    public synchronized void set(int x,int y){
        this.x = x;
        this.y = y;
    }
}
