package server.effectivejava._42_lambda_expression_favor_to_anonymous_class;

/**
 * Created by Administrator on 2019/10/8.
 */
public class Test {
    public static void main(String[] args) {
        TestInterface test1 = (s) -> System.out.println(s);
        test1.a("sdddd");//函数调用
    }

    static class TestClass {
        void a(String a) {
        }

        void b(String a) {
        }

    }

    interface TestInterface {
        //        void a(int a);
        void a(String a);
//        void a();
    }
}
