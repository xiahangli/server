package server.basic.net.nio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.*;
import java.util.Iterator;
import java.util.Set;

/**
 * 服务器轮询任务类
 */
public class ServerHandler implements Runnable{

    private Selector  selector;

    private ServerSocketChannel serverSocketChannel;

    private volatile boolean started;

    public ServerHandler(int port){
        try {
            selector = Selector.open();
            //1.打开ServerSocketChannel（SelectableChannel（用户网络读写）的子类）通道
           serverSocketChannel= ServerSocketChannel.open();

            //2.socket绑定监听端口，channel设置连接非阻塞
            serverSocketChannel.configureBlocking(false);
            serverSocketChannel.socket().bind(new InetSocketAddress(port),1024);
            //5.selector监听新客户端介入，处理新的接入请求，完成tcp握手，遍历物理链路
            serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);
            started = true;//标记服务器已经启动
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        while (started){
            try {
                selector.select(1000);//1000ms唤醒一次多路选择器
                //4.selector轮询key
                Set<SelectionKey> keys = selector.selectedKeys();
                //迭代器遍历集合
                Iterator<SelectionKey> iterator = keys.iterator();
                SelectionKey key ;
                while (iterator.hasNext()){
                     key = iterator.next();
                    iterator.remove();//处理好从集合中删除
                    handleInput(key);
                }

            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

    private void handleInput(SelectionKey key) throws IOException {
        //先进行是否合理是否可读的判断等判断
        if (key.isValid()){
            if(key.isAcceptable()){
                ServerSocketChannel ssc = (ServerSocketChannel) key.channel();
                //5.selector监听新客户端介入，处理新的接入请求，完成tcp握手，遍历物理链路
                SocketChannel sc = ssc.accept();/**进行三次握手操作*/
                //todo cf 初始化的情况
                //6.设置客户端链路非阻塞模式
                sc.configureBlocking(false);
                //7.将新接入的客户端连接注册到reator线程的selector上，
                // 监听读操作，读取客户端发送的网络消息
                sc.register(selector,SelectionKey.OP_READ);

            }

            if (key.isReadable()) {
                //8.**异步读取客户端消息到缓冲区
                SocketChannel sc = (SocketChannel) key.channel();

                ByteBuffer bf = ByteBuffer.allocate(1024);
                int readByte = sc.read(bf);
                if (readByte>0){//读取到有效数据
                    bf.flip();//todo 将当前的limit设置成0
                    byte[] bytes = new byte[bf.remaining()];
                    bf.get(bytes);//将缓冲区域的数据复制到新开辟的bytes数组中
                    String exp = new String(bytes,"utf-8");

                }

            }

        }
    }

}
