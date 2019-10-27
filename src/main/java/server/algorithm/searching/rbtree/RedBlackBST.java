package server.algorithm.searching.rbtree;

public class RedBlackBST<Key extends Comparable<Key>,Value> {
    private Node root;
    private static final boolean RED = true;
    private static final boolean BLACK = false;


    /**
     *
     * 旋转保持了红黑树的有序性和完美平衡性
     * @param h h指向当前考察的根节点
     * @return
     */
    Node rotateLeft(Node h){
        Node x = h.right;//当前的右节点临时存储
        //将h的右孩子替换成x的左孩子
        h.right = x.left;//先变h的right,这时候x的left就可以指向h了
        x.left = h;
        x.color = h.color;//上面什么颜色不知道
        //现在红色的边指向h了，原来是指向x的
        h.color =RED;
        x.N=h.N;
        h.N=1+size(h.left)+size(h.right);
        return x;
    }



    public int size(Node node){
        if (node == null)
            return 0;
        else
            return size(node.left)+size(node.right)+1;
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
