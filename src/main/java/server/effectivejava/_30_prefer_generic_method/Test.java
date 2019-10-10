package server.effectivejava._30_prefer_generic_method;

import java.util.HashSet;
import java.util.Set;
import java.util.function.UnaryOperator;

public class Test {

    //cf Collections.reverseOrder 泛型单例工厂
    private static UnaryOperator<Object> IDENTIFY_FN = (t)-> t;//输入t,返回t
    public static void main(String[] args) throws Exception {

    }

//    public static Set union(Set s1,Set s2){
//        Set res = new HashSet<>();
//        res.addAll(s2);
//        return res;
//    }

    /**
     * 有瑕疵，3个集合只能类型相同的
     * @param s1
     * @param s2
     * @param <T>
     * @return
     */
    public static <T> Set<T> union(Set<T> s1,Set<T> s2){
        Set<T> res = new HashSet<T>();
        res.addAll(s2);
        return res;
    }

    //todo generic function factory 用于方法对象
//    public static <T> Comparator<T> reverseOrder() {
//        return (Comparator<T>) ReverseComparator.REVERSE_ORDER;
//    }
}