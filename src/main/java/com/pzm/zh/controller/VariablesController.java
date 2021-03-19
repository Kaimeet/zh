package com.pzm.zh.controller;

import com.pzm.zh.entity.EmpData;
import com.pzm.zh.entity.Variables;
import com.pzm.zh.service.VariablesService;
import com.pzm.zh.util.Dto;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping(value = "/variables")
public class VariablesController {

    @Resource
    private VariablesService variablesServiceImpl;

    /**
     * 获取所有的部件固定变量信息
     *
     * @return
     */
    @RequestMapping(value = "/getVariables", method = RequestMethod.GET)
    public Dto<EmpData> getVariables() {
        List<Variables> variablesList = variablesServiceImpl.selectForList();
        EmpData empData = new EmpData();
        empData.setVariables(variablesList);
        Dto<EmpData> dtoDto = new Dto<>();
        dtoDto.setData(empData);
        if (variablesList != null) {
            dtoDto.setSuccess("200");
            dtoDto.setMsg("请求成功！");
        } else {
            dtoDto.setSuccess("402");
            dtoDto.setMsg("未找到相关数据！");
        }
        return dtoDto;
    }

    @RequestMapping(value = "/updateVariables", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Dto<EmpData> updateVariables(@RequestBody Variables variables) {
        variablesServiceImpl.updateVariables(variables);
        EmpData empData = new EmpData();
        Dto<EmpData> dtoDto = new Dto<>();
        dtoDto.setData(empData);
        return dtoDto;
    }
}
