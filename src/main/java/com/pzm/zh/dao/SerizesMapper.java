package com.pzm.zh.dao;


import com.baomidou.dynamic.datasource.annotation.DS;
import com.pzm.zh.entity.Serizes;

import java.util.List;

@DS("slave")

public interface SerizesMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Serizes record);

    int insertSelective(Serizes record);

    Serizes selectByPrimaryKey(Integer id);

    List<Serizes> selectall();

    int updateByPrimaryKeySelective(Serizes record);

    int updateByPrimaryKey(Serizes record);

    List<Serizes> selectbyname(String name);

    Serizes selectByName(String name);

    List<Serizes> selectCase();
}