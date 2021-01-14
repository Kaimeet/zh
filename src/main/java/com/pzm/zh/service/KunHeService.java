package com.pzm.zh.service;

import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.ResultDto;
import com.pzm.zh.util.Dto;

import java.util.List;

/**
 * @program: zh
 * @description: 坤和算法
 * @author: Mr.Tong
 * @create: 2020-12-21 16:45
 **/
public interface KunHeService {

    public Dto<List<ResultDto>> maincase(CaseDto caseDto);
    public Dto<List<ResultDto>> mainfinalcase(CaseDto caseDto);

}
