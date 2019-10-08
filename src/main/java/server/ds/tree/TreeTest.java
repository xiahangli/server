package server.ds.tree;


/**
 * Created by henry on 2019/7/24.
 */
public class TreeTest {
    public static void main(String[] args) {
        TreeNode[] treeNodes = new TreeNode[11];
        for (int i = 1; i <= 10; i++) {
            treeNodes[i] = new TreeNode(i);
        }
        /**
         * 生成
         */
        for (int i = 1; i <= 10; i++) {
            if (i * 2 < 11) treeNodes[i].left = treeNodes[2 * i];// 左节点//这里数据直接用下标来表示
            if (i * 2 + 1 < 11) treeNodes[i].right = treeNodes[2 * i + 1];//右节点
        }
        preOrder(treeNodes[1]);
    }



    /**
     * 遍历
     *
     * @param root
     */
    static void preOrder(TreeNode root) {
        if (root == null) return;
        System.out.println(root.data);
        preOrder(root.left);
        preOrder(root.right);
    }


}

class TreeNode {
    TreeNode left;
    TreeNode right;
    int data;

    TreeNode(int data) {
        this.data = data;
    }
}

