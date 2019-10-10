package server.basic.overrideandoverloding;

/**
 * Created by Administrator on 2019/10/10.
 */
public class Test extends B {
    public static void main(String[] args) {
//        Test test = new Test();
//        test.m("1");
//        test.m(2);
//        test.m(3, 3);
//        test.h();
//        test.h(2);

        B test = new B();
        try {
            test.h();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        } catch (IllegalStateException e) {
            e.printStackTrace();
        }
        Test test1 = new Test();
        try {
            test1.h();
        } catch (AssertionError assertionError) {
            assertionError.printStackTrace();
        }

    }

    public void m(String s) {
        System.out.println(1);
    }

    public String m(int s, String x) {
        return "";
    }

    public void m(int s) {
        System.out.println(2);
    }

    public void m(int s, int y) {
        System.out.println(3);
    }

    public int h(int s) {
        super.h();
        System.out.println("another h");
        return 1;
    }

    /**
     * 可以减少或者删除异常，不能添加更广的异常
     * @throws IllegalArgumentException
     */
    @Override
    void h() throws AssertionError{
        System.out.println("overriding h");
        throw new IllegalArgumentException("asssss");
    }
}

class B {
    void h() throws IllegalArgumentException,IllegalStateException{
        System.out.println("parent h");
        throw  new IllegalArgumentException("illeg");
    }
}
