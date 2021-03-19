package com.pzm.zh.entity;

import java.util.ArrayList;
import java.util.List;

public class EmpData {

    // 无法计算的数据
    private List<CaseDto> notCorrect;

    // 计算前的原始数据
    private List<CaseDto> original;

    // 计算后
    private List<Emp> normal;

    // 正常料
    private List<Emp> result;

    // 余料
    private List<Emp> remove;

    // 部件数据
    private List<Variables> variables;

    // 部件数量
    private List<Numbyser> numbysers;

    public List<Numbyser> getNumbysers() {
        return numbysers;
    }

    public void setNumbysers(List<Numbyser> numbysers) {
        this.numbysers = numbysers;
    }

    public List<Variables> getVariables() {
        return variables;
    }

    public void setVariables(List<Variables> variables) {
        this.variables = variables;
    }

    public List<CaseDto> getNotCorrect() {
        return notCorrect;
    }

    public void setNotCorrect(List<CaseDto> notCorrect) {
        this.notCorrect = notCorrect;
    }

    public List<CaseDto> getOriginal() {
        return original;
    }

    public void setOriginal(List<CaseDto> original) {
        this.original = original;
    }

    public List<Emp> getResult() {
        if (result == null || result.size() == 0) {
            this.result = new ArrayList<>();
        }
        return result;
    }

    public void setResult(List<Emp> result) {
        this.result = result;
    }

    public List<Emp> getRemove() {
        if (remove == null || remove.size() == 0) {
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
