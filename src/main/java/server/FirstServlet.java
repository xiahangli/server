package server;

import com.google.gson.Gson;
import server.TestServerForClient.SerializeNameGson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Created by henry on 2017/11/6.
 */
@WebServlet(name = "FirstServlet")
public class FirstServlet extends HttpServlet {

    private String message;

    public void init() throws ServletException {
        // Do required initialization
        message = "Hello World";
    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPut(req, resp);
    }

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response)
            throws ServletException, IOException {

        DataOutputStream output=new DataOutputStream(response.getOutputStream());
        output.writeUTF("服务器端数据:");
        System.out.println("=======服务器端数据");
        output.writeInt(1);
        output.close();
        // Set response content type
//        response.setContentType("text/html");
//        // Actual logic goes here.
//        PrintWriter out1 = response.getWriter();
//        out1.println("<h1>" + message + "</h1>");
//
//
//
//        StringBuffer jb = new StringBuffer();
//        String line = null;
//        String result = "";
//        try {
//            //读取输入流到StringBuffer中
//            BufferedReader reader = request.getReader();
//            while ((line = reader.readLine()) != null)
//                jb.append(line);
//
//            System.out.println("============="+reader.toString());
//        } catch (Exception e) {
//            System.out.println("==========error");
//            e.printStackTrace();    /*report an error*/
//        }
//
//
//        try {
//            //使用JSONObject的parseObject方法解析JSON字符串
////            JSONObject jsonObject = JSONObject.parseObject(jb.toString());
////            result = jsonObject.toJSONString();
//            Gson gson =new Gson();
//            SerializeNameGson serializeNameGson = gson.fromJson(jb.toString(), SerializeNameGson.class);
//
//        } catch (Exception e) {
//            // crash and burn
//            throw new IOException("Error parsing JSON request string");
//        }
//        //先将服务器收到的JSON字符串打印到客户端，再将该字符串转换为JSON对象然后再转换成的JSON字符串打印到客户端
//        PrintStream out = new PrintStream(response.getOutputStream());
//        out.println(jb.toString());
//        out.println(result);
    }

    public void destroy() {
        // do nothing.
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

//        response.setContentType("text/html");
//        // Actual logic goes here.
//        PrintWriter out1 = response.getWriter();
//        out1.println("<h1>" + message + "</h1>");
//
//
//
//        StringBuffer jb = new StringBuffer();
//        String line = null;
//        String result = "";
//        BufferedReader reader;


        DataOutputStream output=new DataOutputStream(response.getOutputStream());
            output.writeUTF("服务器端数据:");
            System.out.println("=======服务器端数据");
            output.writeInt(1);
            output.close();

//        try {
//            //读取输入流到StringBuffer中
//            reader= request.getReader();
//            while ((line = reader.readLine()) != null)
//                jb.append(line);
//
//            System.out.println("============="+reader.toString());
//        } catch (Exception e) {
//            System.out.println("==========error");
//            e.printStackTrace();    /*report an error*/
//        }



//        try {
//            //使用JSONObject的parseObject方法解析JSON字符串
////            JSONObject jsonObject = JSONObject.parseObject(jb.toString());
////            result = jsonObject.toJSONString();
//            Gson gson =new Gson();
//            SerializeNameGson serializeNameGson = gson.fromJson(jb.toString(), SerializeNameGson.class);
//
//        } catch (Exception e) {
//            // crash and burn
//            throw new IOException("Error parsing JSON request string");
//        }
//        //先将服务器收到的JSON字符串打印到客户端，再将该字符串转换为JSON对象然后再转换成的JSON字符串打印到客户端
//
//        response.getWriter().append("Served at: ").append(request.getContextPath());

//        PrintStream out = new PrintStream(response.getOutputStream());
//        out.println(jb.toString());
//        out.println(result);
//doGet(request,response);
//        System.out.println();
    }

//    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//
//    }
}
