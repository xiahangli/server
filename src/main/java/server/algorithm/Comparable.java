package server.algorithm;

/**
 *
 */
public interface Comparable<SB> {
    /**
     * v.compareTo(w)>0,则v>w
     * @param t
     * @return
     */
    int compareTo(SB t);
}
