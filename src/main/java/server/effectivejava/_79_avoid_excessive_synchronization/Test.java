package server.effectivejava._79_avoid_excessive_synchronization;

import java.util.*;

/**
 * Created by Administrator on 2019/10/8.
 */
public class Test {
    public static void main(String[] args) {
        Set<String> set = new HashSet<>();
        ObservableSet<String> os = new ObservableSet<>(set);
//        os.addObserver(new SetObserver() {
//            @Override
//            public void add(ObservableSet observableSet, Object item) {
//                System.out.println(item.toString());
//            }
//        });

//        os.addObserver(()->add());
    }
}

/**
 * 扩展了ForwardSet的功能,这里是通知者，也就是被观察者（可观测对象）
 *
 * @param <E>
 */
class ObservableSet<E> extends ForwardSet<E> {

    /**
     * 兼职锁对象
     */
    private final List<SetObserver> observers = new ArrayList<>();

    //create a constructor  matching super
    public ObservableSet(Set <E> s) {
        super(s);
    }

    //添加观察者
    public void addObserver(SetObserver observer) {
        synchronized (observers) {
            observers.add(observer);
        }
    }
    //todo 移除观察者

    //通知观察者
    private void notifyItemAdded(ObservableSet<E> observableSet, E item) {
        //warnings! excessive synchronization
        synchronized (observers) {
            for (SetObserver observer : observers) {
                observer.add(observableSet, item);
            }
        }

    }

    //添加元素，重写了父类的元素,主要是添加了通知的功能
    @Override
    public boolean add(E item) {
        boolean isAdded = super.add(item);
        if (isAdded) {
            notifyItemAdded(this, item);
        }
        return isAdded;
    }


}

class ForwardSet<E> implements Set<E> {

    private final Set<E> s;

    public ForwardSet(Set<E> s) {
        this.s = s;
    }

    @Override
    public int size() {
        return s.size();
    }

    @Override
    public boolean isEmpty() {
        return s.isEmpty();
    }

    @Override
    public boolean contains(Object o) {
        return s.contains(o);
    }

    @Override
    public Iterator<E> iterator() {
        return s.iterator();
    }

    @Override
    public Object[] toArray() {
        return s.toArray();
    }

    @Override
    public <T> T[] toArray(T[] a) {
        return s.toArray(a);
    }

    @Override
    public boolean add(E e) {
        return s.add(e);
    }

    @Override
    public boolean remove(Object o) {
        return s.remove(o);
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        return s.contains(c);
    }

    @Override
    public boolean addAll(Collection<? extends E> c) {
        return s.addAll(c);
    }

    @Override
    public boolean retainAll(Collection<?> c) {
        return s.retainAll(c);
    }

    @Override
    public boolean removeAll(Collection<?> c) {
        return s.removeAll(c);
    }

    @Override
    public void clear() {
        s.clear();
    }
}


interface SetObserver<E> {

    void add(ObservableSet<E> observableSet, E item);
}
