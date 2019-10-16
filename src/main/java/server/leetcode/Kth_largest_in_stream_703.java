package server.leetcode;

import java.util.PriorityQueue;

/**
 * Created by Administrator on 2019/10/16.
 */
public class Kth_largest_in_stream_703 {
    public static void main(String[] args) {
        int[] nums = new int[]{4,2,1,8,5};
        KthLargest kthLargest = new KthLargest(3,nums);
        int add = kthLargest.add(1110);
        System.out.println();
    }
}
class KthLargest {
    final int k;
    final PriorityQueue<Integer> q;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        //初始队列设为3
        q = new PriorityQueue<Integer>(k);
        for (int a : nums) {
            int add = add(a);
        }
        System.out.println();
    }

    public int add(int val) {
        boolean offer = q.offer(val);
        if (q.size() > k) {//初始化的时候将
            int a = q.poll();//移出队列中优先级最低的元素并返回
            System.out.println();
        }
        return q.peek();//只做查询，不删除元素，查询每次返回最
    }
}