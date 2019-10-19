package server.leetcode;

import java.util.Stack;

/**
 * Created by Administrator on 2019/10/18.
 */
public class ValidParenthethese {
    public static void main(String[] args) {
        boolean valid = isValid("(");
        System.out.println(valid);
    }

    public static boolean isValid(String s) {
        char[] chars = s.toCharArray();//
        Stack<Character> stack = new Stack<Character>();
        for (int i = 0; i <= chars.length - 1; i++) {//从第一个开始遍历
            char aChar = chars[i];
            if (aChar == '(' || aChar == '[' || aChar == '{') {
                stack.push(aChar);
            } else if (stack.empty()) {//右括号 case1若当前栈为null,push右括号肯定不行
                return false;
            } else if ( (stack.peek() == '('&&chars[i]==')')
                    ||  (stack.peek() == '[' &&chars[i]==']')
                    || (stack.peek() == '{' && chars[i]=='}')) {//case2 栈内为左括号，弹出左括号
                stack.pop();
            }else{//case3 栈内为右括号
                return false;
            }
        }
        return stack.empty();
    }
}
