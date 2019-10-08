package server.basic.clz;

public class Test {
 
    public void test() throws Exception{
         
        int localVar = 0;
         
        try{
             
            java.lang.Class.forName("com.jg.zhang.Person");
             
        }catch(ClassNotFoundException e){
             
            throw e;
        }finally{
            System.out.println(localVar);
        }
         
    }
}