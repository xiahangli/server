package server.basic.net.socket.client;


import java.io.*;
import java.net.*;

/**
 * Created by henry on 2018/3/15.
 */
public class Client {
    public static void main(String[] args) {
        try {
            InetAddress inetAddress = InetAddress.getByName(null);//127.0.0.1
            Socket socket = new Socket(inetAddress, 8099);
//            socket.connect();
//            socket.getOutputStream()//getOutputStream的时候建立连接
            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
//监听控制台输入流
            BufferedReader consoleInputBufferReader = new BufferedReader(new InputStreamReader(System.in));
            String consolContent = null;
            if ((consolContent = consoleInputBufferReader.readLine()) != null) {
                bufferedWriter.write(consolContent + "\r\n");
                bufferedWriter.flush();
            }

//            bufferedWriter.write("hello server");
//            //在使用BufferedReader中的readLine方法接收BufferedWriter中的字符流时，
//            // 由于readLine是在读取到换行符的时候才将整行字符返回，
//            // 所以BufferedWriter方法在录入一段字符后要使用newLine方法进行一次换行操作，
//            // 然后再把字符流刷出去
//            bufferedWriter.newLine();//换行，告诉服务端我发送好了
//            bufferedWriter.flush();
//            bufferedWriter.close();

            //使用PrintWriter实现，推荐
//            PrintWriter printWriter = new PrintWriter(socket.getOutputStream());
//            printWriter.println("hello server");
            BufferedReader br = new BufferedReader(new InputStreamReader(socket.getInputStream()));
//            String str = br.readLine();
//            System.out.println("client receive " + str);

            startServerReplyListener(br);

        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /**
     * 监听服务器随时有可能发送过来的消息
     */
    public static void startServerReplyListener(final BufferedReader reader) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                while (true) {//一直监听服务器的返回
                    String response;
                    System.out.println("===========");
                    try {
                        while ((response = reader.readLine()) != null) {
                            System.out.println("服务器的回复是--" + response);
                        }
                    } catch (IOException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }

                }

            }
        }).start();
    }
}
