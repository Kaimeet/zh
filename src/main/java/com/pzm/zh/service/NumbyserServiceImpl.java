package com.pzm.zh.service;

import com.pzm.zh.dao.NumbyserMapper;
import com.pzm.zh.entity.Numbyser;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class NumbyserServiceImpl implements NumbyserService {

    @Resource
    private NumbyserMapper numbyserMapper;

    @Override
    public List<Numbyser> selectForList() {
        return numbyserMapper.selectList();
    }

    @Override
    public Integer updateVariables(Numbyser numbyser) {
        return numbyserMapper.updateByPrimaryKeySelective(numbyser);
    }
}
