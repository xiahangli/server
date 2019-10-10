package server.effectivejava._42_lambda_expression_favor_to_anonymous_class;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * Created by Administrator on 2019/10/8.
 */
public class Test {
    public static void main(String[] args) {
        //最差的写法
        TestInterface test1 = new TestInterface() {
            @Override
            public int a(String a) {
                return Integer.valueOf(a);
            }
        };
        //烧好的lambda写法
        TestInterface t = (a) -> Integer.valueOf(a);

        int a1 = t.a("1111");
//        TestInterface t = (a)->Integer.valueOf(a);

        //最好的写法，使用方法引用替换lambda

        //方法引用只是lambda表达式的拓展,实际上上面的lambda知识调用了已经存在的一个函数compare,那么就可以用方法引用
        TestInterface t2 = Integer::valueOf;
        int a = t2.a("1232");

        /////////////
        List<String> words = new ArrayList<>();
        words.add("22");
        words.add("1");
        //不要这样写
//        Collections.sort(words, new Comparator<String>() {
//            @Override
//            public int compare(String o1, String o2) {
//                //按照升序排列
//                //前一个对象比后一个对象大，则返回>0
//                return Integer.compare(o1.length(), o2.length());
//            }
//        });

        Collections.sort(words, (o1, o2) -> Integer.compare(o1.length(), o2.length()));





        //使用构造器的方法引用，这里其实有四种不同类型的方法引用，static方法引用，特定对象的方法引用，特定类型的方法引用，构造器的方法引用
        Collections.sort(words, Comparator.comparingInt(String::length));
        //最好的方式：使用list自带的sort方法
        words.sort(Comparator.comparingInt(String::length));
    }

    static class TestClass {
        void a(String a) {
        }

        void b(String a) {
        }

    }

    /**
     * 函数式接口
     * 使用单个抽象方法的接口是特别的，应该得到特别的对待，这种接口成为函数式接口
     */
    interface TestInterface {
        //        void a(int a);
        int a(String a);

        /**
         *  若一个接口中定义了一个默认方法，而另外一个接口中又定义了一个同名方法时，
         *  接口冲突。不管是否是默认方法，那么必须覆盖该方法来解决冲突
         * 这里必须为default，否则lambda表达式无法用在函数式编程上
         * @param s
         */
        default int b(int s) {
            return -1 ;
        }

        /**
         *在 java8 中的接口中不仅增加了默认方法，还增加了静态方法。使用方式接口名.方法名
         * @return
         */
        static int c(){return -1;}
//        void b(int c);
//        void a();
    }
}
