package server.basic.proxy.staticp;


/**
 * Created by henry on 2018/3/15.
 */
public class B {

    private A a = new A();//字段初始化优于构造器

    public B(){
        System.out.println("B()");
    }

    public void BMethod(){
        a.AMethod();
    }

    public static void main(String[] args) {
        B b = new B();
        b.BMethod();
    }
}
