package server.algorithm.searching.rbtree;

/**
 * 二叉搜索树
 */
public class BST<Key extends Comparable<Key>, Value> {
    private Node root;


    /**
     * 根据key来查找value,他需要一个当前子树的根节点(初始的根节点为整个搜索树的root节点)，要查找的Key，然后递归的查找key是否匹配
     *
     * @param key 要查找的key
     * @return 找的到就返回key对应的value, 找不到就返回nUll
     */
    Value get(Key key) {
        return get(root, key);
    }

    /**
     * 递归地在子树中查找当前key是否有对应的value
     *
     * @param root 子树的根节点
     * @param key  要查找的key,注意这里规定key不为null,
     * @return key对应的value
     */
    private Value get(Node root, Key key) {
        if (root == null) return null;//递归终止
        //当前的key 与root的key作比较
        Key rootKey = root.key;
        if (key.compareTo(rootKey) < 0)//查找的key比当前root节点小表明在左子树
            return get(root.left, key);
        else if (key.compareTo(rootKey) > 0)
            return get(root.right, key);
        else //key == root.key则找到，返回结果
            return root.val;
    }


    private Node put(Key key, Value val) {
        //put返回的是root节点
        //引入辅助的函数，将树的根节点传入，
        root = put(root, key, val);
        return root;
    }

    public Node put(Node root, Key key, Value val) {
        if (root == null)//递归终止条件
            return new Node(key, val, 1);
        int cmp = key.compareTo(root.key);
        //左边递归的查找
        if (cmp < 0)//<0代表未命中，且有的话应该在左子树中
            root.left = put(root.left, key, val);
        else if (cmp > 0)
            root.right = put(root.right, key, val);
        else
            root.val = val;//如果相等，那么更新节点的value值

        //一旦走到这里 ===代表要么要插入新的节点，要么已经更新原来的节点的value值
        //这时候我们要更新以该节点为root的所有节点的个数
        root.N = size(root.left) + size(root.right) + 1;
        return root;
    }


    //测试用例
    public static void main(String[] args) {
        BST<String, Integer> bst = new BST<>();//二叉搜索树
        //构建二叉树，这里用的是链表构建，即递归结构构建
        bst.put("f", 1);
        bst.put("a", 2);
        bst.put("h", 3);
        bst.put("g", 4);
        bst.put("j", 12);
        bst.put("i", 5);
        System.out.println();
    }


    public int size() {
        return size(root);
    }

    /**
     * @param root
     * @return
     */
    private int size(Node root) {
        return root == null ? 0 : root.N;
    }


    /**
     * 节点定义，一个节点它包含左子树，右子树，当前节点的key，Value
     */
    class Node {
        private Key key;
        private Value val;
        private Node left;
        private Node right;
        private int N;//以该节点为根节点的子树中节点的个数

        public Node(Key key, Value val, int n) {
            this.key = key;
            this.val = val;
            this.left = left;
            this.right = right;
            N = n;
        }

    }
}
