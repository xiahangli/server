package server.effectivejava._44优先使用标准的函数式接口;

import java.util.Map;

/**
 * 函数式接口是有且仅有一个抽象方法，但是可以有多个非抽象方法的接口
 */
@FunctionalInterface
public interface EldestEntryRemovalFunction<K,V> {
    /***
     * 注意必须把自己（MAp）传递给函数，不然没法使用
     * @param map
     * @param eldest
     * @return
     */
    boolean remove(Map<K,V> map,Map.Entry<K,V> eldest);

    /**
     * 非抽象方法接口
     */
    default void remove1(){
        System.out.println("default test");
    }
}
