package server.ds.list;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2019/9/3.
 */
public class MyLinkedList<E> {
    public int size = 0;//容量

    public Node<E> first;//第一个节点

    public Node<E> last;//最后一个节点
    //get方法 很简单 根据游标 从第一个节点遍历寻找值 这里也可以很清楚的看到为什么链表查询慢  不像arrayList那样查询快
    //因为这里是遍历  arrayList是直接根据下标从数组取值，所以arrayList查询要快的多。 
    public E get(int index) {
        return node(index).item;
    }


    //这里是源码直接复制过来的
    //很巧妙的设计  如果我们查询的这个值排在队伍的后半部分， 从后往前找  。小于后半部分 从前往后找  可以提高效率
    Node<E> node(int index) {
        if (index < (size >> 1)) {
            Node<E> x = first;
            for (int i = 0; i < index; i++)
                x = x.next;
            return x;
        } else {
            Node<E> x = last;
            for (int i = size - 1; i > index; i--)
                x = x.prev;
            return x;
        }
    }

    public static void main(String[] args){
        //实例化我们的myLinKedList
        MyLinkedList<String> myLinKedList = new MyLinkedList<>();

        //假如我们要把这三个对象放入myLinKedList
        String s1="a";
        String s2="b";
        String s3="c";

        //第一次 把s1放入

        Node<String> node =new Node<String>(null,s1,null);//第一次存入作为第一个节点，该节点没有上一个 所以第一个参数 null
        myLinKedList.first=node;//第一次存入作为第一个节点
        myLinKedList.last=node;//第一次存入也作为最后一个节点
        myLinKedList.size=1;//容量变为1


        Node<String> node2 =new Node<String>(node,s2,null);//第二次存入 ，第一个的node节点就作为第二次的上一个节点。
        node.next=node2;//第一个节点的下一个节点
        myLinKedList.last=node2;//最后一个节点
        myLinKedList.size=2;


        Node<String> node3 =new Node<String>(node2,s3,null);//一次类推。
        node2.next=node3;
        myLinKedList.last=node3;
        myLinKedList.size=3;

        List<Integer> integers = Arrays.asList(1, 12, 3, 56, 11);
        List<Integer> integer2 = integers;
        Collections.sort(integers);
            System.out.println(integers.toString());
//        for (int i = 0; i < integers.size(); i++) {
//        }
    }
}
