package com.pzm.zh.controller;

import com.pzm.zh.dao.SerizesMapper;
import com.pzm.zh.entity.*;
import com.pzm.zh.service.DataHeService;
import com.pzm.zh.service.DataService;
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
import java.util.Map;
import java.util.stream.Collectors;

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
    private KunHeService kunHeService;
    @Resource
    private SerizesMapper serizesMapper;
    @Resource
    private MainService mainService;

    @Resource
    private DataService dataServiceImpl;

    @Resource
    private DataHeService dataHeServiceImpl;

    @RequestMapping(value = "/")
    public String homePage() {
        return "Material/inventorySelect";
    }

    @RequestMapping(value = "/material/inventorySum")
    public String sum() {
        return "Material/inventorySum";
    }

    @RequestMapping(value = "/excelPlug/excelPage")
    public String excelPage() {
        return "ExcelPlug/excelPage2";
    }

    @RequestMapping("/getserizes")
    @ResponseBody
    public Dto<List<Serizes>> getserizes() {
        List<Serizes> serizesList = new ArrayList<>();
        serizesList.add(serizesMapper.selectByPrimaryKey(1));
        return DtoUtil.returnDataSuccess(serizesList, "000000");
    }

    @RequestMapping(value = "/getresult", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Dto<List<ResultDto>> getresult(@RequestBody CaseDto caseDto) {
        int caseid = caseDto.getSerizesId();
        if (caseid < 26) {
            System.out.println(JSONArray.fromObject(caseDto));
            System.out.println("如图计算");
            return mainService.mainfinalcase(caseDto);
        } else {
            System.out.println("坤和计算");
            return kunHeService.mainfinalcase(caseDto);
        }

    }

    @RequestMapping(value = "/getAllResult", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public Dto<EmpData> getAllResult(@RequestBody List<CaseDto> caseDtos) {
        List<Emp> list = new ArrayList<>();
        for (CaseDto caseDto : caseDtos) {
            int caseid = caseDto.getSerizesId();
            if (caseid < 26) {
                System.out.println(JSONArray.fromObject(caseDto));
                System.out.println("如图计算");
                list.addAll(dataServiceImpl.mainfinalcase(caseDto));
            } else {
                System.out.println("坤和计算");
                list.addAll(dataHeServiceImpl.mainfinalcase(caseDto));
            }
        }
        // 处理后正常料汇总
        List<Emp> resultList = new ArrayList<>();
        // 处理后余料汇总
        List<Emp> removeList = new ArrayList<>();
        // 对正常料进行分组
        Map<String, List<Emp>> resultCollect = list.stream().collect(Collectors.groupingBy(e -> e.getPartName() + "," + e.getHigh() + "," + e.getLength() + "," + e.getWidth() + "," + e.getCaoweight()));
        for (String string : resultCollect.keySet()) {
            List<Emp> emps = resultCollect.get(string);
            String partName = emps.get(0).getPartName();
            Double length = emps.get(0).getLength();
            Double width = emps.get(0).getWidth();
            Double hight = emps.get(0).getHigh();
            Double caoweight = emps.get(0).getCaoweight();
            // 向上取整
            Double numbyZhuang = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyZhuang))); // 数量张(片)
            Double numbyGens = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyGens))); // 数量根
            Double numbyGe = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyGe))); // 数量个
            Emp emp = new Emp();
            emp.setPartName(partName);
            emp.setLength(length);
            emp.setWidth(width);
            emp.setHigh(hight);
            emp.setCaoweight(caoweight);
            emp.setNumbyZhuang(numbyZhuang);
            emp.setNumbyGens(numbyGens);
            emp.setNumbyGe(numbyGe);
            resultList.add(emp);
        }
        // 对余料进行分组
        Map<String, List<Emp>> removeCollect = list.stream().collect(Collectors.groupingBy(e -> e.getPartName() + "," + e.getHigh() + "," + e.getYuliaoLen() + "," + e.getYuliaoWidth()));
        for (String string : removeCollect.keySet()) {
            List<Emp> emps = removeCollect.get(string);
            String partName = emps.get(0).getPartName();
            Double hight = emps.get(0).getHigh();
            Double yuliaolen = emps.get(0).getYuliaoLen();
            Double yuliaowidth = emps.get(0).getYuliaoWidth();
            // 向下取整
            Double numbyZhuang = Math.floor(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyZhuang))); // 数量张(片)
            if (yuliaolen == 0) {
                continue;
            }
            if (yuliaowidth == 0) {
                continue;
            }
            if (numbyZhuang == 0) {
                continue;
            }
            Emp emp = new Emp();
            emp.setPartName(partName);
            emp.setHigh(hight);
            emp.setNumbyZhuang(numbyZhuang);
            emp.setYuliaoWidth(yuliaowidth);
            emp.setYuliaoLen(yuliaolen);
            removeList.add(emp);
        }
        EmpData empData = new EmpData();
        empData.setNormal(list);
        empData.setResult(resultList);
        empData.setRemove(removeList);
        Dto<EmpData> dtoDto = new Dto<>();
        dtoDto.setData(empData);
        return dtoDto;
    }
}
