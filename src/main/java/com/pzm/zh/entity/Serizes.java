package com.pzm.zh.entity;

import java.util.Date;

public class Serizes {
    private Integer id;

    private Integer REVISION;

    private String CREATED_BY;

    private Date CREATED_TIME;

    private String UPDATED_BY;

    private Date UPDATED_TIME;

    private String name;

    private String caserize;

    private String untitled4;

    private String untitled3;

    private String untitled2;

    private String untitled1;

    private String untitled;

    public Serizes(Integer id, Integer REVISION, String CREATED_BY, Date CREATED_TIME, String UPDATED_BY, Date UPDATED_TIME, String name, String caserize, String untitled4, String untitled3, String untitled2, String untitled1, String untitled) {
        this.id = id;
        this.REVISION = REVISION;
        this.CREATED_BY = CREATED_BY;
        this.CREATED_TIME = CREATED_TIME;
        this.UPDATED_BY = UPDATED_BY;
        this.UPDATED_TIME = UPDATED_TIME;
        this.name = name;
        this.caserize = caserize;
        this.untitled4 = untitled4;
        this.untitled3 = untitled3;
        this.untitled2 = untitled2;
        this.untitled1 = untitled1;
        this.untitled = untitled;
    }

    public Serizes() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getREVISION() {
        return REVISION;
    }

    public void setREVISION(Integer REVISION) {
        this.REVISION = REVISION;
    }

    public String getCREATED_BY() {
        return CREATED_BY;
    }

    public void setCREATED_BY(String CREATED_BY) {
        this.CREATED_BY = CREATED_BY == null ? null : CREATED_BY.trim();
    }

    public Date getCREATED_TIME() {
        return CREATED_TIME;
    }

    public void setCREATED_TIME(Date CREATED_TIME) {
        this.CREATED_TIME = CREATED_TIME;
    }

    public String getUPDATED_BY() {
        return UPDATED_BY;
    }

    public void setUPDATED_BY(String UPDATED_BY) {
        this.UPDATED_BY = UPDATED_BY == null ? null : UPDATED_BY.trim();
    }

    public Date getUPDATED_TIME() {
        return UPDATED_TIME;
    }

    public void setUPDATED_TIME(Date UPDATED_TIME) {
        this.UPDATED_TIME = UPDATED_TIME;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getCaserize() {
        return caserize;
    }

    public void setCaserize(String caserize) {
        this.caserize = caserize == null ? null : caserize.trim();
    }

    public String getUntitled4() {
        return untitled4;
    }

    public void setUntitled4(String untitled4) {
        this.untitled4 = untitled4 == null ? null : untitled4.trim();
    }

    public String getUntitled3() {
        return untitled3;
    }

    public void setUntitled3(String untitled3) {
        this.untitled3 = untitled3 == null ? null : untitled3.trim();
    }

    public String getUntitled2() {
        return untitled2;
    }

    public void setUntitled2(String untitled2) {
        this.untitled2 = untitled2 == null ? null : untitled2.trim();
    }

    public String getUntitled1() {
        return untitled1;
    }

    public void setUntitled1(String untitled1) {
        this.untitled1 = untitled1 == null ? null : untitled1.trim();
    }

    public String getUntitled() {
        return untitled;
    }

    public void setUntitled(String untitled) {
        this.untitled = untitled == null ? null : untitled.trim();
    }
}