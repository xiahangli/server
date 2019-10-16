package server.effectivejava._45明智谨慎使用stream;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

/**
 * Created by Administrator on 2019/10/16.
 */
public class Stream {
    public static void main(String[] args) {
        File dictionary = new File("C://xxxx");
        int minGroupSize = 5;//每个组必须大于
//       map中的值为TreeSet
        Map<String,Set<String>> groups = new HashMap<>();
        try {
            Scanner s = new Scanner(dictionary);
            while (s.hasNext()){
                String word = s.next();
//                groups.putIfAbsent(alphabertize(word),(used)->);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    private static String alphabertize(String s) {
        char[] a = s.toCharArray();
//        字符串变成字符数组
        Arrays.sort(a);
        //根据char[]生成字符串
        return new String(a);
    }
}
