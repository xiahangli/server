package server.ds.stack.arrayImpl.generic;

import java.util.Arrays;
import java.util.EmptyStackException;

/**
 * Created by Administrator on 2019/9/27.
 */
public class Stack<T> {

    private T[] elements;


    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    @SuppressWarnings("unchecked")
    public Stack() {
        elements = (T[]) new Object[DEFAULT_INITIAL_CAPACITY];
    }

    public void push(T e) {
        ensureCapacity();
    }

    public T pop() {
        if (size == 0) {
            throw new EmptyStackException();
        }
        T res = elements[--size];
        elements[size] = null;//防止内存无法回收
        return res;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    private void ensureCapacity() {
        if (elements.length == size) {
            elements = Arrays.copyOf(elements, 2 * size + 1);
        }
    }

}
