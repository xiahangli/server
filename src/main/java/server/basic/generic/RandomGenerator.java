package server.basic.generic;

import server.Generator;

import java.util.Random;

/**
 * 随机数生成器封装了CountingGenerator
 */
public class RandomGenerator {
    private static Random r = new Random(44);

    /**
     * Character是直接实现Generator接口
     */
    public static class Character implements Generator<java.lang.Character> {
        @Override
        public java.lang.Character next() {
            //这里通过随机数下标实现字符随机,这里指定了nextInt的上界（不包括上界）
            return CountingGenerator.Character.chars[r.nextInt(CountingGenerator.Character.chars.length)];
        }
    }


    public static class String extends CountingGenerator.String {
        {//这个代码块是静态的代码块
            cg = new Character();
        }

        public String() {
        }

        public String(int length) {
            super(length);
        }
    }

    public static class Integer implements Generator<java.lang.Integer> {
        private int mod = 1000;

        public Integer(){}

        public Integer(int mod){
            this.mod = mod;
        }
        @Override
        public java.lang.Integer next() {
            return r.nextInt(mod);
        }
    }
}
