package com.pzm.zh.entity;

import java.math.BigDecimal;
import java.util.Date;

public class Variables {
    private Integer id;

    private Integer REVISION;

    private String CREATED_BY;

    private Date CREATED_TIME;

    private String UPDATED_BY;

    private Date UPDATED_TIME;

    private BigDecimal doorhigh;

    private String style;

    private BigDecimal doorweight;

    private Integer doornums;

    private String serizes;

    private BigDecimal ztweight;

    private BigDecimal plaThick;

    private BigDecimal sztweight;

    private BigDecimal bkweight;

    private BigDecimal sxHigh;

    private BigDecimal zxHigh;

    private BigDecimal xxHigh;

    private BigDecimal zdWeight;

    private BigDecimal xbDepth;

    private BigDecimal zxWeight;

    private BigDecimal smWeight;

    private BigDecimal xmWeight;

    private BigDecimal glassDepth;

    private BigDecimal zztWeight;

    private BigDecimal xztWeight;

    private String memo1;

    private String memo2;

    private String memo3;

    private String memo4;

    private String memo5;

    private String memo6;

    private Integer serizesId;

    private BigDecimal caoweight;


    public Variables(Integer id, Integer REVISION, String CREATED_BY, Date CREATED_TIME, String UPDATED_BY, Date UPDATED_TIME, BigDecimal doorhigh, String style, BigDecimal doorweight, Integer doornums, String serizes, BigDecimal ztweight, BigDecimal plaThick, BigDecimal sztweight, BigDecimal bkweight, BigDecimal sxHigh, BigDecimal zxHigh, BigDecimal xxHigh, BigDecimal zdWeight, BigDecimal xbDepth, BigDecimal zxWeight, BigDecimal smWeight, BigDecimal xmWeight, BigDecimal glassDepth, BigDecimal zztWeight,
                     BigDecimal xztWeight, String memo1, String memo2, String memo3, String memo4, String memo5, String memo6, Integer serizesId,BigDecimal caoweight) {
        this.id = id;
        this.REVISION = REVISION;
        this.CREATED_BY = CREATED_BY;
        this.CREATED_TIME = CREATED_TIME;
        this.UPDATED_BY = UPDATED_BY;
        this.UPDATED_TIME = UPDATED_TIME;
        this.doorhigh = doorhigh;
        this.style = style;
        this.doorweight = doorweight;
        this.doornums = doornums;
        this.serizes = serizes;
        this.ztweight = ztweight;
        this.plaThick = plaThick;
        this.sztweight = sztweight;
        this.bkweight = bkweight;
        this.sxHigh = sxHigh;
        this.zxHigh = zxHigh;
        this.xxHigh = xxHigh;
        this.zdWeight = zdWeight;
        this.xbDepth = xbDepth;
        this.zxWeight = zxWeight;
        this.smWeight = smWeight;
        this.xmWeight = xmWeight;
        this.glassDepth = glassDepth;
        this.zztWeight = zztWeight;
        this.xztWeight = xztWeight;
        this.memo1 = memo1;
        this.memo2 = memo2;
        this.memo3 = memo3;
        this.memo4 = memo4;
        this.memo5 = memo5;
        this.memo6 = memo6;
        this.serizesId = serizesId;
        this.caoweight = caoweight;
    }

    public Variables() {
        super();
    }

    public BigDecimal getCaoweight() {
        return caoweight;
    }

