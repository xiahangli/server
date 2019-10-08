package server.ds.queue;

/**
 * Created by henry on 2017/7/21.
 * FIFO队列
 * FILO怎么办？
 *
 */
public class Queue {
    public NodeForQueue head = null;
    public NodeForQueue current = null;

    /**
     * 入队,插入到队尾
     */
    public void add(int data) {
        if (head == null) {
            head = new NodeForQueue(data);
            current = head;
        } else {
            current.next = new NodeForQueue(data);

            current = current.next;//更新current
        }
    }

    /**
     * 出队
     *
     * @return
     * @throws Exception
     */
    public int pop() {
        if (head == null) {
            try {
                throw new Exception("队列为空");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        NodeForQueue nodeForQueue = head;
        nodeForQueue.next = head.next;//把弹出的下一个只想
        return head.data;
    }


    public static void main(String[] args) {
        Queue queue = new Queue();
        queue.add(1111111);
        queue.add(2);
        System.out.println(queue.pop() + "");
    }
}
