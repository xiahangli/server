package server.leetcode;

import java.util.*;

/**
 * Given an array nums of n integers,
 * are there elements a, b, c in nums such that a + b + c = 0?
 * Find all unique triplets in the array which gives the sum of zero.
 * <p>
 * Note:
 * <p>
 * The solution set must not contain duplicate triplets.
 * <p>
 * Example:
 * <p>
 * Given array nums = [-1, 0, 1, 2, -1, -4],
 * <p>
 * A solution set is:
 * [
 * [-1, 0, 1],
 * [-1, -1, 2]
 * ]
 */
public class Solution_Three_Sum_15 {
    public static void main(String[] args) {
        int[] ary = new int[]{-1, -1, 1, 2, -1, -4};
        //a+b+c=0
        int target = 0;
        //利用c=-a-b,可用set存

        int[] res = brute_force(ary, target);
        List<List<Integer>> lists = threeSum(ary);
//        List<List<Integer>> lists1 = threeSum1(ary);
        System.out.println();
    }

    private static int[] brute_force(int[] ary, int target) {
        return ary;
    }

//    public static List<List<Integer>> threeSum(int[] nums) {
//        List<List<Integer>> result = new ArrayList<>();
//        Set<Integer> cache = new HashSet<>(nums.length);
//
//
//        Set<List<Integer>> cacheTriplets = new HashSet();
//        for (int i = 0; i < nums.length; i++) {
//            for (int j = i + 1; j < nums.length; j++) {
//                int key = nums[i] + nums[j];
//                if(cache.contains(-key)){
//                    List<Integer> tuple = Arrays.asList(nums[i], nums[j], -key);
//                    if (!cacheTriplets.contains(tuple)) {//缓存已有的相加为0的三个数
//                        cacheTriplets.add(tuple);
//                        result.add(tuple);
//                    }
//                }
//            }//[-1, 0, 1, 2, -1, -4],
//            cache.add(nums[i]);
//        }
//        return result;
//    }
//    public static List<List<Integer>> threeSum(int[] nums) {
//        Set<List<Integer>> result = new HashSet<>();
//        Map<Integer, Integer> lookup = new HashMap<>(nums.length);
//        for (int i = 0; i < nums.length; i++) {
//            lookup.put(-nums[i], i);
//        }
//        //[-1, 0, 1, 2, -1, -4],
//
//        for (int i = 0; i < nums.length; i++) {
//            for (int j = i + 1; j < nums.length; j++) {
//                int key = nums[i] + nums[j];
//                if (lookup.containsKey(key)) {//满足a+b+c=0
//                    int k = lookup.get(key);
//                    if (k != i && k != j) {//同样的元素不能取两次，i,j不能取两次
//                        List<Integer> tuple = Arrays.asList(nums[i], nums[j], nums[k]);
//                        Collections.sort(tuple);
//                        result.add(tuple);
//                    }
//                }
//            }
//        }
//        return new ArrayList(result);
//    }

//    public static List<List<Integer>> threeSum1(int[] num) {
//        List<List<Integer>> out = new ArrayList();
//
//        if (num.length < 3) {
//            return out;
//        }
//
//        // Sort an array. It will hepl us to get the same triplets in the future
//        Arrays.sort(num);
//
//        // store intergers here to fast access
//        Set<Integer> cache = new HashSet();
//
//        // store resut here to check duplicates
//        Set<List<Integer>> cacheTriplets = new HashSet();
//
//        for (int i = 0; i < num.length; i++) {
//            for (int j = i + 1; j < num.length; j++) {
//
//                int v1 = num[i];//a
//                int v2 = num[j];//b
//                int sum = v1 + v2;//-(a+b)=c
//
//                // if there is a number that we can add and get summ equal zero
//                if (cache.contains(-sum)) {
//
//                    // create result triplet
//                    List<Integer> triplet = new ArrayList();
//                    triplet.add(v1);
//                    triplet.add(v2);
//                    triplet.add(-sum);
//
//                    // check duplicates
//                    if (!cacheTriplets.contains(triplet)) {//不重复的话
//                        out.add(triplet);
//                        cacheTriplets.add(triplet);
//                    }
//                }
//            }
//            cache.add(num[i]);
//        }
//        return out;
//    }

//    等价于python版本的threeSum思路
//    public static List<List<Integer>> threeSum(int[] nums) {
//        List<List<Integer>> res = new ArrayList<>();
//        int len = nums.length;
//        Arrays.sort(nums);
//        Set resul = new HashSet();
//
//        if (len <= 2) return new ArrayList<>();
//        for (int i = 0; i < nums.length; i++) {
//            if (i > 0 && nums[i] == nums[i - 1]) continue;
//            Set tempSet = new HashSet();
//            for (int j = i + 1; j < nums.length; j++) {
////                c b=-a-c
//                if (tempSet.contains(-nums[i] - nums[j]))
//                    resul.add(Arrays.asList(nums[i], nums[j], -nums[i] - nums[j]));//集合帮助去重了
//                tempSet.add(nums[j]);
//            }
//        }
//        return new ArrayList<>(resul);
//    }


