package com.pzm.zh.entity;

import java.util.Date;

public class Numbyser {
    private Integer id;

    private Integer REVISION;

    private String CREATED_BY;

    private Date CREATED_TIME;

    private String UPDATED_BY;

    private Date UPDATED_TIME;

    private Integer serizesId;//系列ID

    private String biannums;//边框数量

    private String zhismnums;//直上帽数量

    private String zzdnums;//中中档数量

    private String xzdnums;//下中档数量

    private String wxzdnums;//

    private String sztnums;//上中挺数量

    private String zztnums;//中中挺数量

    private String xztnums;//下中挺数量

    private String xmnums;//下帽数量

    private String sxbnums;//上芯板数量

    private String zxbnums;//中芯板数量

    private String xxbnums;//

    private String sblnums;//

    private String zblnums;//

    private String xblnums;//

    private String msnums;//

    private String memo1;

    private String memo2;

    private String memo3;

    private String serizes;

    private String style;

    public Numbyser(Integer id, Integer REVISION, String CREATED_BY, Date CREATED_TIME, String UPDATED_BY, Date UPDATED_TIME, Integer serizesId, String biannums, String zhismnums, String zzdnums, String xzdnums, String wxzdnums, String sztnums, String zztnums, String xztnums, String xmnums, String sxbnums, String zxbnums, String xxbnums, String sblnums, String zblnums, String xblnums, String msnums, String memo1, String memo2, String memo3, String serizes, String style) {
        this.id = id;
        this.REVISION = REVISION;
        this.CREATED_BY = CREATED_BY;
        this.CREATED_TIME = CREATED_TIME;
        this.UPDATED_BY = UPDATED_BY;
        this.UPDATED_TIME = UPDATED_TIME;
        this.serizesId = serizesId;
        this.biannums = biannums;
        this.zhismnums = zhismnums;
        this.zzdnums = zzdnums;
        this.xzdnums = xzdnums;
        this.wxzdnums = wxzdnums;
        this.sztnums = sztnums;
        this.zztnums = zztnums;
        this.xztnums = xztnums;
        this.xmnums = xmnums;
        this.sxbnums = sxbnums;
        this.zxbnums = zxbnums;
        this.xxbnums = xxbnums;
        this.sblnums = sblnums;
        this.zblnums = zblnums;
        this.xblnums = xblnums;
        this.msnums = msnums;
        this.memo1 = memo1;
        this.memo2 = memo2;
        this.memo3 = memo3;
        this.style = style;
        this.serizes = serizes;
    }

    public Numbyser(Integer id, Integer REVISION, String CREATED_BY, Date CREATED_TIME, String UPDATED_BY, Date UPDATED_TIME, Integer serizesId, String biannums, String zhismnums, String zzdnums, String xzdnums, String wxzdnums, String sztnums, String zztnums, String xztnums, String xmnums, String sxbnums, String zxbnums, String xxbnums, String sblnums, String zblnums, String xblnums, String msnums, String memo1, String memo2, String memo3) {
        this.id = id;
        this.REVISION = REVISION;
        this.CREATED_BY = CREATED_BY;
        this.CREATED_TIME = CREATED_TIME;
        this.UPDATED_BY = UPDATED_BY;
        this.UPDATED_TIME = UPDATED_TIME;
        this.serizesId = serizesId;
        this.biannums = biannums;
        this.zhismnums = zhismnums;
        this.zzdnums = zzdnums;
        this.xzdnums = xzdnums;
        this.wxzdnums = wxzdnums;
        this.sztnums = sztnums;
        this.zztnums = zztnums;
        this.xztnums = xztnums;
        this.xmnums = xmnums;
        this.sxbnums = sxbnums;
        this.zxbnums = zxbnums;
        this.xxbnums = xxbnums;
        this.sblnums = sblnums;
        this.zblnums = zblnums;
        this.xblnums = xblnums;
        this.msnums = msnums;
        this.memo1 = memo1;
        this.memo2 = memo2;
        this.memo3 = memo3;
    }

    public String getSerizes() {
        return serizes;
    }

