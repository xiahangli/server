package server.basic.net.socket.server;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by henry on 2018/3/15.
 */
public class Server {


    /**
     * 测试心跳,每隔3秒钟向客户端发一条消息
     */
    public static void test(final BufferedWriter writer) {
        Timer timer = new Timer();

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                try {
                    writer.write("testHeart...\n");
                    writer.flush();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }, 3000, 3000);//每隔3秒发送一次心跳数据包
    }


    public static void main(String[] args) {

        try {
            ServerSocket serverSocket = new ServerSocket(8099);
            while (true) {//为了测试
                //声明周期不一致，需要设置成final,对GC有一定影响
                final Socket incoming = serverSocket.accept();//阻塞连接

                new Thread(new Runnable() {
                    public void run() {
                        try {
                            System.out.println("客户端连入" + incoming.hashCode());
                            incoming.getInputStream();
                            //Reader是读取字符流的
                            BufferedReader br = new BufferedReader(new InputStreamReader(incoming.getInputStream()));
                            //
                            //服务器回传客户端数据
                            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(
                                    incoming.getOutputStream()));

                            String str = null;
                            while ((str = br.readLine()) != null) {//客户端发送消息
                                System.out.println("收到客户端" + incoming.hashCode() + "发送的消息：" + str);
                                bw.write("i have received");
                                bw.newLine();
                                test(bw);//todo 测试心跳
                                bw.flush();

                            }
//                            System.out.println("server get "+ str);


                        } catch (IOException e) {
                            e.printStackTrace();
                        }


                    }
                }).start();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
