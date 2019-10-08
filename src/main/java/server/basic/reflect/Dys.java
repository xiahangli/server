package server.basic.reflect;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.concurrent.atomic.AtomicInteger;

public class Dys implements InvocationHandler {

    private Class proxyObj;
    public Object newProxyInstance(Class Pobj){
        proxyObj = Pobj;

        return Proxy.newProxyInstance(proxyObj.getClass().getClassLoader(),new Class[]{Pobj},this);
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("代理对象准备调用目标方法");
        Object res = method.invoke(proxyObj,args);
        System.out.println("代理对象调用目标方法完毕");
        return res;
    }

    public static  void main(String[] args){
        AtomicInteger atomicInteger =new AtomicInteger(0);
        int i = atomicInteger.incrementAndGet();
        atomicInteger.incrementAndGet();
        int i1 = atomicInteger.get();
        atomicInteger.get();
//        Dys d = new Dys();
//        TestImp impl = new TEIML();
//        //创建动态代理对象
//        TestImp o = (TestImp) d.newProxyInstance(TestImp.class);
//o.test();
    }

}
