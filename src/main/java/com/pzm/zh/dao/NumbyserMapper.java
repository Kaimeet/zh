package com.pzm.zh.dao;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.pzm.zh.entity.Numbyser;

import java.util.List;

@DS("slave")
public interface NumbyserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Numbyser record);

    int insertSelective(Numbyser record);

    Numbyser selectByPrimaryKey(Integer id);

    Numbyser selectBySerizes(Integer id);

    int updateByPrimaryKeySelective(Numbyser record);

    int updateByPrimaryKey(Numbyser record);

    List<Numbyser> selectList();
}