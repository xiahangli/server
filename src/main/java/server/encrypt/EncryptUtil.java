package server.encrypt;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by Administrator on 2019/9/23.
 */
public class EncryptUtil {

    public static String string2MD5(String string){
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
//            md5.digest( string.getBytes()).toString(32);
            byte[] digestedBytes = md5.digest(string.getBytes());
            //第二个参数大端表示的magnitude
            BigInteger bigInteger = new BigInteger(1, digestedBytes);
            //基数为32
            string = bigInteger.toString(32);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return string;
    }

    public static String convertMD5(String string){
        //转成char数组
        char[] a = string.toCharArray();
        //
        for (int i = 0; i < a.length; i++) {
            a[i]=(char)(a[i]^'t');
        }
        String s = new String(a);
        return s;
    }

    public static void main(String[] args) {
        String xia = EncryptUtil.convertMD5(EncryptUtil.string2MD5("xia"));
        System.out.println(xia);
    }
}
