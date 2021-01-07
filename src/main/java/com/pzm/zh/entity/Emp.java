package com.pzm.zh.entity;

import com.pzm.zh.annotation.ExcelColumn;

public class Emp {

    @ExcelColumn(value = "部件名称", col = 1)
    private String partName;//部件名称

    @ExcelColumn(value = "长", col = 2)
    private Double length;//长

    @ExcelColumn(value = "宽", col = 3)
    private Double width;//宽

    @ExcelColumn(value = "高", col = 4)
    private Double high;//高

    @ExcelColumn(value = "数量张/片", col = 5)
    private Double numbyZhuang;//数量张/片

    @ExcelColumn(value = "数量根", col = 6)
    private Double numbyGens;//数量根

    @ExcelColumn(value = "数量个", col = 6)
    private Double numbyGe;//数量个

    @ExcelColumn(value = "余料长", col = 7)
    private Double yuliaoLen;//余料长

    @ExcelColumn(value = "余料宽", col = 8)
    private Double yuliaoWidth;//余料宽

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
}
