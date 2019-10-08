package server.dp.observe.paramitrize;

import server.dp.observe.IObserver;
import server.dp.observe.Observer;

/**
 * Created by henry on 2018/3/15.
 */
public class Subject<T extends IObserver> implements ISubject<T>{

    public Subject(){

    }



    public static void main(String[] args) {
//        Subject subscribe = new Subject();//订阅者
//        subscribe.add(new Observer());
//        subscribe.add(new Observer());
//
//        //在某个时刻通知
//        subscribe.notifyObserver();
//        Subject<Object> subscriber = new Subject<Object>();//这样就不行，泛型的优点展示出来了
        Subject<Observer> subscriber = new Subject<>();
        subscriber.add(new Observer());

    }


    @Override
    public void add(T t) {

    }

    @Override
    public T remove(T t) {
        return null;
    }

    @Override
    public void notifyObservers() {

    }
}
