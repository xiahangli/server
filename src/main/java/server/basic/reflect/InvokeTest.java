package server.basic.reflect;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class InvokeTest {

    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Class testCls = TestMethod.class;

        try {
            Method mStatic = testCls.getMethod("testStatic", null);
            // 测试静态方法
            mStatic.invoke(null, null);
        } catch (NoSuchMethodException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        TestMethod t = new TestMethod();

        try {
            Method mAdd = testCls.getDeclaredMethod("add", int.class, int.class);
            //通过这句代码才能访问 private 修饰的 Method
            mAdd.setAccessible(true);
            int result = (int) mAdd.invoke(t, 1, 2);
            System.out.println("add method result:" + result);
        } catch (NoSuchMethodException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IllegalArgumentException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        try {
            Method testExcep = testCls.getMethod("testException", null);
            try {
                testExcep.invoke(t, null);
            } catch (IllegalAccessException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (IllegalArgumentException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                // TODO Auto-generated catch block
                //e.printStackTrace();

                // 通过 InvocationTargetException.getCause() 获取被包装的异常
                System.out.println("testException occur some error,Error type is :" + e.getCause().getClass().getName());
                System.out.println("Error message is :" + e.getCause().getMessage());
            }


        } catch (NoSuchMethodException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SecurityException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}