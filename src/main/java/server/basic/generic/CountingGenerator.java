package server.basic.generic;

import server.Generator;

/**
 * Created by Administrator on 2019/8/26.
 */
public class CountingGenerator {

    public static class Boolean implements Generator<java.lang.Boolean>{
        private boolean value = false;
        @Override
        public java.lang.Boolean next() {
            value = !value;//每次变下bool值
            return value;
        }
    }




    /**
     * 具体指定了泛型的实现，即Character
     */
    public static class Character implements Generator<java.lang.Character>{
        //利用了字符串的转字符数组的方法toCharArray
        static char[] chars = ("abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ").toCharArray();
        int index = -1;

        @Override
        public java.lang.Character next() {
            index = (index+1)/chars.length;//循环
            return chars[index];
        }
    }

    public static class Integer implements Generator<java.lang.Integer>{
        int i;
        @Override
        public java.lang.Integer next() {

            return i++;
        }
    }

    /**
     * String 包装了Character
     */
    public static class String implements Generator<java.lang.String>{
        private int length = 7;
        //cg使用了多态
        Generator<java.lang.Character> cg = new Character();
        public String() {}
        public String(int length){
            this.length = length;
        }
        @Override
        public java.lang.String next() {
            char[] buf = new char[length];
            for (int i = 0; i < length; i++) {//默认输出长度为7
                buf[i] = cg.next();
            }
            return new java.lang.String(buf);
        }
    }
}
