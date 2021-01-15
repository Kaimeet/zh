package com.pzm.zh.entity;

import java.util.ArrayList;
import java.util.List;

public class EmpData {

    // 计算后
    private List<Emp> normal;

    // 正常料
    private List<Emp> result;

    // 余料
    private List<Emp> remove;

    public List<Emp> getResult() {
        if (result == null || result.size() == 0){
            this.result = new ArrayList<>();
        }
        return result;
    }

    public void setResult(List<Emp> result) {
        this.result = result;
    }

    public List<Emp> getRemove() {
        if (remove == null || remove.size() ==0 ){
            this.remove = new ArrayList<>();
        }
        return remove;
    }

    public void setRemove(List<Emp> remove) {
        this.remove = remove;
    }

    public List<Emp> getNormal() {
        if (normal == null || normal.size() == 0) {
            normal = new ArrayList<>();
        }
        return normal;
    }

    public void setNormal(List<Emp> normal) {
        this.normal = normal;
    }
}
