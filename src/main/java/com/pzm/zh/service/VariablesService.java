package com.pzm.zh.service;

import com.pzm.zh.entity.Variables;

import java.util.List;

public interface VariablesService {
    // 获取所有的数据
    List<Variables> selectForList();

    Integer updateVariables(Variables variables);
}
