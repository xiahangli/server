package server.basic.staticpkg;

public class Test {

    static int age = 1;
    int age1 = 2;
    static C c = new C();

    static {
        System.out.println("这是静态代码块");
    }

    {
        System.out.println("这是普通代码块" + age1);
    }

    public Test() {
        System.out.println("这是构造方法");
    }

    public static void show() {
        System.out.println("这是静态方法");
    }

    public void fun() {
        System.out.println("这是普通方法");
    }

    public static void main(String[] args) {
//System.out.println(age);
//        Test t = new Test();
        Test.show();
//        t.fun();
/*System.out.println(t.age1);*/
    }


}
 class C{
    int x;
    public C(){
        System.out.println("C");
     }
}
