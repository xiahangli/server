package server.sort;

public class Example {

    /**
     * 交换a[i]与a[j]
     * @param a
     * @param i
     * @param j
     */
    private static void exch(Comparable[] a,int i,int j){
        Comparable c = a[i];
        a[i]  = a[j];
        a[j] = c;
    }

    /**
     * 比较a与b谁大，
     * @param a
     * @param b
     */
    private static boolean less(Comparable a,Comparable b){
        return a.compareTo(b) <0;
    }

    private
    static boolean isSorted(Comparable[] a ){
        for (int i = 1; i < a.length; i++)
            if (less(a[i],a[i-1])) return  false;
        return true;
    }


    private static void show(Comparable[] a){
        for (int i = 0; i < a.length; i++) {
            System.out.println(a[i] +" ");
        }
        System.out.println();
    }
}
