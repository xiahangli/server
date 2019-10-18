package server.leetcode;

import java.util.Arrays;

/**
 * Created by Administrator on 2019/10/18.
 */
public class rotate_array_旋转数组 {
    public static void main(String[] args) {
        rotate(new int[]{1, 12, 12, 22, 14, 111}, 2);
    }

    /**
     * 新开数组的方式
     * @param nums
     * @param k
     * @return
     */
    public static int[] rotate(int[] nums, int k) {
        int[] res = new int[nums.length];//新开辟数组
        k = k % nums.length;
        for (int i = 0; i < nums.length; i++) {
            res[(i + k) % nums.length] = nums[i];
        }
        int[] ints = Arrays.copyOf(res, nums.length);
        int[] ints1 = Arrays.copyOfRange(res, 0, nums.length);
        for (int i = 0; i < nums.length; i++) {
            nums[i] = res[i];
        }
        return res;
    }

    /**
     * 每次移动所有元素一个，直到移满k个 ,原地的
     */
    public static int[] rotate1(int[] nums, int k) {
       int lastNum;
        k = k % nums.length;
        for (int i = 0; i < k; i++) {
            lastNum = nums[nums.length-1];
            for (int j = nums.length-1; j > 0 ; j--) {
                nums[j]=nums[j-1];
            }
            //最后处理最左边的，最左边的是被lastNum替换
            nums[0]=lastNum;
        }
      return nums;
    }


}
