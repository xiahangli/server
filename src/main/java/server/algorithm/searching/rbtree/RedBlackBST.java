package server.algorithm.searching.rbtree;

public class RedBlackBST<Key extends Comparable<Key>,Value> {
    private Node root;
    private static final boolean RED = true;
    private static final boolean BLACK = false;


    Node rotateLeft(Node h){
        Node x = h.right;//当前的右节点临时存储
//        h.right =
        return x;
    }

    /**
     * 节点数据结构定义
     */
    private class  Node {
        Key key;
        Value val;
        Node left,right;
        int N;//子树中的节点中暑
        boolean color;//red代表true,即3节点

        Node(Key key,Value val,int N,boolean color){
            this.key = key;
            this.val = val;
            this.N = N;
            this.color = color;
        }


        private boolean isRed(Node x){
            if (x == null) return false;//null节点当做黑色节点
            return x.color ==RED;//红色的返回true,黑色的返回false
        }
    }

}
