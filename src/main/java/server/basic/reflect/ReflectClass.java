package server.basic.reflect;

import java.io.Serializable;

/**
 * Created by henry on 2018/3/14.
 */
public class ReflectClass extends BaseReflectClass implements Serializable{
    private int intValue = 0;
    private String stringValue = null;


    public void method01(){
        System.out.println("ReflectClass_01");
    }

    public void method02(){
        System.out.println("ReflectClass_02");
    }

    public void method03(int intValue, String stringValue){
        System.out.println("ReflectClass_Method03"+" intValue: "+intValue+" stringValue: "+ stringValue);
    }

    public void method04(){
        System.out.println("intValue: "+intValue+"stringValue: "+stringValue);
    }
}
