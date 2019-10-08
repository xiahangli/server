package server.basic.proxy.dynamicp;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;


/**
 * 第二步：实现InvocationHandler（C），连接代理类A和委托类B，起到桥接的作用
 * 他是委托类B的代理类，代理类A的委托类
 */
public class TimingInvocationHandler implements InvocationHandler {

    private Object target;//委托类对象,实际上就是OperateImpl实现类

    public TimingInvocationHandler() {
    }

    /**
     * 传一个实际对象的引用
     * @param target
     */
    public TimingInvocationHandler(Object target) {
        this.target = target;
    }

    /**
     *
     *运行时调用，动态代理将所有调用重定向到调用处理器（InvocationHandler），因此通常会向调用处理器的构造器传一个实际对象的引用
     *
     * 第三步：在invoke方法中通过Method反射将委托类委托
     * @param proxy  通过Proxy.newProxyInstance生成的实例对象
     * @param method 代理对象被调用的方法
     * @param args   代理对象被调用的参数列表,运行时加载
     * @return
     * @throws Throwable
     */
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        long start = System.currentTimeMillis();
        //这里调用了OperateImpl.operateMethod1(1,2) 有了实际对象的引用，那么可以在执行其中介任务的时候，将请求转发
        Object obj = method.invoke(target, args);//委托类的对象
        System.out.println(method.getName() + " cost time is:" + (System.currentTimeMillis() - start));
        return obj;
    }

    public static void main(String[] args) {
        // create proxy instance
        TimingInvocationHandler timingInvocationHandler = new TimingInvocationHandler(new OperateImpl());
        //创建代理类
        Operate operate = (Operate) (Proxy.newProxyInstance(Operate.class.getClassLoader(), new Class[]{Operate.class},
                timingInvocationHandler));

        // call method of proxy instance
        operate.operateMethod1(1, 2);//参数传递过去
        System.out.println();
        operate.operateMethod2();
        System.out.println();
        operate.operateMethod3();
    }
}