    public void setCaoweight(BigDecimal caoweight) {
        this.caoweight = caoweight;
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

    public BigDecimal getDoorhigh() {
        return doorhigh;
    }

    public void setDoorhigh(BigDecimal doorhigh) {
        this.doorhigh = doorhigh;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style == null ? null : style.trim();
    }

    public BigDecimal getDoorweight() {
        return doorweight;
    }

    public void setDoorweight(BigDecimal doorweight) {
        this.doorweight = doorweight;
    }

    public Integer getDoornums() {
        return doornums;
    }

    public void setDoornums(Integer doornums) {
        this.doornums = doornums;
    }

    public String getSerizes() {
        return serizes;
    }

    public void setSerizes(String serizes) {
        this.serizes = serizes == null ? null : serizes.trim();
    }

    public BigDecimal getZtweight() {
        return ztweight;
    }

    public void setZtweight(BigDecimal ztweight) {
        this.ztweight = ztweight;
    }

    public BigDecimal getPlaThick() {
        return plaThick;
    }

    public void setPlaThick(BigDecimal plaThick) {
        this.plaThick = plaThick;
    }

    public BigDecimal getSztweight() {
        return sztweight;
    }

    public void setSztweight(BigDecimal sztweight) {
        this.sztweight = sztweight;
    }

    public BigDecimal getBkweight() {
        return bkweight;
    }

    public void setBkweight(BigDecimal bkweight) {
        this.bkweight = bkweight;
    }

    public BigDecimal getSxHigh() {
        return sxHigh;
    }

    public void setSxHigh(BigDecimal sxHigh) {
        this.sxHigh = sxHigh;
    }

    public BigDecimal getZxHigh() {
        return zxHigh;
    }

    public void setZxHigh(BigDecimal zxHigh) {
        this.zxHigh = zxHigh;
    }

    public BigDecimal getXxHigh() {
        return xxHigh;
    }

    public void setXxHigh(BigDecimal xxHigh) {
        this.xxHigh = xxHigh;
    }

    public BigDecimal getZdWeight() {
        return zdWeight;
    }

    public void setZdWeight(BigDecimal zdWeight) {
        this.zdWeight = zdWeight;
    }

    public BigDecimal getXbDepth() {
        return xbDepth;
    }

    public void setXbDepth(BigDecimal xbDepth) {
        this.xbDepth = xbDepth;
    }

    public BigDecimal getZxWeight() {
        return zxWeight;
    }

    public void setZxWeight(BigDecimal zxWeight) {
        this.zxWeight = zxWeight;
    }

    public BigDecimal getSmWeight() {
        return smWeight;
    }

    public void setSmWeight(BigDecimal smWeight) {
        this.smWeight = smWeight;
    }

    public BigDecimal getXmWeight() {
        return xmWeight;
    }

    public void setXmWeight(BigDecimal xmWeight) {
        this.xmWeight = xmWeight;
    }

    public BigDecimal getGlassDepth() {
        return glassDepth;
    }

    public void setGlassDepth(BigDecimal glassDepth) {
        this.glassDepth = glassDepth;
    }

    public BigDecimal getZztWeight() {
        return zztWeight;
    }

    public void setZztWeight(BigDecimal zztWeight) {
        this.zztWeight = zztWeight;
    }

    public BigDecimal getXztWeight() {
        return xztWeight;
    }

    public void setXztWeight(BigDecimal xztWeight) {
        this.xztWeight = xztWeight;
    }

    public String getMemo1() {
        return memo1;
    }

    public void setMemo1(String memo1) {
        this.memo1 = memo1 == null ? null : memo1.trim();
    }

    public String getMemo2() {
        return memo2;
    }

    public void setMemo2(String memo2) {
        this.memo2 = memo2 == null ? null : memo2.trim();
    }

    public String getMemo3() {
        return memo3;
    }

    public void setMemo3(String memo3) {
        this.memo3 = memo3 == null ? null : memo3.trim();
    }

    public String getMemo4() {
        return memo4;
    }

    public void setMemo4(String memo4) {
        this.memo4 = memo4 == null ? null : memo4.trim();
    }

    public String getMemo5() {
        return memo5;
    }

    public void setMemo5(String memo5) {
        this.memo5 = memo5 == null ? null : memo5.trim();
    }

    public String getMemo6() {
        return memo6;
    }

    public void setMemo6(String memo6) {
        this.memo6 = memo6 == null ? null : memo6.trim();
    }

    public Integer getSerizesId() {
        return serizesId;
    }

    public void setSerizesId(Integer serizesId) {
        this.serizesId = serizesId;
    }
}