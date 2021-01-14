package com.pzm.zh.service;

import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.ResultDto;
import com.pzm.zh.util.Dto;

import java.util.List;

/**
 * @program: zh
 * @description: 修改补充
 * @author: Mr.Tong
 * @create: 2021-01-06 14:49
 **/
public interface FinalService {
    Dto<List<ResultDto>> cases(CaseDto caseDto);
}
