package server.basic.string;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2019/8/22.
 */
public class CompareToTest {
    public static void main(String[] args) {
//        String str1 = "strings";
//        String str2 = "strings";
//        int res = str1.compareTo(str2);//比较字符串，具体看String类的compareTo实现

        Student s1 = new Student(101,"zhangsan",11.1);
        Student s2 = new Student(102,"lisi",22.20);
        Student s3 = new Student(103,"wangwu",13);

        List<Student> students = new ArrayList<>();
        students.add(s1);
        students.add(s2);
        students.add(s3);
        Collections.sort(students);//递增排序
//        System.out.println();
        for (Student s : students) {
            System.out.println(s.getScore());
        }
//        System.out.println(res);
    }
}
