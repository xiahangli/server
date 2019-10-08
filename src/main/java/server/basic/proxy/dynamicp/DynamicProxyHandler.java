package server.basic.proxy.dynamicp;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * Created by Administrator on 2019/8/27.
 */
public class DynamicProxyHandler implements InvocationHandler {

    private Object proxy;

    public DynamicProxyHandler(Object proxy) {
        this.proxy = proxy;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        method.invoke(proxy,args);//代理到真实的对象上即realObject
        return null;
    }

    public static void main(String[] args) {
        //动态代理不需要每次都新建代理实例
        try {
            DynamicProxyHandler dynamicProxyHandler = new DynamicProxyHandler(new RealObject());
            Class<?> aClass = Class.forName("server.basic.proxy.dynamicp.Interface");
            Interface in = (Interface) Proxy.newProxyInstance(Interface.class.getClassLoader(), new Class<?>[]{aClass}, dynamicProxyHandler);
            in.doSth();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
