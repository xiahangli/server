package server.ds.stack.arrayImpl;

import java.util.Arrays;
import java.util.EmptyStackException;

/**
 * Created by Administrator on 2019/9/27.
 */
public class Stack {

    private Object[] elements;


    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;

    public Stack() {
        elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }

    public void push(Object e) {
        ensureCapacity();
    }

    public Object pop() {
        if (size == 0) {
            throw new EmptyStackException();
        }
        Object res = elements[--size];
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
