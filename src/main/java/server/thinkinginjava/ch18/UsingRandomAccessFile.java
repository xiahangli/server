package server.thinkinginjava.ch18;//: io/UsingRandomAccessFile.java

import java.io.*;

public class UsingRandomAccessFile {
    //    static String file = "rtest.dat";
    private static File newF;

    static void display() throws IOException {
        RandomAccessFile rf = new RandomAccessFile(newF, "r");
        for (int i = 0; i < 7; i++)
            System.out.println(
                    "Value " + i + ": " + rf.readDouble());
        System.out.println(rf.readUTF());
        rf.close();
    }

    public static void main(String[] args)
            throws IOException {

//        UsingRandomAccessFile randomAccessFile = new UsingRandomAccessFile();
        boolean mkdirs = true;
        newF = new File("F:\\ideaproject\\gitserver\\src\\main\\java","rtest.txt");
//        if (!newF.exists()) {
//            mkdirs = newF.mkdir();
//            System.out.println("==============" + mkdirs);
//        } else {
//            mkdirs = true;
//        }
        if (mkdirs) {

            RandomAccessFile rf = new RandomAccessFile(newF, "rw");
            for (int i = 0; i < 7; i++)
                rf.writeDouble(i * 1.414);//写入文件

            rf.writeUTF("The end of the file");
            rf.close();
            display();
            rf = new RandomAccessFile(newF, "rw");
            rf.seek(5 * 8);//一个double占8字节
            rf.writeDouble(47.0001);
            rf.close();
            display();
        }
    }
}