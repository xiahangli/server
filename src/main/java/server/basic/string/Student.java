package server.basic.string;

/**
 * Created by Administrator on 2019/8/22.
 */
public class Student implements Comparable<Student> {
    private final String name;
    private final int sid;
    private double score;

    public Student(int sid, String name, double score) {
        this.score = score;
        this.sid = sid;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public int getSid() {
        return sid;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    @Override
    public int compareTo(Student o) {
        if(score>o.score){
            return 1;
        }else if(score < o.score){
            return -1;
        }else{
            return 0;
        }
    }



}
