package server;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

public class HelloResponse extends HttpServlet {
 
    private static final long serialVersionUID = 3903946972744326948L;
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置Content-Type响应头，编码格式为UTF-8
        resp.setHeader("Content-Type","text/html;charset=utf-8");
        outPutOutputStream(resp);
    }
    /**
     * 
     * @方法名: outPutOutputStream
     * @描述: 使用OutputStream输出流输出数据
     * @param resp
     * @throws IOException 
     * @创建人 zender
     */
    private void outPutOutputStream(HttpServletResponse resp) throws IOException{
        String data = "输出的内容";
        //获取OutputStream输出流
        OutputStream outputStream = resp.getOutputStream();
        //将字符转换成字节数组，指定以UTF-8编码进行转换
        byte[] dataByteArr = data.getBytes("UTF-8");
        //使用OutputStream流向客户端输出字节数组
        outputStream.write(dataByteArr);
    }
}