package com.pzm.zh;

import com.alibaba.druid.spring.boot.autoconfigure.DruidDataSourceAutoConfigure;
import com.pzm.zh.controller.ExcelController;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = DruidDataSourceAutoConfigure.class)
@ServletComponentScan
@EnableScheduling
@MapperScan("com.pzm.zh.dao")
public class ZhApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZhApplication.class, args);
    }

}
