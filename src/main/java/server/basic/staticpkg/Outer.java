package server.basic.staticpkg;

/**
 * Created by henry on 2018/3/12.
 */
public class Outer {
    class Inner{}

    public static void foo(){
//        new Inner();//静态方法没有外部类的引用，报错
    }
    public void bar(){new Inner();}
    public static void main(String args){
//        new Inner();
    }
}
