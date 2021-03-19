package com.pzm.zh.controller;

import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.EmpData;
import com.pzm.zh.entity.OrderInfo;
import com.pzm.zh.service.OrderInfoService;
import com.pzm.zh.util.Dto;
import com.pzm.zh.util.ExcelUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Excel 控制层
 */
@RestController
@RequestMapping("/api/excel")
public class ExcelController {
    private static final Logger log = LogManager.getLogger(ExcelController.class);

    @Resource
    private OrderInfoService orderInfoServiceImpl;

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
        List<OrderInfo> orderInfos = ExcelUtils.readExcel("", OrderInfo.class, file);
        long t2 = System.currentTimeMillis();
        log.info("上传文件耗时：" + (t2 - t1));
        // 可以计算出结果的集合
        List<CaseDto> caseDtos = new ArrayList<>();
        // 不可以计算结果的集合
        List<CaseDto> caseDtosList = new ArrayList<>();
        long t3 = System.currentTimeMillis();
        for (OrderInfo orderInfo : orderInfos) {
            Boolean serizes = orderInfoServiceImpl.isSerizes(orderInfo.getJobNum());
            if (serizes) {
                CaseDto caseDto = orderInfoServiceImpl.getCaseDtoList(orderInfo.getJobNum());
                caseDtos.add(caseDto);
            } else {
                CaseDto caseDto = new CaseDto();
                caseDto.setJobNum(orderInfo.getJobNum());
                caseDtosList.add(caseDto);
            }

        }
        long t4 = System.currentTimeMillis();
        log.info("处理上传数据耗时：" + (t4 - t3));
        EmpData empData = new EmpData();
        empData.setOriginal(caseDtos);
        empData.setNotCorrect(caseDtosList);
        Dto<EmpData> dto = new Dto<>();
        dto.setData(empData);
        dto.setSuccess("200");
        return dto;
    }


}
