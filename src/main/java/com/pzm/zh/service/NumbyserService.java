package com.pzm.zh.service;

import com.pzm.zh.entity.Numbyser;

import java.util.List;

public interface NumbyserService {
    // 获取所有的数据
    List<Numbyser> selectForList();

    Integer updateVariables(Numbyser numbyser);
}
