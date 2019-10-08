package server.basic.generic;


import server.Generator;

class FArray{
    /**
     *
     * @param a 泛型数组
     * @param gen 用于生成a[]数组，这个数组是泛型的
     * @param <T> 泛型对象
     * @return  生成的数组
     */
    public static <T> T[] fill(T[] a, Generator<T> gen){
        //刚开始所有元素均为null,但是数组的长度为7
        for (int i = 0; i < a.length; i++) {
            a[i] = gen.next();//每一次申城一个字符长度为10的字符串，随机生成
        }
        return a;
    }
}
/**
 * 自动包装与泛型
 */
public class PrimitiveGenericTest {
    public static void main(String[] args) {
        //指定了具体类，这里的T是String
        String[] strings = FArray.fill(
                new String[7], new RandomGenerator.String(10));
        for(String s : strings)
            System.out.println(s);
        //指定了泛型类为Integer
        Integer[] integers = FArray.fill(
                new Integer[7], new RandomGenerator.Integer());
        for(int i: integers)
            System.out.println(i);
        // Autoboxing won't save you here. This won't compile:
//        int[] b =
//           FArray.fill(new int[7], new  RandomGenerator.Integer());
    }
}
