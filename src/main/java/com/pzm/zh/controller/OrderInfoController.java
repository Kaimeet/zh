package com.pzm.zh.controller;

import com.pzm.zh.entity.OrderInfo;
import com.pzm.zh.service.OrderInfoService;
import com.pzm.zh.util.Dto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "/orderInfo")
public class OrderInfoController {

    @Resource
    private OrderInfoService orderInfoServiceImpl;

    /**
     * 获取对应工单号的相关信息
     * @param jobNum 工单号
     * @return
     */
    @RequestMapping(value = "/getOrderInfo" , method = RequestMethod.GET)
    public Dto<OrderInfo> getOrderInfo(String jobNum) {
        OrderInfo orderInfo = orderInfoServiceImpl.selectOrderInfo(jobNum);
        Dto<OrderInfo> dto = new Dto<>();
        if (orderInfo != null) {
            dto.setSuccess("200");
            dto.setMsg("请求成功！");
        } else {
            dto.setSuccess("402");
            dto.setMsg("未找到对应的工单号的相关信息！");
        }
        dto.setData(orderInfo);
        return dto;
    }
}
