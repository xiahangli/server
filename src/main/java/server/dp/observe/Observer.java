package server.dp.observe;

/**
 * Created by henry on 2018/3/15.
 */
public class Observer implements IObserver{

    public Observer(){

    }

    @Override
    public void update() {
        System.out.println(this.hashCode()+", update");
    }
}
