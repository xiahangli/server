package server.algorithm;

/**
 *
 */
public interface Comparable<T> {
    /**
     * v.compareTo(w)>0,则v>w
     * @param t
     * @return
     */
    int compareTo(T t);
}
