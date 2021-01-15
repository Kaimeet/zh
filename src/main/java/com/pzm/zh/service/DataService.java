package com.pzm.zh.service;

import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.Emp;
import com.pzm.zh.entity.ResultDto;
import com.pzm.zh.util.Dto;

import java.util.List;

/**
 * @program: zh
 * @description: 主计算逻辑service
 * @author: Mr.Tong
 * @create: 2020-11-16 10:11
 **/
public interface DataService {

    List<Emp> maincase(CaseDto caseDto);

    List<Emp> mainfinalcase(CaseDto caseDto);
}
