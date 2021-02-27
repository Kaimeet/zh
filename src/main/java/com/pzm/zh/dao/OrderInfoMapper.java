package com.pzm.zh.dao;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.pzm.zh.entity.Numbyser;
import com.pzm.zh.entity.OrderInfo;

@DS(value = "master")
public interface OrderInfoMapper {
    // 通过工单号查询相关的信息
    OrderInfo selectOrderInfo(String jobNum);
}