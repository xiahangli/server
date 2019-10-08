package server.basic.clz;

import java.lang.*;
import java.lang.Class;

public class TestToy {
        public static void main(String[] args) {
//                 try {
//                 Class<?> c =  Class.forName("server.basic.clz.Toy");//输出Initializing
//                 } catch (ClassNotFoundException e) {
//                 e.printStackTrace();
//                 }
//                java.lang.Class<Toy> c = Toy.class; // 不会输出任何值

//                try {
//                        Toy t  = Toy.class.newInstance(); // 输出值Initializing，Building
//                } catch (InstantiationException e) {
//                        e.printStackTrace();
//                } catch (IllegalAccessException e) {
//                        e.printStackTrace();
//                }
                System.out.println(Toy.price);
        }
}