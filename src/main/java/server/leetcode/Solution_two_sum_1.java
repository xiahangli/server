package server.leetcode;

import com.google.gson.internal.$Gson$Preconditions;

import java.util.*;

/**
 * 3中方法
 * You may assume that each input would have exactly one solution
 * , and you may not use the same element twice.
 */
public class Solution_two_sum_1 {
    //给定一个数，在数组中找到两个数，使得他们的和等于给定的数，返回这两个数的下标
    //[2,7,11,15] result =[0,1]
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 1, 2, 7);
        int[] ll = new int[]{1, 1, 2, 7};
        List<Integer> result = new ArrayList<>();
//        brute_force(list,9,result);
//        int[] set = set(list, 9);
        int[] ints = oneForTwoSum(list, 9);
        System.out.println();

    }

    /**
     * x+y=9
     * x = 0...input.length
     * y = 9-x
     * <p>
     * 思路一： 先将所有元素存入map,key为元素值，value为元素索引
     * y set.get(
     */
    public static int[] set(List<Integer> input, int target) {
//        Set  set = new HashSet();
        Map<Integer, Integer> indexMap = new HashMap<>();
        for (int i = 0; i < input.size(); i++) {
            indexMap.put(input.get(i), i);
        }

        for (int i = 0; i < input.size(); i++) {
            //target-input.get(i)为待求的元素值，这个值如果在map中存在，那么满足条件
            //第二个判断条件保证每个元素只能使用一次,即去重
            if (indexMap.containsKey(target - input.get(i)) && indexMap.get(target - indexMap.get(i)) != i) {
                //
                return new int[]{i, indexMap.get(target - indexMap.get(i))};
            }
        }
        throw new IllegalArgumentException("没有这两个数");
    }

    /**
     * 边存map边找前面是否有与当前的对象相加等于target的匹配的索引
     *
     * @param input
     * @param target
     * @return
     */
    public static int[] oneForTwoSum(List<Integer> input, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < input.size(); i++) {
            map.put(input.get(i), i);
            int complement = target - input.get(i);
            if (map.containsKey(complement) && map.get(complement) != i)
                return new int[]{i, map.get(complement)};

        }
        throw new IllegalArgumentException("没有");
    }


    private static void brute_force(List<Integer> list, int target, List<Integer> result) {
        for (int i = 0; i < list.size() - 1; i++) {
            for (int j = i + 1; j < list.size(); j++) {
                if (list.get(i) + list.get(j) == target) {
                    result.add(i);
                    result.add(j);
                    return;
                }
            }
        }
    }
}
