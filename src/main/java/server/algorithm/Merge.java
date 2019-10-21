package server.algorithm;

import server.sort.Comparable;

public class Merge {

    private static Comparable[] aux;

    public static void sort(Comparable[] a) {
        aux = new Comparable[a.length];//复制了一份数组
        sort(a, 0, a.length - 1);
    }

    /**
     * 指定可比较的类型为当前的对象
     */
    static class C implements Comparable<C> {
        private int i;

        public C(int i) {
            this.i = i;
        }

        @Override
        public int compareTo(C a) {
//        return    ( i-a.i > 0?1:(i-a.i ==0?0:-1));
            return (i - a.i > 0 ? 1 : (i - a.i == 0 ? 0 : -1));
//            return ;
        }
    }

    public static void main(String[] args) {
        C[] a = new C[]{new C(1), new C(4), new C(3)};
        sort(a);
        for (int i = 0; i < a.length; i++) {
            int i1 = a[i].i;
            System.out.println(i1);
        }
    }

    /**
     * @param a
     * @param lo 0
     * @param hi 5
     */
    private static void sort(Comparable[] a, int lo, int hi) {
        if (hi <= lo) return;
//        int mid = (hi+lo)/2;
        int mid = lo + (hi - lo) / 2;
        for (int k = lo; k <= hi; k++)
            aux[k] = a[k];

        sort(a, lo, mid);//0,1,2
        sort(a, mid + 1, hi);//3,4
        merge(a, lo, mid, hi);
    }

    /**
     * 重要的合并函数
     *
     * @param a
     * @param lo
     * @param mid
     * @param hi
     */
    private static void merge(Comparable[] a, int lo, int mid, int hi) {
        int i = lo;
        int j = mid + 1;
        //注意等于hi
        for (int k = lo; k <= hi; k++)
            aux[k] = a[k];

        for (int k = lo; k <= hi; k++)
            if (i > mid)
                a[k] = aux[j++];
            else if (j > hi)
                a[k] = aux[i++];
            else if (less(aux[j], aux[i]))
                a[k] = aux[j++];
            else //反正就是把小的放入a[k]
                a[k] = aux[i++];

    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable c = a[i];
        a[i] = a[j];
        a[j] = c;
    }

    private static boolean less(Comparable a, Comparable b) {
        return a.compareTo(b) < 0;
    }
}
