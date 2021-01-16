package com.pzm.zh.entity;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @program: zh
 * @description: 接收前端传输的运算变量
 * @author: Mr.Tong
 * @create: 2020-11-16 10:13
 **/
public class CaseDto extends Variables {

    private Double caoweight; // 槽宽

    private String dataIndex; //序号

    private String caseires;//算法系列

    public CaseDto(Integer id, Integer REVISION, String CREATED_BY, Date CREATED_TIME, String UPDATED_BY, Date UPDATED_TIME, BigDecimal doorhigh, String style, BigDecimal doorweight, Integer doornums, String serizes, BigDecimal ztweight, BigDecimal plaThick, BigDecimal sztweight, BigDecimal bkweight, BigDecimal sxHigh, BigDecimal zxHigh, BigDecimal xxHigh, BigDecimal zdWeight, BigDecimal xbDepth, BigDecimal zxWeight, BigDecimal smWeight, BigDecimal xmWeight, BigDecimal glassDepth, BigDecimal zztWeight, BigDecimal xztWeight, String memo1, String memo2, String memo3, String memo4, String memo5, String memo6, Integer serizesId) {
        super(id, REVISION, CREATED_BY, CREATED_TIME, UPDATED_BY, UPDATED_TIME, doorhigh, style, doorweight, doornums, serizes, ztweight, plaThick, sztweight, bkweight, sxHigh, zxHigh, xxHigh, zdWeight, xbDepth, zxWeight, smWeight, xmWeight, glassDepth, zztWeight, xztWeight, memo1, memo2, memo3, memo4, memo5, memo6, serizesId);
    }

    public CaseDto() {
    }

    public CaseDto(Integer id, Integer REVISION, String CREATED_BY, Date CREATED_TIME, String UPDATED_BY, Date UPDATED_TIME, BigDecimal doorhigh, String style, BigDecimal doorweight, Integer doornums, String serizes, BigDecimal ztweight, BigDecimal plaThick, BigDecimal sztweight, BigDecimal bkweight, BigDecimal sxHigh, BigDecimal zxHigh, BigDecimal xxHigh, BigDecimal zdWeight, BigDecimal xbDepth, BigDecimal zxWeight, BigDecimal smWeight, BigDecimal xmWeight, BigDecimal glassDepth, BigDecimal zztWeight, BigDecimal xztWeight, String memo1, String memo2, String memo3, String memo4, String memo5, String memo6, Integer serizesId, String caseires,String dataIndex) {
        super(id, REVISION, CREATED_BY, CREATED_TIME, UPDATED_BY, UPDATED_TIME, doorhigh, style, doorweight, doornums, serizes, ztweight, plaThick, sztweight, bkweight, sxHigh, zxHigh, xxHigh, zdWeight, xbDepth, zxWeight, smWeight, xmWeight, glassDepth, zztWeight, xztWeight, memo1, memo2, memo3, memo4, memo5, memo6, serizesId);
        this.caseires = caseires;
        this.dataIndex = dataIndex;
    }

    public CaseDto(String caseires) {
        this.caseires = caseires;
    }

    public String getCaseires() {
        return caseires;
    }

    public void setCaseires(String caseires) {
        this.caseires = caseires;
    }

    public String getDataIndex() {
        return dataIndex;
    }

    public void setDataIndex(String dataIndex) {
        this.dataIndex = dataIndex;
    }

    public Double getCaoweight() {
        return caoweight;
    }

    public void setCaoweight(Double caoweight) {
        this.caoweight = caoweight;
    }
}
