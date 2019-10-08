package server.dp.observe;

/**
 * Created by henry on 2018/3/15.
 */
public interface ISubject {
    public void add(Observer observer);//添加观察者

    public void notifyObserver();//通知观察者，要他做出具体的响应

    public Observer remove(Observer observer);//将观察者从观察列表中移除
}
