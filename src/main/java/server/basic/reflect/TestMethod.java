package server.basic.reflect;

public class TestMethod {

    public static void testStatic () {
        System.out.println("test static");
    }

    private  int add (int a,int b ) {
        return a + b;
    }

    public void testException () throws IllegalAccessException {
        throw new IllegalAccessException("You have some problem.");
    }

}