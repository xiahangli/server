package server.basic.concurrent;

import java.math.BigInteger;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2019/8/12.
 */
public class PrimeGenerator implements Runnable {

    private final List<BigInteger> primes = new ArrayList<>();
    private volatile boolean canceled;

    @Override
    public void run() {
        BigInteger p = BigInteger.ONE;
        while (!canceled) {
            p = p.nextProbablePrime();//下一个质数
            synchronized (this) {
                primes.add(p);
            }
        }
    }


    public void cancele() {
        canceled = true;
    }

    public static void main(String[] args) {
        PrimeGenerator primeGenerator = new PrimeGenerator();
        new Thread(primeGenerator).start();

        try {
            TimeUnit.SECONDS.sleep(1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            primeGenerator.cancele();
        }
        List<BigInteger> bi
                = primeGenerator.get();
        System.out.println();
    }

     private static ThreadLocal<Connection> connectionHolder = new ThreadLocal<Connection>(){
         @Override
         protected Connection initialValue() {
             try {
                 return DriverManager.getConnection("xxxxxx");
             } catch (SQLException e) {
                 e.printStackTrace();
                 return null;
             }
         }
     };













    public synchronized List<BigInteger> get() {
        return new ArrayList<>(primes);
    }
}
