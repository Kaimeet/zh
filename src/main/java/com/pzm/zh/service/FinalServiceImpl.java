package com.pzm.zh.service;

import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.ResultDto;
import com.pzm.zh.util.Dto;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @program: zh
 * @description: 修改补充
 * @author: Mr.Tong
 * @create: 2021-01-06 14:50
 **/
@Service
public class FinalServiceImpl implements FinalService {
    @Resource
    MainService mainService;
    @Resource
    KunHeService kunHeService;

    @Override
    public Dto<List<ResultDto>> cases(CaseDto caseDto) {
        int caseid=caseDto.getSerizesId();
        List<ResultDto>list=new ArrayList<>();
        if(caseid<26){
            System.out.println(JSONArray.fromObject(caseDto));
            System.out.println("如图计算");
            Dto<List<ResultDto>> dto= mainService.mainfinalcase(caseDto);
            for(ResultDto resultDto:dto.getData()){
                list.add(resultDto);
            }
        }else {
            System.out.println("坤和计算");
            Dto<List<ResultDto>> dto=  kunHeService.mainfinalcase(caseDto);
            for(ResultDto resultDto:dto.getData()){
                list.add(resultDto);
            }
        }
        for(ResultDto resultDto:list){
            String length=resultDto.getLength();
            String width=resultDto.getWidth();
        }
return null;
    }
}
