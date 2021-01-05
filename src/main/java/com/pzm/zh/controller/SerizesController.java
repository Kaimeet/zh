package com.pzm.zh.controller;

import com.pzm.zh.dao.SerizesMapper;
import com.pzm.zh.dao.VariablesMapper;
import com.pzm.zh.entity.Serizes;
import com.pzm.zh.entity.Variables;
import com.pzm.zh.util.Dto;
import com.pzm.zh.util.DtoUtil;
import org.apache.poi.hssf.record.common.FtrHeader;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.CheckForNull;
import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
 * @program: zh
 * @description: 款式系列控制器
 * @author: Mr.Tong
 * @create: 2020-11-14 14:55
 **/
@RestController
@RequestMapping("/serizescontroll")
public class SerizesController {
     @Resource
    SerizesMapper serizesMapper;
     @Resource
    VariablesMapper variablesMapper;
     @RequestMapping(value = "/chooseserizes",method = RequestMethod.GET)
    public Dto<String> getserizes(int type){
         String selectHtml ="<option value=\"\">---请选择 ---</option>";
         if(type==1){
             List<Serizes>serizesList=serizesMapper.selectbyname("如图");
             for(Serizes serizes:serizesList){
                 selectHtml +="<option  value=\""+serizes.getId()+"\"><span>"+serizes.getName()+"</span></option>";
             }
         } else  if(type==2){
             List<Serizes>serizesList=serizesMapper.selectbyname("坤和系列");
             for(Serizes serizes:serizesList){
                 selectHtml +="<option  value=\""+serizes.getId()+"\"><span>"+serizes.getName()+"</span></option>";
             }
         }
        return DtoUtil.returnDataSuccess(selectHtml,"001");
     }
     @RequestMapping("/choosevari")
     public Dto<Variables>getvari(int serid){
         Variables variables=variablesMapper.selectbyseid(serid);
         return DtoUtil.returnDataSuccess(variables,"001");
     }
     @RequestMapping(value = "/choosecaries",method = RequestMethod.GET)
    public Dto<String>getcarizes(int seid){
         List<Serizes>caserilist=serizesMapper.selectCase();
         Serizes serizes=serizesMapper.selectByPrimaryKey(seid);
         String selectHtml ="<option value=\"\">---请选择 ---</option>";
         if(caserilist!=null && caserilist.size()>0){
             for (Serizes cases:caserilist) {
                     if(serizes!=null&&cases.getUntitled3().equals(serizes.getUntitled3())&&cases.getUntitled4().equals(serizes.getUntitled4())){
                         selectHtml +="<option  value=\""+cases.getUntitled3()+"\"  selected=\"selected\"><span>"+cases.getCaserize()+"</span></option>";
                     }else{
                         selectHtml +="<option  value=\""+cases.getUntitled3()+"\"><span>"+cases.getCaserize()+"</span></option>";
                     }
             }
         }
         return DtoUtil. returnDataSuccess(selectHtml,"001");
     }
}
