package server.sort;

/**
 * 选择排序，每次选出最小的数
 */
public class Selection {
    public static void sort(Comparable[] a) {
        int N = a.length;
        for (int i = 0; i < N; i++) {
            int min = i;
            for (int j = i + 1; j < N; j++)
                if (less(a[j], a[min]))
                    min = j;//找到最小的位置
            exch(a, i, min);
        }
    }


    public static void main(String[] args) {
        C[] a = new C[]{new C(1),new C(4),new C(3),new C(111),new C(20)};
        sort(a);
        for (int i = 0; i < a.length; i++) {
            int i1 = a[i].i;
            System.out.println(i1);
        }
    }

    private static void exch(Comparable[] a, int i, int j) {
        Comparable c = a[i];
        a[i] = a[j];
        a[j] = c;
    }

    private static boolean less(Comparable a, Comparable b) {
        return a.compareTo(b) < 0;
    }

    /**
     * 指定可比较的类型为当前的对象
     */
    static class C implements Comparable<C>{
        private int i;
        public C(int i){
            this.i = i;
        }

        @Override
        public int compareTo(C a) {
//        return    ( i-a.i > 0?1:(i-a.i ==0?0:-1));
        return    ( i-a.i > 0?1:(i-a.i ==0?0:-1));
//            return ;
        }
    }
}
