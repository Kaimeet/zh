package com.pzm.zh.dao;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.pzm.zh.entity.HighDto;
import com.pzm.zh.entity.Variables;
@DS("slave")
public interface VariablesMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Variables record);

    int insertSelective(Variables record);

    Variables selectByPrimaryKey(Integer id);

    Variables selectbyseid(int serizesid);

    int updateByPrimaryKeySelective(Variables record);

    int updateByPrimaryKey(Variables record);

    HighDto selecthigh(String names);
}