    public static List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        int len = nums.length;
        Arrays.sort(nums);
//        Set resul = new HashSet();

        if (len <= 2) return new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            Set tempSet = new HashSet();
            for (int j = i + 1; j < nums.length; j++) {
//                c b=-a-c
                if (tempSet.contains(-nums[i] - nums[j])) {
                    List<Integer> newAdded = Arrays.asList(nums[i], nums[j], -nums[i] - nums[j]);
//                    判断是否重复
                    if (!res.contains(newAdded))
                        res.add(Arrays.asList(nums[i], nums[j], -nums[i] - nums[j]));//集合帮助去重了
                }
                tempSet.add(nums[j]);
            }
        }
        return res;
    }

        /**
         * 比上面的好一点
         *
         * @param nums
         * @return
         */
//    public static List<List<Integer>> threeSum(int[] nums) {
//        List<List<Integer>> res = new ArrayList<List<Integer>>();
//
//        int len = nums.length;
//        if (len <= 2) return res;
//        Arrays.sort(nums);
//
//        HashSet<Integer> hashSet = new HashSet<Integer>();
//        hashSet.add(nums[0]);
//        // i j k
//        for (int j = 1; j <= len - 2; j++) {
//            int k = j + 1;
//            while (k < len) {
//                int target = 0 - nums[j] - nums[k];//c=-a-b
//                // find i in [0, j)
//                if (hashSet.contains(target)) {
//                    List<Integer> newAdded = Arrays.asList(target, nums[j], nums[k]);
//                    if (!res.contains(newAdded)) {//看看newAdded是否在已有的元素中是否存在
//                        res.add(Arrays.asList(target, nums[j], nums[k]));
//                    }
//                }
//                while (k < len - 1 && nums[k] == nums[k + 1]) k++;
//                k++;
//            }
//            hashSet.add(nums[j]);//一组set 如【b,b',b'',b'''】
//        }
//
//        return res;
//    }

//    public static List<List<Integer>> threeSums(int nums[]){
//        List
//    }


//    public static List<List<Integer>> threeSum3(int[] nums){
//        List<List<Integer>> res = new ArrayList<List<Integer>>();
//        Arrays.sort(nums);
//        for (int i = 0; i < nums.length - 2; i++) {
//            //去重
//            if (i>0 && nums[i]==nums[i-1]) continue;
//        }
//    }
    }

    class Solution {
        public ArrayList<ArrayList<Integer>> threeSum(int[] numbers) {
            // write your code here
            HashMap<Integer, Integer> hs = new HashMap<>();
            int n = numbers.length;
            ArrayList<ArrayList<Integer>> result = new ArrayList<ArrayList<Integer>>();
            Arrays.sort(numbers);

            for (int i = 0; i < n; i++) {
                if (!hs.containsKey(0 - numbers[i])) {
                    hs.put(0 - numbers[i], i);
                }
            }

            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    if (hs.containsKey(numbers[i] + numbers[j]) && hs.get(numbers[i] + numbers[j]) != j && hs.get(numbers[i] + numbers[j]) != i) {
                        ArrayList<Integer> list = new ArrayList<Integer>();
                        list.add(numbers[hs.get(numbers[i] + numbers[j])]);
                        list.add(numbers[i]);
                        list.add(numbers[j]);
                        Collections.sort(list);
                        if (list.size() == 3 && !result.contains(list)) {
                            result.add(new ArrayList<Integer>(list));
                        }
                    }
                }
            }
            return result;
        }
    }

//还有一种跳过重复的方法， 对于数组中的任意三个元素u, v, w, 使用
//1. u == v == w
//2. u == v != w
//3. w > u and w > v
//这三个case去判断，代码写起来也非常简洁好看
//
//def threeSum(self, nums):
//    c, res = collections.Counter(nums), []
//    for u, v in itertools.combinations_with_replacement(c, 2):
//        w, add = -u-v, False
//        if w not in c: add = False
//        elif u == v == w: add = c[u] > 2
//        elif u == v: add = c[u] > 1
//        elif u < w and v < w: add = True
//        if add: res.append([u, v, w])
//    return res