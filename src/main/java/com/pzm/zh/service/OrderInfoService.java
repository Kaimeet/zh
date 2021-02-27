package com.pzm.zh.service;

import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.OrderInfo;


public interface OrderInfoService {
    // 获取工单信息
    OrderInfo selectOrderInfo(String jobNum);

    // 获取工单信息，以及相关系列信息
    CaseDto getCaseDtoList(String jobNum);

    //是否有对应的订单信息
    Boolean isOrderInfo(String jobNum);

    //是否有对应的型号信息
    Boolean isSerizes(String jobNum);

}
