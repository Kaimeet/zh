package com.pzm.zh.service;

import com.pzm.zh.dao.OrderInfoMapper;
import com.pzm.zh.dao.SerizesMapper;
import com.pzm.zh.dao.VariablesMapper;
import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.OrderInfo;
import com.pzm.zh.entity.Serizes;
import com.pzm.zh.entity.Variables;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;

@Service
public class OrderInfoServiceImpl implements OrderInfoService {

    @Resource
    private OrderInfoMapper orderInfoMapper;

    @Resource
    private SerizesMapper serizesMapper;

    @Resource
    private VariablesMapper variablesMapper;

    @Override
    public OrderInfo selectOrderInfo(String jobNum) {
        OrderInfo orderInfo = orderInfoMapper.selectOrderInfo(jobNum);
        if (orderInfo != null) {
            String sizeInfo = orderInfo.getSizeInfo();
            String[] xes = sizeInfo.split("x");
            if (xes.length == 3) {
                // 获取尺寸信息
                orderInfo.setHight(xes[0]);
                orderInfo.setWidth(xes[1]);
            }
        }
        return orderInfo;
    }

    // 获取工单信息，以及相关系列信息
    @Override
    public CaseDto getCaseDtoList(String jobNum) {
        OrderInfo orderInfo = orderInfoMapper.selectOrderInfo(jobNum);
        CaseDto caseDto = new CaseDto();
        caseDto.setJobNum(jobNum);
        // 获取尺寸信息
        if (orderInfo != null) {
            caseDto.setSalesOrderNum(orderInfo.salesOrderNum);
            if (orderInfo.getSizeInfo() != null) {
                String sizeInfo = orderInfo.getSizeInfo();
                String[] xes = sizeInfo.split("x");
                orderInfo.setHight(xes[0]);
                orderInfo.setWidth(xes[1]);
                caseDto.setDoorhigh(new BigDecimal(orderInfo.getHight()));
                caseDto.setDoorweight(new BigDecimal(orderInfo.getWidth()));
                caseDto.setDoornums(Double.valueOf(orderInfo.getNumberInfo()).intValue());
            }
        }
        // 获取款式名称信息
        Serizes serizes = new Serizes();
        Variables variables = new Variables();
        if (orderInfo != null && orderInfo.getSizeInfo() != null) {
            serizes = serizesMapper.selectByName(orderInfo.getStyleName());
            if (serizes != null && serizes.getId() != null) {
                Integer id = serizes.getId();
                variables = variablesMapper.selectbyseid(id);
                caseDto.setColorInfo(orderInfo.getColorInfo());
                caseDto.setCaoweight(variables.getCaoweight());
                caseDto.setPlaThick(variables.getPlaThick());
                caseDto.setZztWeight(variables.getZztWeight());
                caseDto.setSztweight(variables.getSztweight());
                caseDto.setBkweight(variables.getBkweight());
                caseDto.setSxHigh(variables.getSxHigh());
                caseDto.setZxHigh(variables.getZxHigh());
                caseDto.setXxHigh(variables.getXxHigh());
                caseDto.setZdWeight(variables.getZdWeight());
                caseDto.setZxWeight(variables.getZxWeight());
                caseDto.setXbDepth(variables.getXbDepth());
                caseDto.setSmWeight(variables.getSmWeight());
                caseDto.setXmWeight(variables.getXmWeight());
                caseDto.setMemo2(variables.getMemo2());
                caseDto.setXztWeight(variables.getXztWeight());
                caseDto.setGlassDepth(variables.getGlassDepth());
                caseDto.setMemo3(variables.getMemo3());
                caseDto.setMemo1(variables.getMemo1());
                caseDto.setMemo4(variables.getMemo4());
                caseDto.setMemo5(variables.getMemo5());
                caseDto.setSerizesId(serizes.getId());
                caseDto.setCaseires(serizes.getUntitled3());
            } else {
                serizes = serizesMapper.selectByName(orderInfo.getStyleNameAll());
                if (serizes != null && serizes.getId() != null) {
                    Integer id = serizes.getId();
                    variables = variablesMapper.selectbyseid(id);
                    caseDto.setColorInfo(orderInfo.getColorInfo());
                    caseDto.setCaoweight(variables.getCaoweight());
                    caseDto.setPlaThick(variables.getPlaThick());
                    caseDto.setZztWeight(variables.getZztWeight());
                    caseDto.setSztweight(variables.getSztweight());
                    caseDto.setBkweight(variables.getBkweight());
                    caseDto.setSxHigh(variables.getSxHigh());
                    caseDto.setZxHigh(variables.getZxHigh());
                    caseDto.setXxHigh(variables.getXxHigh());
                    caseDto.setZdWeight(variables.getZdWeight());
                    caseDto.setZxWeight(variables.getZxWeight());
                    caseDto.setXbDepth(variables.getXbDepth());
                    caseDto.setSmWeight(variables.getSmWeight());
                    caseDto.setXmWeight(variables.getXmWeight());
                    caseDto.setMemo2(variables.getMemo2());
                    caseDto.setXztWeight(variables.getXztWeight());
                    caseDto.setGlassDepth(variables.getGlassDepth());
                    caseDto.setMemo3(variables.getMemo3());
                    caseDto.setMemo1(variables.getMemo1());
                    caseDto.setMemo4(variables.getMemo4());
                    caseDto.setMemo5(variables.getMemo5());
                    caseDto.setSerizesId(serizes.getId());
                    caseDto.setCaseires(serizes.getUntitled3());
                }
            }
        }
        return caseDto;
    }

    @Override
    public Boolean isOrderInfo(String jobNum) {
        OrderInfo orderInfo = orderInfoMapper.selectOrderInfo(jobNum);
        Boolean flag = true;
        if (orderInfo == null) {
            flag = false;
        }
        return flag;
    }

    @Override
    public Boolean isSerizes(String jobNum) {
        OrderInfo orderInfo = orderInfoMapper.selectOrderInfo(jobNum);
        Boolean flag = false;
        if (orderInfo != null) {
            flag = true;
        }
        if (orderInfo != null && orderInfo.getStyleName() != null) {
            Serizes serizes = serizesMapper.selectByName(orderInfo.getStyleName());
            if (serizes != null) {
                Integer id = serizes.getId();
                Variables variables = variablesMapper.selectbyseid(id);
                if (variables != null) {
                    flag = true;
                } else {
                    flag = false;
                }
            } else {
                flag = false;
            }

        }
        if (!flag) {
            if (orderInfo != null && orderInfo.getStyleNameAll() != null) {
                Serizes serizes = serizesMapper.selectByName(orderInfo.getStyleNameAll());
                if (serizes != null) {
                    Integer id = serizes.getId();
                    Variables variables = variablesMapper.selectbyseid(id);
                    if (variables != null) {
                        flag = true;
                    } else {
                        flag = false;
                    }
                } else {
                    flag = false;
                }

            }
        }
        return flag;
    }
}


