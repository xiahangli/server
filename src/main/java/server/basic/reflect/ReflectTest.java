package server.basic.reflect;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * Created by henry on 2018/3/14.
 */
public class ReflectTest {
    public static void main(String[] args) {
        Class class1 = null;
        Class class2 = null;
        Class class3 = null;
        //包名+类名
        try {
            class1 = Class.forName("basic.reflect.ReflectClass");
            class2 = ReflectClass.class;
            ReflectClass reflectClass = new ReflectClass();
            class3 = reflectClass.getClass();

            Field[] declaredFields = class1.getDeclaredFields();
            Method[] methods = class1.getDeclaredMethods();
            ///fields
            for (Field field :
                    declaredFields) {
                System.out.println(field.getName());
//                int modifier = field.getModifiers()
                System.out.println();
            }
            //methods
            for (Method m :methods){
//                System.out.println(m.get);
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
