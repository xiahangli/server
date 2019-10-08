package server.ds.queue;

/**
 * Created by henry on 2017/7/21.
 */
public class Stack {

    private NodeForStack head;

    private NodeForStack current;

    private void add(int data){
        if (head == null){
            head = new NodeForStack(data);
            current = head;
        }else {
            current.pre = new NodeForStack(data);
            current = current.pre;
        }
    }


    private NodeForStack pop()  {
        if (current==null){
            return null;
        } else{
            NodeForStack node = current;
            current = current.pre;
            return node;
        }
    }


    public static void main(String[] args) {
        Stack stack = new Stack();
        stack.add(12);
//        if (stack.pop()!=null){
            System.out.println(stack.pop().data);
//        }
    }
}
