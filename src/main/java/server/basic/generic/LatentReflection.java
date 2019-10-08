package server.basic.generic;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 *  反射将类型检查推迟到运行时
 */
class Mime {
    public void walkAgainstTheWind() {}
    public void sit() {
        System.out.println("Pretending to sit"); }
    public void pushInvisibleWalls() {}
    public String toString() { return "sb"; }
}

// Does not implement Performs:
class SmartDog {
    public void speak() {  System.out.println("Woof!"); }
    public void sit() {  System.out.println("Sitting"); }
    public void reproduce() {}
}


/**
 * 反射方式实现不同类型层次结构之间调用（Mine和SmartDog没有继承关系），弥补潜在类型机制
 */
class CommunicateReflectively{
    public static void perform(Object speaker){
        Class<?> claz = speaker.getClass();
        try {
            Method speak1 = claz.getMethod("speak");
            //speaker调用speak方法
            speak1.invoke(speaker);
        } catch (NoSuchMethodException e) {
            System.out.println(speaker+" cannot speak");
//            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

    }
}

public class LatentReflection {
    public static void main(String[] args) {
        CommunicateReflectively.perform(new SmartDog());
//        CommunicateReflectively.perform(new Robot());
        CommunicateReflectively.perform(new Mime());
    }

}
