package com.pzm.zh.controller;

import com.alibaba.fastjson.JSON;
import com.pzm.zh.entity.Emp;
import com.pzm.zh.entity.EmpData;
import com.pzm.zh.util.Dto;
import com.pzm.zh.util.ExcelUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Excel 控制层
 */
@RestController
@RequestMapping("/api/excel")
public class ExcelController {
    private static final Logger log = LogManager.getLogger(ExcelController.class);

    /**
     * Excel导入
     *
     * @param file
     * @return
     */
    @PostMapping("/readExcel")
    public Dto<EmpData> readExcel(@RequestBody MultipartFile file) {
        long t1 = System.currentTimeMillis();
        log.info("上传的文件：" + file);
        List<Emp> list = ExcelUtils.readExcel("", Emp.class, file);
        // 处理后正常料汇总
        List<Emp> resultList = new ArrayList<>();
        // 处理后余料汇总
        List<Emp> removeList = new ArrayList<>();
        // 对正常料进行分组
        Map<String, List<Emp>> resultCollect = list.stream().collect(Collectors.groupingBy(e -> e.getPartName() + "," + e.getHigh() + "," + e.getLength() + "," + e.getWidth()));
        for (String string : resultCollect.keySet()) {
            List<Emp> emps = resultCollect.get(string);
            String partName = emps.get(0).getPartName();
            Double length = emps.get(0).getLength();
            Double width = emps.get(0).getWidth();
            Double hight = emps.get(0).getHigh();
            // 向上取整
            Double numbyZhuang = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyZhuang))); // 数量张(片)
            Double numbyGens = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyGens))); // 数量根
            Double numbyGe = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyGe))); // 数量个
            Emp emp = new Emp();
            emp.setPartName(partName);
            emp.setLength(length);
            emp.setWidth(width);
            emp.setHigh(hight);
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
            // 向上取整
            Double numbyZhuang = Math.floor(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyZhuang))); // 数量张(片)
            Emp emp = new Emp();
            emp.setPartName(partName);
            emp.setHigh(hight);
            emp.setNumbyZhuang(numbyZhuang);
            emp.setYuliaoWidth(yuliaowidth);
            emp.setYuliaoLen(yuliaolen);
            removeList.add(emp);
        }
        long t2 = System.currentTimeMillis();
        System.out.println(String.format("read over! cost:%sms", (t2 - t1)));
        resultList.forEach(
                b -> System.out.println(JSON.toJSONString(b))
        );
        removeList.forEach(
                b -> System.out.println(JSON.toJSONString(b))
        );
        EmpData empData = new EmpData();
        empData.setResult(resultList);
        empData.setRemove(removeList);
        Dto<EmpData> dto = new Dto<>();
        dto.setData(empData);
        dto.setSuccess("200");
        return dto;
    }


}
