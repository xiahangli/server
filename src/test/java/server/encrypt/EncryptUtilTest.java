package server.encrypt;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/** 
* EncryptUtil Tester. 
* 
* @author <Authors name> 
* @since <pre>���� 23, 2019</pre> 
* @version 1.0 
*/ 
public class EncryptUtilTest { 

@Before
public void before() throws Exception { 
} 

@After
public void after() throws Exception { 
} 

/** 
* 
* Method: string2MD5(String string) 
* 
*/ 
@Test
public void testString2MD5() throws Exception { 
//TODO: Test goes here...
//    assertEquals(2,new EncryptUtil().string2MD5("xia"));
} 

/** 
* 
* Method: convertMD5(String string) 
* 
*/ 
@Test
public void testConvertMD5() throws Exception { 
//TODO: Test goes here...
    assertEquals("xia",EncryptUtil.convertMD5(EncryptUtil.string2MD5("xia")));
} 


} 
