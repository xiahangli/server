package server.basic.generic.bridge;

public class Test {
    public static  void main(String[] args) {
        Info superClass = new BridgeMethodTest();
        BridgeMethodTest subclass = new BridgeMethodTest();
        subclass.info(1);
        superClass.info(new Object());//调用的是桥接方法，会在运行时报类型转换异常,是多态的体现
    }
}
