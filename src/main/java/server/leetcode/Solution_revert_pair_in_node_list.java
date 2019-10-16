package server.leetcode;


//todo 再写几遍
public class Solution_revert_pair_in_node_list {
    public static void main(String[] args) {
        //构建链表
        ListNode head = new ListNode(1);
        ListNode linkedList2 = new ListNode(2);
        ListNode linkedList3 = new ListNode(3);
        ListNode linkedList4 = new ListNode(4);
//        ListNode linkedList5 = new ListNode(5);
        head.next = linkedList2;
        linkedList2.next = linkedList3;
        linkedList3.next = linkedList4;
//        linkedList4.next = linkedList5;

        ListNode dummyNode = new ListNode(0);

        ListNode curNode = dummyNode;//不对，不能指向head,z应该指向dummy
        dummyNode.next = head;
        while (curNode.next != null && curNode.next.next != null) {
            ListNode swap1 = curNode.next;
            ListNode swap2 = curNode.next.next;
            curNode.next = swap2;//确定新的链式关系
            swap1.next = swap2.next;
            swap2.next = swap1;
            curNode = swap1;
        }


        while (dummyNode != null) {

        }

    }

    static class ListNode {
        int number;


        public ListNode(int number) {
            this.number = number;
        }

        ListNode next;
    }
}
