package server.basic.concurrent;

import java.security.Key;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Created by henry on 2019/8/25.
 */
@ThreadSafe
public class VisualComponent {
    /**
     * 每一个都被copyOnWriteArrayList封装，所以是线程安全的，而由于KeyListener与MouseListener没有约束关系，所以可以独立发布
     */
    private final List<KeyListener> keyListeners = new CopyOnWriteArrayList<>();
    private final List<MouseListener> mouseListeners = new CopyOnWriteArrayList<>();

    public void addKeyListener(KeyListener listener){
        keyListeners.add(listener);
    }


    public void addMouseListener(MouseListener listener){
        mouseListeners.add(listener);
    }


    public void removeKeyListener(KeyListener listener){
        keyListeners.remove(listener);
    }


    public void removeMouseListener(MouseListener listener){
        mouseListeners.remove(listener);
    }



}
