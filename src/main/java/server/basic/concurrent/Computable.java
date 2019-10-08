package server.basic.concurrent;

/**
 * 泛型接口
 */
public interface Computable<A,V> {
    V compute(A v);
}
