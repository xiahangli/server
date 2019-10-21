package server.algorithm;

public class Bubble {
    public static void main(String[] args) {
        int a[] = new int[]{2, 2, 2, 22, 2};
        int i, j;
        /**
         *  0 1 2 3 4
         * [1,2,1,1,1]
         * a.length=5
         *
         * 每次自底向上将最大的元素上冒
         */
//        for (i = 1; i < a.length; i++) {//外层循环表示趟数
////            for (j = 0; j < a.length - i; j++) {//
////                if (a[j] > a[j + 1]) {//向上冒泡
////                    int temp = a[j];
////                    a[j] = a[j + 1];
////                    a[j + 1] = temp;
////                }
////            }
////        }

        for (i = 0; i < a.length - 1; i++) {//外层循环表示趟数
            /**
             * 考虑边界条件： 当i=0时候 j:0->a.length-1
             *               当i=a.length-2时候， j:0->1
             */
            for (j = 0; j < (a.length - 1) - i; j++) {//
                if (a[j] > a[j + 1]) {//向上冒泡
                    int temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                }
            }
        }

        System.out.println();
    }
}
