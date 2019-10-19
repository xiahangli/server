package com.example.xia.demo.controller;

import com.example.xia.demo.model.User;
import com.example.xia.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "api/user/getUserInfo", method = RequestMethod.GET)
   public User getUserInfo(){
            return userService.getUserInfo();
    }
}
