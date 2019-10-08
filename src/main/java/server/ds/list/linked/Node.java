package server.ds.list.linked;

/**
 * Created by Administrator on 2019/9/6.
 */
public class Node<Item> {
    Node next;
    Item item;



    public static void main(String[] args){
        Node first = new Node();
        Node second = new Node();
        Node third = new Node();
        first.item = "1";
        second.item = "2";
        third.item = "3";
        first.next = second;
        second.next = third;
        System.out.println();
    }
}
