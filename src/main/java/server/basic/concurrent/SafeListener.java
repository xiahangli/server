package server.basic.concurrent;

/**
 * Created by Administrator on 2019/8/14.
 */
public class SafeListener {
    private final EventListener listener;
    private SafeListener(){
        listener = new EventListener() {
            @Override
            public void onEvent(Event e) {
                dosomething(e);
            }


        };
    }

    private void dosomething(Event e) {

    }

    public static SafeListener newInstance(EventListener source){
        SafeListener safe = new SafeListener();
//        source.registerListener(safe.listener);
        return safe;
    }
}
