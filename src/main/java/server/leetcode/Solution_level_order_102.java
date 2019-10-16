package server.leetcode;

import javax.swing.tree.TreeNode;
import java.util.*;

public class Solution_level_order_102 {

    List<Integer> list = Arrays.asList(3, 9, 20, null, null, 15, 7);


    //BFS解决
//    public static void main(String[] args) {
//        //创建节点对象
////        TreeNode one_root = new TreeNode(3);
//        TreeNode first_3 = new TreeNode(3);
//        TreeNode second_9 = new TreeNode(9);
//        TreeNode third_20 = new TreeNode(20);
//        TreeNode forth_null = null;
//        TreeNode fith_null = null;
//        TreeNode sixth_15 = new TreeNode(15);
//        TreeNode seventh_7 = new TreeNode(7);
//
//        first_3.left = second_9;
//        first_3.right=third_20;
//        third_20.left=sixth_15;
//        third_20.right=seventh_7;
//TreeNode root = first_3;
//        BFS(root);
//        return;
//    }

    public static void main(String[] args) {
        //创建节点对象
//        TreeNode one_root = new TreeNode(3);
        TreeNode _1 = new TreeNode(3);
        TreeNode _2 = new TreeNode(9);
        TreeNode _3 = new TreeNode(20);
        TreeNode _4 = null;
        TreeNode _5 = null;
        TreeNode _6 = new TreeNode(15);
        TreeNode _7 = new TreeNode(7);
        TreeNode _8 = null;
        TreeNode _9 = null;
        TreeNode _10 = null;
        TreeNode _11 = null;
        TreeNode _12 = new TreeNode(12);
        TreeNode _13 = new TreeNode(13);
        TreeNode _14 = new TreeNode(14);
        TreeNode _15 = new TreeNode(1000);

        //创建root二叉树结构
        _1.left = _2;
        _1.right = _3;
        _3.left = _6;
        _3.right = _7;
        _6.left = _12;
        _6.right = _13;
        _7.left = _14;
        _7.right = _15;

        TreeNode root = _1;

//        BFS(root);
        List<List<Integer>> res = new ArrayList<>();
      _dfs(res,root,0);
        return;
    }

    /**
     * 前序遍历
     *
     * @param res
     * @param root
     * @param height 深度从0开始
     */
    public static void _dfs(List<List<Integer>> res, TreeNode root, int height) {
        if (root == null) return;//递归终止条件
        if (height == res.size())
            res.add(new LinkedList<>());

        res.get(height).add(root.number);//最后一层将我们要的数添加到二维数组中去

        _dfs(res, root.left, height + 1);//🌲的深度加1，再次重复的逻辑
        _dfs(res, root.right, height + 1);

    }

    /**
     * 广度优先算法解决这个问题
     * 层序遍历
     *
     * @param root
     * @return
     */
    private static List<List<Integer>> BFS(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;//一般这里不执行


        // linkedList是一种Queue,也是一种Deque
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            int cnt = queue.size();//最开始cnt为1，第二次
            int 就 = 10;
            for (int i = 0; i < cnt; i++) {
                TreeNode node = queue.poll();//拿出元素
                level.add(node.number);
                if (node.left != null)
                    queue.add(node.left);//加入左右两个节点
                if (node.right != null)
                    queue.add(node.right);
            }
            res.add(level);
        }

        return res;
    }


    //todo why static
    static class TreeNode {
        int number;

        public TreeNode(int number) {
            this.number = number;
        }

        TreeNode left = null;
        TreeNode right = null;
    }
}
