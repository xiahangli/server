package server.algorithm;

public class Heap {
   C[] pq = new C[]{new  C(1), new  C(4), new  C(3)};


   //上浮
   private void  swim(int k){
       while (k > 1 && less(k/2,k)){
            exch(k/2,k);
            k  = k/2;
       }
   }



   private void exch(int i,int j){
      C t;
      t = pq[i];
      pq[j] = t;
      pq[i] = t;
   }

    private boolean less(int i, int j) {
       //a-b<0则a<b
       return  pq[i].compareTo(pq[i]) <0;
    }


    private class C implements  Comparable<C>{
        int i;

        public C(int i) {
            this.i = i;
        }

        @Override
        public int compareTo(C t) {
            return  (this.i -t.i)>0?1:(this.i-t.i)<0?-1:0;
        }
    }
}
