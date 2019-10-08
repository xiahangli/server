package server.ds.stack.linkImpl;

import server.ds.stack.Iterator;

/**
 * Created by Administrator on 2019/9/6.
 */
public class Stack<Item> {
    private int N = 0;
    private Node first;
    private class Node{
        Node next;
        Item item;
    }

    public void push(Item item){
        Node oldFirst = first;
        first.item = item;
        first.next = oldFirst;
        N++;
    }

    private class ListIterator implements Iterator<Item>{

        /**
         * current不断改变
         */
        private Node current = first;

        /**
         * current节点不为空，则有下一个元素，否则，current就是最尾元素
         * @return
         */
        @Override
        public boolean hasNext() {
            return current !=null;
        }

        @Override
        public Item next() {
            //先拿到下一个元素
            Item item = current.item;
            // ，再更新旧的元素
            current = current.next;
            return item;
        }

        @Override
        public void remove() {

        }
    }
}
