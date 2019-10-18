package server.leetcode;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2019/10/17.
 */
public class Solution_generate_paratheses {


    static List<String> stringList = new ArrayList<>();
    private static int cnt = 0;

    public static void main(String[] args) {
        String str;
        int n = 3;

        int cnt = 1;
        System.out.println(cnt++);
        //辅助函数
        gen("", n, n);
        System.out.println(stringList.toString());
    }


    /**
     * n 括号的个数
     * left 左括号剩余可用的个数
     * right 右括号剩余可用的个数
     */

    static void gen(String str, int left, int right) {
        System.out.println(cnt++);
        if (left == 0 && right == 0)
            System.out.println("add cnt = " +cnt);
            stringList.add(str);
        //左括号只要有就永远可以添加，
        if (left > 0)
            //先处理单层的问题节，在递归到下一层处理下一层的解
            gen(str + "(", left - 1, right);
        if (right > 0 && right > left)
            gen(str + ")", left, right - 1);
    }

}
