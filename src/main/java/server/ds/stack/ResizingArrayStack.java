package server.ds.stack;

/**
 * Created by Administrator on 2019/9/6.
 */
public class ResizingArrayStack<T> implements Iterable<T> {
    public static void main(String[] args) throws Exception {
        ResizingArrayStack<String> stack = new ResizingArrayStack<>();
        stack.push("123");
        stack.push("111");stack.push("111");stack.push("111");
        stack.push("111");stack.push("111");stack.push("111");
        stack.push("111");stack.push("111");stack.push("111");
        stack.push("111");
        stack.pop();
    }
    private int M = 0;//局部变量的初始值是不确定的，必须显示赋值，但这里不需要

    private T[] a = (T[]) new Object[1];//默认数组size为1

    /**
     * 根据容量生成新的数组引用
     *
     * @param max
     */
    private void resize(int max) {
        T[] temp = (T[]) new Object[max];
//        for (T t :temp){
//            temp[]
//        }
        for (int i = 0; i < M; i++) {
            //将原来的数组指向的对象shallow拷贝到新的数组
            temp[i] = a[i];
            //未赋值的对象为null
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
//        a[M] = null;
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
    public server.ds.stack.Iterator<T> itertor() {
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
