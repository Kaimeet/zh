package com.pzm.zh.service;

import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.Emp;

import java.util.List;

/**
 * @program: zh
 * @description: 坤和算法
 * @author: Mr.Tong
 * @create: 2020-12-21 16:45
 **/
public interface DataHeService {

    List<Emp> maincase(CaseDto caseDto);


    List<Emp> mainfinalcase(CaseDto caseDto);
}
