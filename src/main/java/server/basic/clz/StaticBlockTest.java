package server.basic.clz;

class StaticBlock {
        static final int c = 3;

        static final int d;

        static {
                d = 6;
                e = 10;
                System.out.println("Initializing");
        }
        StaticBlock() {
                System.out.println("Building");
        }

        static int e = 5;
}

public class StaticBlockTest {
        public static void main(String[] args) {
                System.out.println(StaticBlock.c);
                System.out.println(StaticBlock.d);
//                System.out.println(StaticBlock.d);

                System.out.println(StaticBlock.e);
        }
}