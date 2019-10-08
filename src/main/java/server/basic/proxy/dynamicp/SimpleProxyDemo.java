package server.basic.proxy.dynamicp;

/**
 * Created by Administrator on 2019/8/27.
 */

interface Interface{
    void doSth();
    void sthElse(String arg);
}

class RealObject implements Interface{

    @Override
    public void doSth() {
        System.out.println("doSth real");
    }

    @Override
    public void sthElse(String arg) {

    }
}
public class SimpleProxyDemo {
}
