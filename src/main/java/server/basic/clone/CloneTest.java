package server.basic.clone;

import java.io.*;

/**
 * Created by henry on 2018/3/12.
 */
public class CloneTest implements Serializable{
    public static void main(String[] args) {
        PersonBean personBean1 = new PersonBean("xia", 12, new CarBean(12, "benz"));
        PersonBean personBean2 = null;
        try {
            personBean2 = SerilizeUtil.clone(personBean1);
        } catch (Exception e) {
            e.printStackTrace();
        }
        personBean2.setName("BYD");
        System.out.println(personBean1);//修改二对1没有影响
        System.out.println(personBean2);
    }
}


//通过对象的序列化 的前面<T>表明返回的是一个泛型，
class SerilizeUtil implements Serializable {
    public static <T> T clone(T obj) throws Exception {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        //将obj对象写入到对象输出流中
        oos.writeObject(obj);//对象序列化
        //反过来读取输出流中的数据，字节数组输入流
        ByteArrayInputStream bis = new ByteArrayInputStream(baos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bis);
        return (T) ois.readObject();
    }
}
