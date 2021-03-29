package com.pzm.zh.service;

import com.pzm.zh.dao.VariablesMapper;
import com.pzm.zh.entity.Variables;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class VariablesServiceImpl implements VariablesService {

    @Resource
    private VariablesMapper variablesMapper;

    /**
     * 获取所有的数据
     *
     * @return
     */
    @Override
    public List<Variables> selectForList() {
        return variablesMapper.selectForList();
    }

    /**
     * 更新数据
     *
     * @param variables
     * @return
     */
    @Override
    public Integer updateVariables(Variables variables) {
        return variablesMapper.updateByPrimaryKeySelective(variables);
    }
}
