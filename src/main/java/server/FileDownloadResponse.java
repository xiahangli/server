package server;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;

public class FileDownloadResponse extends HttpServlet {
 
    private static final long serialVersionUID = 3903946972744326948L;
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }
    
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取要下载的文件的绝对路径
        String realPath = this.getServletContext().getRealPath("/下载.png");
        //获取要下载的文件名
        String fileName = realPath.substring(realPath.lastIndexOf("\\")+1);
        //设置content-disposition响应头控制浏览器以下载的形式打开文件
        //中文文件名要使用URLEncoder.encode方法进行编码，否则会出现文件名乱码
        resp.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
        //获取文件输入流
        InputStream in = new FileInputStream(realPath);
        int len = 0;
        byte[] buffer = new byte[1024];
        OutputStream out = resp.getOutputStream();
        while ((len = in.read(buffer)) > 0) {
            out.write(buffer,0,len);//将缓冲区的数据输出到客户端浏览器
        }
        in.close();
        out.close();
    }
}