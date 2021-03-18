package com.pzm.zh.entity;

import com.pzm.zh.annotation.ExcelColumn;

import java.math.BigDecimal;

public class Emp {

    @ExcelColumn(value = "工单号", col = 1)
    private String jobNum;

    private String partName;//部件名称

    private Double preLenght; // 备料长

    private Double preWidth; // 备料宽

    private Double preHight; // 备料高

    private String preSize; // 备料尺寸

    private Double length;//精截长

    private Double width;//精截长宽

    private Double high;//精截长高

    private String size; // 精截尺寸

    private BigDecimal caoweight;//槽宽

    private Double numbyZhuang;//数量张(片)

    private Double numbyGens;//数量根

    private Double numbyGe;//数量个

    private Double yuliaoLen;//余料长

    private Double yuliaoWidth;//余料宽

    private String salesOrderNum;// 销售订单号

    private String colorInfo; // 颜色


    public Double getPreLenght() {
        return preLenght;
    }

    public void setPreLenght(Double preLenght) {
        this.preLenght = preLenght;
    }

    public Double getPreWidth() {
        return preWidth;
    }

    public void setPreWidth(Double preWidth) {
        this.preWidth = preWidth;
    }

    public Double getPreHight() {
        return preHight;
    }

    public void setPreHight(Double preHight) {
        this.preHight = preHight;
    }

    public String getPreSize() {
        return preSize;
    }

    public void setPreSize(String preSize) {
        this.preSize = preSize;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

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
