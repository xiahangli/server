package com.example.xia.demo.service.impl;

import com.example.xia.demo.mapping.UserMapper;
import com.example.xia.demo.model.User;
import com.example.xia.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public User getUserInfo() {
        User user=userMapper.findUserInfo();
        //User user=null;
        return user;
    }
}
