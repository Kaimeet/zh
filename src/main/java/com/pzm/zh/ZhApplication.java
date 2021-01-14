package com.pzm.zh;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceAutoConfigure;
import com.pzm.zh.dao.VariablesMapper;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = DruidDataSourceAutoConfigure.class)
@ServletComponentScan
@EnableScheduling
@MapperScan("com.pzm.zh.dao")
public class ZhApplication {

    public static void main(String[] args) {

        ConfigurableApplicationContext context=SpringApplication.run(ZhApplication.class, args);
        VariablesMapper variablesMapper=context.getBean(VariablesMapper.class);
        System.out.println(variablesMapper.selecthigh("边框").getHigh());
    }

}
