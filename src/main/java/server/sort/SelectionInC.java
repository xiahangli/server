package server.sort;

public class SelectionInC {
    public static void main(String[] args) {
        int a[] = new int[]{2, 4, 2, 22, 1};
        /**
         * 从小到大排序，将小的和原来位置的元素交换
         */
        for (int i = 0; i < a.length; i++) {//比较n趟
            int min = i;
            /**
             * 边界条件：i=0时 j:0->a.length-1
             *          i=a.length-1时 j:0->a.length-1
             */
            for (int j = i; j < a.length; j++) {
                if (a[j] < a[i]) {
                    min = j;
                }
            }
            /**
             * 每趟循环将最小的元素交换到已排序的数组的最右边
             * 即将a[min]<->a[i]
             */
            int temp = a[min];
            a[min] = a[i];
            a[i] = temp;
        }

        System.out.println();
    }
}
