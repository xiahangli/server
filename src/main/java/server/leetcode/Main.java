package server.leetcode;

/**
 * Created by henry on 2017/7/21.
 */
public class Main {


    public static void main(String[] args) {
        Main main = new Main();
        int sum = main.getSum(9, 11);
        System.out.println(sum
        );

    }


    public  int getSum(int a, int b) {
        if (b == 0) {
            return a;
        }
        int sum, carry;
        sum = a ^ b;
        carry = (a & b) << 1;
        return getSum(sum, carry);
    }

    public int removeDuplicates(int[] nums) {
        if (nums.length == 1) {
            return 1;
        }

        int norepeatIndex = 0;//至少一个

        for (int i = 1; i < nums.length; i++) {//只需要和前i个数据比较是否有重复
            for (int j = 0; j <= norepeatIndex; j++) {
                if (nums[j] == nums[i]) {//nums[i]是待比较的数，和前面几个不重复的进行比较
                    break;//若和前面几个不重复的重复，跳出内层循环
                }
                if (j == norepeatIndex && nums[j] != nums[i]) {
                    nums[norepeatIndex + 1] = nums[i];
                    norepeatIndex++;
                }
            }


        }
//        }
        return norepeatIndex + 1;
    }
}
