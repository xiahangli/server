package server.basic.staticpkg;

public class Parents {
      
    private static Print param5 = new Print(5, Print.PrintType.PARENTS);
      
    static {  
        System.out.println("parents static block");  
    }  
      
    private static Print param6 = new Print(6, Print.PrintType.PARENTS);
      
    private Print param1 = new Print(1);  
      
    {  
        System.out.println("parents instance block");  
    }  
      
      
    public Parents() {  
        System.out.println("parents construction method ");  
    }  
      
    private Print param2 = new Print(2);  
}  
