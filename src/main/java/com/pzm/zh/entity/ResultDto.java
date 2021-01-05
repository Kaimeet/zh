package com.pzm.zh.entity;

/**
 * @program: zh
 * @description: 返回前端视图dto
 * @author: Mr.Tong
 * @create: 2020-11-16 09:20
 **/
public class ResultDto {
    private String partName;//部件名称

    private String length;//长

    private String width;//宽

    private String high;//高

    private String numbyZhuang;//数量张

    private String numbyGens;//数量根

    private String numbyGe;//数量个

    private String yuliaoLen;//余料长

    private String yuliaoWidth;//余料宽

    public ResultDto() {

    }
    public ResultDto(String partName, String length, String width, String high, String numbyZhuang, String numbyGens, String numbyGe, String yuliaoLen, String yuliaoWidth) {
        this.partName = partName;
        this.length = length;
        this.width = width;
        this.high = high;
        this.numbyZhuang = numbyZhuang;
        this.numbyGens = numbyGens;
        this.numbyGe = numbyGe;
        this.yuliaoLen = yuliaoLen;
        this.yuliaoWidth = yuliaoWidth;
    }

    public String getPartName() {
        return partName;
    }

    public void setPartName(String partName) {
        this.partName = partName;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public String getHigh() {
        return high;
    }

    public void setHigh(String high) {
        this.high = high;
    }

    public String getNumbyZhuang() {
        return numbyZhuang;
    }

    public void setNumbyZhuang(String numbyZhuang) {
        this.numbyZhuang = numbyZhuang;
    }

    public String getNumbyGens() {
        return numbyGens;
    }

    public void setNumbyGens(String numbyGens) {
        this.numbyGens = numbyGens;
    }

    public String getNumbyGe() {
        return numbyGe;
    }

    public void setNumbyGe(String numbyGe) {
        this.numbyGe = numbyGe;
    }

    public String getYuliaoLen() {
        return yuliaoLen;
    }

    public void setYuliaoLen(String yuliaoLen) {
        this.yuliaoLen = yuliaoLen;
    }

    public String getYuliaoWidth() {
        return yuliaoWidth;
    }

    public void setYuliaoWidth(String yuliaoWidth) {
        this.yuliaoWidth = yuliaoWidth;
    }
}
