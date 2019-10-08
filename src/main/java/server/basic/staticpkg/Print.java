package server.basic.staticpkg;

public class Print {
      
    public Print(int i) {  
        System.out.println("instance print: " + i);  
    }  
      
    public Print(int i, PrintType type) {  
          
        if (type == PrintType.PARENTS) {  
              
            System.out.println("parent static print: " + i);  
              
        } else {  
              
            System.out.println("son static print: " + i);  
              
        }  
    }  
      
    enum PrintType {  
          
        PARENTS,  
          
        SON  
    }  
}