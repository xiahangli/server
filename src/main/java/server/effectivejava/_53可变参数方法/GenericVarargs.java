package server.effectivejava._53可变参数方法;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by Administrator on 2019/10/18.
 */
public class GenericVarargs {
    public static <T> List<T> makeList(T... args) {
        List<T> res = new ArrayList<>();
        for (T t : args) {
            res.add(t);
        }
        return res;
    }

    public static void main(String[] args) {
        List<Integer> integers = GenericVarargs.makeList(1, 123, 120);
        List<String> strings = GenericVarargs.makeList("strin1", "st1", "213");
        int sum = sum();
        int sum1 = sum(12, 123, 1);
        System.out.println();
    }

    /**
     * 0个或多个，
     *
     * @param args
     * @return
     */
    static int sum(int... args) {
        int sum = 0;
        for (int i : args) {
            sum += i;
        }
        return sum;
    }

    /**
     * 一个或多个，但是这样写不太优雅
     *
     * @param args
     * @return
     */
    static int min(int... args) {
        if (args.length < 1)
            throw new IllegalArgumentException("参数太少");
        int min = args[0];
//        for (int i : args) {
//            if (min > args[i])
//                min = args[i];
//            return min;
//        }

        for (int i = 0; i < args.length; i++) {
            if (min > args[i])
                min = args[i];
        }
        return min;
    }

    static int optMin(int first, int... args) {
        int min = first;
        for (int i : args) {
            if (min > i)
                min = i;
        }
        return min;
    }


    /**
     * 可变参数对性能有损耗，因为每次调用都会重新分配数组和初始化,可在参数数量较少且调用频繁的的情况下使用重载
     * @param collection
     * @param <E>
     */

    public void doSth(){

    }
    public void doSth(int t1){

    }

    public void doSth(int t1,int t2){

    }

    public void doSth(int t1,int t2,int t3){

    }

    public void doSth(int t1,int t2,int t3,int... varargs){

    }

    public <E> void testCollection(Collection<E> collection) {
        collection.add((E) "d");
        collection.clear();
        collection.contains("12");

    }
}
