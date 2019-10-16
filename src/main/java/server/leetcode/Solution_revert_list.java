package server.leetcode;

public class Solution_revert_list {



    public static void main(String[] args) {
        //构建链表
            ListNode head = new ListNode(1);
            ListNode listNode2 = new ListNode(2);
            ListNode listNode3 = new ListNode(3);
            ListNode listNode4 = new ListNode(4);
            head.next = listNode2;
            listNode2.next= listNode3;
            listNode3.next = listNode4;

        //反转链表
        //前指针
        ListNode prev = null;
        //当前指针
        ListNode cur = head;
        /**
         * ø->1->2->3
         *
         *
         * ø<-1<-2<-3
         */
        while(cur !=null){
            ListNode nextTemp  = cur.next;
            cur.next= prev;
            prev = cur;
            cur = nextTemp;
        }
        while (prev.next!=null){
            System.out.println(prev.number);
            prev = prev.next;
        }
        System.out.println(prev.number);

    }

   static class ListNode {
        int number;


        public ListNode(int number) {
            this.number = number;
        }

        ListNode next;
    }
}


