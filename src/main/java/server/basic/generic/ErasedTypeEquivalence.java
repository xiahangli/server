package server.basic.generic;

import java.util.ArrayList;

/**
 * 泛型擦除的例子
 */
public class ErasedTypeEquivalence {
    public static void main(String[] args) {
        ArrayList<String> strings = new ArrayList<String>();
        Class c1 = strings.getClass();
        Class c2 = new ArrayList<Integer>().getClass();
        System.out.println(c1 == c2);//这里我们无法区分new ArrayList<Integer>对象和new ArrayList<String>的具体类型差异
    }
}
