package server.dp.observe;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by henry on 2018/3/15.
 */
public class Subject implements ISubject {

    List<Observer> observers = new ArrayList<>();

    @Override
    public void add(Observer observer) {
        observers.add(observer);
    }

    /**
     * 订阅者告诉观察者我要做xx事情了
     */
    @Override
    public void notifyObserver() {
        for (int i = 0; i < observers.size(); i++) {
            observers.get(i).update();
        }
    }

    @Override
    public Observer remove(Observer observer) {
        observers.remove(observer);
        return observer;
    }

    public static void main(String[] args) {
        Subject subscribe = new Subject();//订阅者
        subscribe.add(new Observer());
        subscribe.add(new Observer());

        //在某个时刻通知
        subscribe.notifyObserver();

    }
}
