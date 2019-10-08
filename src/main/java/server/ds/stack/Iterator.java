package server.ds.stack;

/**
 * Created by Administrator on 2019/9/6.
 */
public interface Iterator<T> {
    boolean hasNext();
    T next();
    void remove();
}
