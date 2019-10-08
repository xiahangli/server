package server.dp.observe.paramitrize;

import server.dp.observe.IObserver;

/**
 * Created by henry on 2018/3/15.
 */
public interface ISubject<T extends IObserver> {
    void add(T t);//这里add的参数类型只能是继承了IObserver的类，也可以是实现的

    T remove(T t);

    void notifyObservers();
}
