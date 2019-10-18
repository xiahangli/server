package server.leetcode;

import java.util.Stack;

/**
 * Created by Administrator on 2019/10/18.
 */
public class ValidParenthethese {
    public static void main(String[] args) {

    }

    public static boolean isValid(String s) {
        char[] chars = s.toCharArray();//
        Stack<Character> stack = new Stack<Character>();
        for (int i = chars.length-1; i >=0 ; i++) {//从第一个开始遍历
            char aChar = chars[i];
            if (aChar == '('|| aChar  == '[' || aChar ==  '{'){
                stack.push(aChar);
            }else if (stack.empty()){
                return false;
            }else if (stack.peek()==)//栈非空
        }
    }
}