    public void setSerizes(String serizes) {
        this.serizes = serizes;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public Numbyser() {
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

    public Integer getSerizesId() {
        return serizesId;
    }

    public void setSerizesId(Integer serizesId) {
        this.serizesId = serizesId;
    }

    public String getBiannums() {
        return biannums;
    }

    public void setBiannums(String biannums) {
        this.biannums = biannums == null ? null : biannums.trim();
    }

    public String getZhismnums() {
        return zhismnums;
    }

    public void setZhismnums(String zhismnums) {
        this.zhismnums = zhismnums == null ? null : zhismnums.trim();
    }

    public String getZzdnums() {
        return zzdnums;
    }

    public void setZzdnums(String zzdnums) {
        this.zzdnums = zzdnums == null ? null : zzdnums.trim();
    }

    public String getXzdnums() {
        return xzdnums;
    }

    public void setXzdnums(String xzdnums) {
        this.xzdnums = xzdnums == null ? null : xzdnums.trim();
    }

    public String getWxzdnums() {
        return wxzdnums;
    }

    public void setWxzdnums(String wxzdnums) {
        this.wxzdnums = wxzdnums == null ? null : wxzdnums.trim();
    }

    public String getSztnums() {
        return sztnums;
    }

    public void setSztnums(String sztnums) {
        this.sztnums = sztnums == null ? null : sztnums.trim();
    }

    public String getZztnums() {
        return zztnums;
    }

    public void setZztnums(String zztnums) {
        this.zztnums = zztnums == null ? null : zztnums.trim();
    }

    public String getXztnums() {
        return xztnums;
    }

    public void setXztnums(String xztnums) {
        this.xztnums = xztnums == null ? null : xztnums.trim();
    }

    public String getXmnums() {
        return xmnums;
    }

    public void setXmnums(String xmnums) {
        this.xmnums = xmnums == null ? null : xmnums.trim();
    }

    public String getSxbnums() {
        return sxbnums;
    }

    public void setSxbnums(String sxbnums) {
        this.sxbnums = sxbnums == null ? null : sxbnums.trim();
    }

    public String getZxbnums() {
        return zxbnums;
    }

    public void setZxbnums(String zxbnums) {
        this.zxbnums = zxbnums == null ? null : zxbnums.trim();
    }

    public String getXxbnums() {
        return xxbnums;
    }

    public void setXxbnums(String xxbnums) {
        this.xxbnums = xxbnums == null ? null : xxbnums.trim();
    }

    public String getSblnums() {
        return sblnums;
    }

    public void setSblnums(String sblnums) {
        this.sblnums = sblnums == null ? null : sblnums.trim();
    }

    public String getZblnums() {
        return zblnums;
    }

    public void setZblnums(String zblnums) {
        this.zblnums = zblnums == null ? null : zblnums.trim();
    }

    public String getXblnums() {
        return xblnums;
    }

    public void setXblnums(String xblnums) {
        this.xblnums = xblnums == null ? null : xblnums.trim();
    }

    public String getMsnums() {
        return msnums;
    }

    public void setMsnums(String msnums) {
        this.msnums = msnums == null ? null : msnums.trim();
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

    @Override
    public String toString() {
        return "Numbyser{" +
                "id=" + id +
                ", REVISION=" + REVISION +
                ", CREATED_BY='" + CREATED_BY + '\'' +
                ", CREATED_TIME=" + CREATED_TIME +
                ", UPDATED_BY='" + UPDATED_BY + '\'' +
                ", UPDATED_TIME=" + UPDATED_TIME +
                ", serizesId=" + serizesId +
                ", biannums='" + biannums + '\'' +
                ", zhismnums='" + zhismnums + '\'' +
                ", zzdnums='" + zzdnums + '\'' +
                ", xzdnums='" + xzdnums + '\'' +
                ", wxzdnums='" + wxzdnums + '\'' +
                ", sztnums='" + sztnums + '\'' +
                ", zztnums='" + zztnums + '\'' +
                ", xztnums='" + xztnums + '\'' +
                ", xmnums='" + xmnums + '\'' +
                ", sxbnums='" + sxbnums + '\'' +
                ", zxbnums='" + zxbnums + '\'' +
                ", xxbnums='" + xxbnums + '\'' +
                ", sblnums='" + sblnums + '\'' +
                ", zblnums='" + zblnums + '\'' +
                ", xblnums='" + xblnums + '\'' +
                ", msnums='" + msnums + '\'' +
                ", memo1='" + memo1 + '\'' +
                ", memo2='" + memo2 + '\'' +
                ", memo3='" + memo3 + '\'' +
                ", serizes='" + serizes + '\'' +
                ", style='" + style + '\'' +
                '}';
    }
}