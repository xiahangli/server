package server.basic.concurrent.escape;

public class ThisEscape {
    public ThisEscape(EventSource source) {
        source.registerListener(new EventListener() {//创建的匿名内部类对象持有者外部ThisEscape实例
            public void onEvent(Event e) {
                doSomething(e);
//                ThisEscape.this.doSomething();
            }
        });
    }

    public static void main(String[] args) {
         EventSource source = new EventSource() {
            @Override
            public void registerListener(EventListener e) {
                    e.onEvent(new Event() {
                });
            }
        };

        ThisEscape thisEscape = new ThisEscape(source);
    }


    void doSomething(Event e) {
        System.out.println(e.id);
    }


    interface EventSource {
        void registerListener(EventListener e);
    }

    interface EventListener {
        void onEvent(Event e);
    }

    interface Event {
        int id = 1;
    }
}