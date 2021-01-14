package com.pzm.zh.entity;

/**
 * @program: zh
 * @description: 部件高
 * @author: Mr.Tong
 * @create: 2021-01-06 13:58
 **/
public class HighDto {
    private String name;
    private String high;

    public HighDto() {
    }

    public HighDto(String name, String high) {
        this.name = name;
        this.high = high;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHigh() {
        return high;
    }

    public void setHigh(String high) {
        this.high = high;
    }
}
