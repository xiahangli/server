package server.algorithm;

/**
 * Created by Administrator on 2019/9/23.
 */
public class Example {
    public static void main(String[] args) {

    }

    public static void sort(Comparable[] a){

    }

    private static boolean less(Comparable v,Comparable w){
        return v.compareTo(w)<0;
    }

    /**
     * 交换两个数
     * @param a
     * @param i
     * @param j
     */
    private static void exch(Comparable[] a,int i,int j){
        Comparable t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
}
