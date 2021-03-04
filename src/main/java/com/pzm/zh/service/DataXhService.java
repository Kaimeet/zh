package com.pzm.zh.service;

import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.Emp;

import java.util.List;

/**
 * 旭辉系列算法
 */
public interface DataXhService {
    List<Emp> maincase(CaseDto caseDto);

    List<Emp> mainfinalcase(CaseDto caseDto);
}
