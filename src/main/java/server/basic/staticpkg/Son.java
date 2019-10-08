package server.basic.staticpkg;

public class Son extends Parents {
      
private Print param1 = new Print(3);  
      
    private static Print param7 = new Print(7, Print.PrintType.SON);
      
    static {  
        System.out.println("son static block");  
    }  
      
    private static Print param8 = new Print(8, Print.PrintType.SON);
  
    {  
        System.out.println("son instance block");  
    }  
      
    public Son() {  
        System.out.println("son construction method ");  
    }  
      
    private Print param2 = new Print(4);  
}  