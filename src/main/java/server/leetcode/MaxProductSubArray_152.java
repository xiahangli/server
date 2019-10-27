package server.leetcode;

public class MaxProductSubArray_152 {
    public static int result;

    public static void main(String[] args) {
        int[] array = new int[] {-3,-1,3,5,-6,-6,-1,6,-3,-5,1,0,-6,-5,0,-2,6,1,0,5};
        result = array[0];//第0个元素初始化为product
        _max_product(array, result, 1);
        int i = maxProduct(array);
        System.out.println(result);
        System.out.println("=="+i);

    }


    private static void _max_product(int[] array, int product, int i) {
        //记录当前栈中的最大的元素，
        if (array.length <= i) return;
        int imax = Math.max(array[i], product * array[i]);
        result = Math.max(result, imax);
//        product *= array[i];
        _max_product(array, product * array[i], i + 1);
        _max_product(array, array[i], i + 1);
    }

    public static int maxProduct(int[] A) {
        if (A == null || A.length == 0) {
            return 0;
        }
        int max = A[0], min = A[0], result = A[0];
        for (int i = 1; i < A.length; i++) {
            int temp = max;
            max = Math.max(Math.max(max * A[i], min * A[i]), A[i]);
            min = Math.min(Math.min(temp * A[i], min * A[i]), A[i]);
            if (max > result) {
                result = max;
            }
        }
        return result;
    }


}
