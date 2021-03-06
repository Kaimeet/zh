package com.pzm.zh.entity;

import com.pzm.zh.annotation.ExcelColumn;

/**
 * 订单实体类
 */
public class OrderInfo {

    // 工单号
    @ExcelColumn(value = "工单号",col = 1)
    public String jobNum;

    // 销售订单号
    public String salesOrderNum;

    // 颜色
    public String colorInfo;

    // 数量
    public String numberInfo;

    // 尺寸信息（高*宽*厚）
    public String sizeInfo;

    // 高
    public String hight;

    // 宽
    public String width;

    // 款式名称
    public String styleName;

    // 款式名称(全)，与上面的款式名称2选1，进行查找
    public String styleNameAll;

    public String getStyleNameAll() {
        return styleNameAll;
    }

    public void setStyleNameAll(String styleNameAll) {
        this.styleNameAll = styleNameAll;
    }

    public String getStyleName() {
        return styleName;
    }

    public void setStyleName(String styleName) {
        this.styleName = styleName;
    }

    public String getSizeInfo() {
        return sizeInfo;
    }

    public void setSizeInfo(String sizeInfo) {
        this.sizeInfo = sizeInfo;
    }

    public String getSalesOrderNum() {
        return salesOrderNum;
    }

    public void setSalesOrderNum(String salesOrderNum) {
        this.salesOrderNum = salesOrderNum;
    }

    public String getJobNum() {
        return jobNum;
    }

    public void setJobNum(String jobNum) {
        this.jobNum = jobNum;
    }

    public String getColorInfo() {
        return colorInfo;
    }

    public void setColorInfo(String colorInfo) {
        this.colorInfo = colorInfo;
    }

    public String getNumberInfo() {
        return numberInfo;
    }

    public void setNumberInfo(String numberInfo) {
        this.numberInfo = numberInfo;
    }

    public String getHight() {
        return hight;
    }

    public void setHight(String hight) {
        this.hight = hight;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    @Override
    public String toString() {
        return "OrderInfo{" +
                "salesOrderNum='" + salesOrderNum + '\'' +
                ", jobNum='" + jobNum + '\'' +
                ", colorInfo='" + colorInfo + '\'' +
                ", numberInfo='" + numberInfo + '\'' +
                ", sizeInfo='" + sizeInfo + '\'' +
                ", hight='" + hight + '\'' +
                ", width='" + width + '\'' +
                '}';
    }
}
