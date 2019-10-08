package server.basic.generic.zhihuEx;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by henry on 2018/3/15.
 */
public class Plate<T> {

    private T item;

    public Plate(T item) {
        this.item = item;
    }

    public void setItem(T t) {
        this.item = t;
    }

    public T getItem() {
        return item;
    }


    public static void main(String[] args) {
        //通配符上界的使用------------频繁往外读取内容的，适合用上界Extends。
        Plate<? extends Fruit> plate = new Plate<Apple>(new Apple());
//        plate.setItem(new Apple());Error 编译器不知道到底是哪个子类，有可能是Apple,有可能是Orange
        Fruit fruit = plate.getItem();//可以取值，但是只能赋值给基类
//        Apple fruit1 = (Apple) plate.getItem();Correct
//        Object objet = plate.getItem();Correct
        System.out.println(fruit.toString());
        //通配符下界的使用---------经常往里插入的，适合用下界Super。
//        Plate<? super Fruit> plateSup = new Plate<>(new Apple());
//        plateSup.setItem(new Apple());
//        plateSup.setItem(new Banana());//存都没有问题
//        Object item = plateSup.getItem();//取只能知道是obj类型
//        System.out.println();



        List<? super Fruit> appList = new ArrayList();
        appList.add(new Fruit());
        appList.add(new Apple());
        appList.add(new RedApple());
    }
}
