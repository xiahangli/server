package server.leetcode;

import com.sun.scenario.effect.impl.sw.sse.SSEBlend_SRC_OUTPeer;

import java.util.ArrayList;
import java.util.List;

public class Solution_MaxDepth_104 {
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
//        _6.left = _12;
//        _6.right = _13;
//        _7.left = _14;
//        _7.right = _15;

        TreeNode root = _1;

//        BFS(root);
        List<List<Integer>> res = new ArrayList<>();
        int depth = _dfs(root);
        return;
    }

    /**
     * *
     * *      *
     * *   *   *  *
     * *  *
     *
     * @param root
     * @return
     */
    private static int _dfs(TreeNode root) {
        if (root == null) return 0;

        int left = _dfs(root.left);
//        System.out.println("left"+left);
        int right = _dfs(root.right);
//        System.out.println("right"+right);
        //1为当前层 12,13,14,1000
        int max = Math.max(left, right) + 1;
//        System.out.println("max"+max);
        return max;
    }


    static class TreeNode {
        int number;

        public TreeNode(int number) {
            this.number = number;
        }

        TreeNode left = null;
        TreeNode right = null;
    }
}
