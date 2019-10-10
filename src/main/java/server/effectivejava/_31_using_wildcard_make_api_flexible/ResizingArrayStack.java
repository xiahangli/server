package server.effectivejava._31_using_wildcard_make_api_flexible;

import java.util.Iterator;

public class ResizingArrayStack<T> implements Iterable<T> {

    private int M = 0;//局部变量的初始值是不确定的，必须显示赋值，但这里不需要

    private T[] a;//heap pollution

    @SuppressWarnings("unchecked")
    public ResizingArrayStack() {
        this.a = (T[]) new Object[1];//默认数组size为1
//        M = 0;
    }

    /**
     * 根据容量生成新的数组引用
     *
     * @param max
     */
    private void resize(int max) {
        @SuppressWarnings("unchecked")
        T[] temp = (T[]) new Object[max];
        for (int i = 0; i < M; i++) {
            //将原来的数组指向的对象shallow拷贝到新的数组
            temp[i] = a[i];
        }
        a = temp;//a引用指向新开辟的数组引用
    }

    /**
     * 可能要扩容,2倍的方式
     *
     * @param item
     */
    public void push(T item) {
        if (M == a.length) resize(2 * M);
        a[M++] = item;//先做a[M]，后加M加1
    }


    public boolean isEmpty() {
        return M == 0;
    }

    /**
     * 注意这里，我们可以放所有的Number子类的元素，就是？ extends Number
     *
     * @param it 可迭代的容器
     */
    public void pushAll(Iterable<? extends T> it) {
        for (T t : it) push(t);
    }

    public void popAll(ResizingArrayStack<? super T> dst) {
        while (!isEmpty()) {
            dst.push(pop());
        }

    }


    /**
     * 可能要减容,d当元素只有1/4容量大小的时候，将容量缩小一杯
     *
     * @return
     */
    public T pop() {
        T item = a[--M];
        a[M] = null;//防止游离对象
        if (M > 0 && M == a.length / 4) {
            resize(a.length / 2);
        }
        return item;
    }


    @Override
    public Iterator<T> iterator() {
        return new ReverseArrayIterator();
    }

    private class ReverseArrayIterator implements Iterator<T> {

        private int i = M;

        @Override
        public boolean hasNext() {
            return i > 0;
        }

        @Override
        public T next() {
            return a[--i];
        }

        @Override
        public void remove() {

        }
    }
}
