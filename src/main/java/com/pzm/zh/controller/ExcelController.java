package com.pzm.zh.controller;

import com.alibaba.fastjson.JSON;
import com.grapecity.documents.excel.E;
import com.pzm.zh.entity.Emp;
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
     */
    @PostMapping("/readExcel")
    public Dto<List<Emp>> readExcel(@RequestBody MultipartFile file) {
        long t1 = System.currentTimeMillis();
        log.info("上传的文件：" + file);
        List<Emp> list = ExcelUtils.readExcel("", Emp.class, file);
        // 处理汇总后的List
        List<Emp> resultList = new ArrayList<>();
        // 对解析出来的list进行处理
        Map<String, List<Emp>> collect = list.stream().collect(Collectors.groupingBy(e -> e.getPartName() + "," + e.getHigh() + "," + e.getLength() + "," + e.getWidth()));
        for (String string : collect.keySet()) {
            List<Emp> emps = collect.get(string);
            String partName = emps.get(0).getPartName();
            Double length = emps.get(0).getLength();
            Double width = emps.get(0).getWidth();
            Double hight = emps.get(0).getHigh();
            // 向上取整
            Double numbyZhuang = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyZhuang))); // 数量张(片)
            Double numbyGens = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyGe))); // 数量根
            Double numbyGe = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getNumbyGe))); // 数量个
            // 向下取整
            Double yuliaoLen = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getYuliaoLen))); // 余料长
            Double yuliaoWidth = Math.ceil(emps.stream().collect(Collectors.summingDouble(Emp::getYuliaoWidth))); // 余料宽
            Emp emp = new Emp();
            emp.setPartName(partName);
            emp.setLength(length);
            emp.setWidth(width);
            emp.setHigh(hight);
            emp.setNumbyZhuang(numbyZhuang);
            emp.setNumbyGens(numbyGens);
            emp.setNumbyGe(numbyGe);
            emp.setYuliaoLen(yuliaoLen);
            emp.setYuliaoWidth(yuliaoWidth);
            resultList.add(emp);
        }
        long t2 = System.currentTimeMillis();
        System.out.println(String.format("read over! cost:%sms", (t2 - t1)));
        resultList.forEach(
                b -> System.out.println(JSON.toJSONString(b))
        );
        Dto<List<Emp>> dto = new Dto<>();
        dto.setData(resultList);
        dto.setSuccess("200");
        return dto;
    }



}
