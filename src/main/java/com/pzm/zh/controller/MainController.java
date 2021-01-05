package com.pzm.zh.controller;

import com.pzm.zh.dao.SerizesMapper;
import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.ResultDto;
import com.pzm.zh.entity.Serizes;
import com.pzm.zh.service.KunHeService;
import com.pzm.zh.service.MainService;
import com.pzm.zh.util.Dto;
import com.pzm.zh.util.DtoUtil;
import net.sf.json.JSONArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @program: zh
 * @description: 主要控制器
 * @author: Mr.Tong
 * @create: 2020-10-29 15:15
 **/
@Controller
/**
 * 主页跳转设置
 */
public class MainController {
    @Resource
    KunHeService kunHeService;
    @Resource
    SerizesMapper serizesMapper;
    @Resource
    MainService mainService;
    @RequestMapping(value = "/")
    public String homePage() {
        return "Material/inventorySelect";
        }
        @RequestMapping("/getserizes")
        @ResponseBody
    public Dto<List<Serizes>>getserizes(){
        List<Serizes>serizesList=new ArrayList<>();
        serizesList.add(serizesMapper.selectByPrimaryKey(1));
        return DtoUtil.returnDataSuccess(serizesList,"000000");
        }
        @RequestMapping(value = "/getresult",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
        @ResponseBody
        public Dto<List<ResultDto>>getresult(@RequestBody CaseDto caseDto){
        int caseid=caseDto.getSerizesId();
        if(caseid<26){
            System.out.println(JSONArray.fromObject(caseDto));
            System.out.println("如图计算");
            return mainService.maincase(caseDto);
        }else {
            System.out.println("坤和计算");
            return  kunHeService.maincase(caseDto);
        }

        }
}
