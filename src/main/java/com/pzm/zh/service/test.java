package com.pzm.zh.service;

import com.pzm.zh.entity.CaseDoubles;

import java.math.BigDecimal;

/**
 * @program: zh
 * @description: t
 * @author: Mr.Tong
 * @create: 2020-12-16 08:53
 **/
public class test {
    public static void main(String[] args) {
        System.out.println(new BigDecimal(2.56).setScale(1, BigDecimal.ROUND_HALF_UP).doubleValue());
    }
}
