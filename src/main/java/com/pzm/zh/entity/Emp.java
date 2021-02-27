package com.pzm.zh.entity;

import com.pzm.zh.annotation.ExcelColumn;

import java.math.BigDecimal;

public class Emp {

    @ExcelColumn(value = "工单号",col = 1)
    private String jobNum;

    @ExcelColumn(value = "部件名称", col = 2)
    private String partName;//部件名称

    @ExcelColumn(value = "长", col = 3)
    private Double length;//长

    @ExcelColumn(value = "宽", col = 4)
    private Double width;//宽

    @ExcelColumn(value = "高", col = 5)
    private Double high;//高

    @ExcelColumn(value = "槽宽", col = 6)
    private BigDecimal caoweight;//槽宽

    @ExcelColumn(value = "数量张(片)", col = 7)
    private Double numbyZhuang;//数量张(片)

    @ExcelColumn(value = "数量根", col = 8)
    private Double numbyGens;//数量根

    @ExcelColumn(value = "数量个", col = 9)
    private Double numbyGe;//数量个

    @ExcelColumn(value = "余料长", col = 10)
    private Double yuliaoLen;//余料长

    @ExcelColumn(value = "余料宽", col = 11)
    private Double yuliaoWidth;//余料宽

    @ExcelColumn(value = "销售订单号", col = 12)
    private String salesOrderNum;// 销售订单号

    @ExcelColumn(value = "颜色", col = 13)
    private String colorInfo; // 颜色

    public String getPartName() {
        return partName;
    }

    public void setPartName(String partName) {
        this.partName = partName;
    }

    public Double getLength() {
        return length;
    }

    public void setLength(Double length) {
        this.length = length;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHigh() {
        return high;
    }

    public void setHigh(Double high) {
        this.high = high;
    }

    public Double getNumbyZhuang() {
        return numbyZhuang;
    }

    public void setNumbyZhuang(Double numbyZhuang) {
        this.numbyZhuang = numbyZhuang;
    }

    public Double getNumbyGens() {
        return numbyGens;
    }

    public void setNumbyGens(Double numbyGens) {
        this.numbyGens = numbyGens;
    }

    public Double getNumbyGe() {
        return numbyGe;
    }

    public void setNumbyGe(Double numbyGe) {
        this.numbyGe = numbyGe;
    }

    public Double getYuliaoLen() {
        return yuliaoLen;
    }

    public void setYuliaoLen(Double yuliaoLen) {
        this.yuliaoLen = yuliaoLen;
    }

    public Double getYuliaoWidth() {
        return yuliaoWidth;
    }

    public void setYuliaoWidth(Double yuliaoWidth) {
        this.yuliaoWidth = yuliaoWidth;
    }


    public BigDecimal getCaoweight() {
        return caoweight;
    }

    public void setCaoweight(BigDecimal caoweight) {
        this.caoweight = caoweight;
    }

    public String getJobNum() {
        return jobNum;
    }

    public void setJobNum(String jobNum) {
        this.jobNum = jobNum;
    }

    public String getSalesOrderNum() {
        return salesOrderNum;
    }

    public void setSalesOrderNum(String salesOrderNum) {
        this.salesOrderNum = salesOrderNum;
    }

    public String getColorInfo() {
        return colorInfo;
    }

    public void setColorInfo(String colorInfo) {
        this.colorInfo = colorInfo;
    }
}
