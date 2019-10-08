//: net/mindview/util/Generator.java
// A generic interface.
package server;

/**
 * 接口泛型，这里的T是制定了generator要操作的类型
 * @param <T>
 */
public interface Generator<T> {
    /**
     *
     * @return 返回泛型对象
     */
    T next();
} ///:~
