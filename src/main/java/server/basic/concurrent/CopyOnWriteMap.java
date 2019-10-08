package server.basic.concurrent;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 *COW意思是写的时候拷贝一份到内存中，用完再放回,见下面源码
 * 应用场景： 多读少些
 *
 * 优点：
 * 缺点：
 *
 */
public class CopyOnWriteMap<K, V> implements Map<K, V> {

    private volatile Map<K, V> internalMap = null;

    public CopyOnWriteMap() {
        internalMap = new HashMap<K,V>();
    }

    /**
     * 字段同步锁
     * @param k
     * @param v
     * @return
     */
    @Override
    public V put(K k, V v) {
        synchronized (internalMap){
            Map<K,V> cpMap = new HashMap<>(internalMap);
            V val = cpMap.put(k,v);
            internalMap = cpMap;
            return val;
        }
    }

    @Override
    public V remove(Object key) {
        return null;
    }

    @Override
    public void putAll(Map<? extends K, ? extends V> m) {

    }

    @Override
    public void clear() {

    }

    @Override
    public Set<K> keySet() {
        return null;
    }

    @Override
    public Collection<V> values() {
        return null;
    }

    @Override
    public Set<Entry<K, V>> entrySet() {
        return null;
    }

    @Override
    public int size() {
        return 0;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }

    @Override
    public boolean containsKey(Object key) {
        return false;
    }

    @Override
    public boolean containsValue(Object value) {
        return false;
    }

    @Override
    public V get(Object o) {
        return internalMap.get(o);
    }

    public static void main(String[] args) {

    }
}
