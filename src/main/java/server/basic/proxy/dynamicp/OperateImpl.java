package server.basic.proxy.dynamicp;


/**
 * 第一步：得到委托类，实现委托接口
 */
public class OperateImpl implements Operate {

    @Override
    public void operateMethod1(int a,int b) {
        System.out.println("Invoke operateMethod1 a+b= "+(a+b));
        sleep(110);
    }

    @Override
    public void operateMethod2() {
        System.out.println("Invoke operateMethod2");
        sleep(120);
    }

    @Override
    public void operateMethod3() {
        System.out.println("Invoke operateMethod3");
        sleep(130);
    }

    private static void sleep(long millSeconds) {
        try {
            Thread.sleep(millSeconds);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}