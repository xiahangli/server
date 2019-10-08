package server.basic.generic;

import java.lang.reflect.InvocationTargetException;
import java.util.*;

/**
 * Created by Administrator on 2019/8/26.
 */

class Frob{}
class Fnorkle{}
class Quark<Q>{}
//质点拥有位置和动量
class Particle<POSITION,MOMENTUM>{}
public class LostInfomation {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        List<Frob> list = new ArrayList<>();
        Map<Frob,Fnorkle> map = new HashMap<>();
        Quark<Fnorkle> quark = new Quark<>();
        Particle<Long,Double> p = new Particle<>();
        //首先获取类型信息，根据Class类类型再获取类型参数
        //jdk文档中说 getTypeParamters返回一个TypeVariable对象数组，表示有泛型声明所声明的类型参数，但是实际上打印出来的是占位符，并非有用信息
        //java泛型使用擦除实现，当使用泛型的时候，任何具体的类型信息都会被擦除
        System.out.println(Arrays.toString(list.getClass().getTypeParameters()));
        System.out.println(Arrays.toString(map.getClass().getTypeParameters()));
        System.out.println(Arrays.toString(quark.getClass().getTypeParameters()));
        System.out.println(Arrays.toString(p.getClass().getTypeParameters()));
        System.out.println("===========");
        List<Integer> list1 = new ArrayList<>();
        list1.add(1);
        //参数类型指定为Object，即任意参数，这个参数类型是可变参数,泛型在编译的时候就擦出了，那么上面的Integer泛型在编译后被擦除，只保留了原始类型（字节码中的真正类型）
        list1.getClass().getMethod("add",Object.class).invoke(list1,"hhhhh");
        for (int i = 0; i < list1.size(); i++) {
            System.out.println(list1.get(i));
        }
    }
}
