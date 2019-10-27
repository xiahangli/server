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
     * @return key对应的value, 如果value=null,那么表示没有查询到结果，所以这里null是有特殊含义的，不能作为值
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
        if (root == null) return new Node(key, val, 1);
        int i = key.compareTo(root.key);
        if (i > 0)//递归向右边插入key,value对
            root.right = put(root.right, key, val);
        else if (i < 0)
            root.left = put(root.left, key, val);
        else
            root.val = val;
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
        bst.put("l", 12);
        bst.put("j", 5);
        String min = bst.min();
        String i = bst.floor("k");
        String i1 = bst.floor("i");
        System.out.println();
    }


    public int size() {
        return size(root);
    }

    /**
     * 最小键 如果左子树为null,那么相当于剪枝掉左边，则最小的为当前树的root节点
     * 如果左子树非null,那么递归的查找非零的左子树，如果没有，那么就是root节点
     *
     * @return
     */
    public Key min() {
        return _min(root);
    }

    private Key _min(Node root) {
        if (root.left == null)
            return root.key;
        return _min(root.left);
    }


    public Key floor(Key key) {
        Node node = _floor(root, key);
        if (node == null) return null;
        return node.key;
    }

    /**
     * if给定的key小于二叉查找树的根节的key,那么不超过key的最大key值肯定在左子树中
     * if给定的key等于二叉树的根节点的key,那么就是该节点
     * if 给定的key大于二叉树的根节点的key,那么如果二叉树的右子树中存在小于当前key的node,则在右子树，否则就是在当前的根节点
     *
     * @param root
     * @param key
     * @return 不超过查找key的最大key
     */
    private Node _floor(Node root, Key key) {
        if (root == null) return null;
        if (key.compareTo(root.key) < 0)//肯定在左子树中
            return _floor(root.left, key);
        else if (key.compareTo(root.key) > 0) {
            Node node = _floor(root.right, key);//查找右子树是否有比当前key小的node,这个函数一直会卡在这里等到遍历完子树返回后
            if (node == null) //找不到则当前的root就是要找的节点
                node = root;
            //找到了则直接返回
            return node;
        } else {//要查找的key等于则直接返回
            return root;
        }
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
