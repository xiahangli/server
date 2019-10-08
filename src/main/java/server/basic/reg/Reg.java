package server.basic.reg;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by henry on 2017/7/27."发多少
 */
public class Reg {




    public static void main(String[] args){
        Pattern pattern = Pattern.compile(":|\\.");
        String s = "9:30.";
        for (int i=0;i<s.length();i++){

                String f = s.substring(i,i+1);
                Matcher m = pattern.matcher(f);
            if (m.find()){
                System.out.println(f);
            }
        }
    }
}
