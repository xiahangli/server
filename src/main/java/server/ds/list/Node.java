package server.ds.list;

public class Node<E> {
    public E item; //存放数据的泛型
    public Node<E> prev; //上一个节点 这里这个Node 指向自己本身
    public Node<E> next; //下一个节点 这里这个Node 也指向自己本身

    public Node() {
        super();
    }


    //有参构造
    Node(Node<E> prev, E element, Node<E> next) {
        this.item = element;
        this.next = next;
        this.prev = prev;
    }

}
