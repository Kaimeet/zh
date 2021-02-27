package com.pzm.zh.service;

import com.grapecity.documents.excel.E;
import com.pzm.zh.dao.NumbyserMapper;
import com.pzm.zh.dao.VariablesMapper;
import com.pzm.zh.entity.*;
import com.pzm.zh.util.Dto;
import com.pzm.zh.util.DtoUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @program: zh
 * @description: 坤和算法实现类
 * @author: Mr.Tong
 * @create: 2020-12-21 16:46
 **/
@Service
public class DataHeServiceImpl implements DataHeService {
    @Resource
    private NumbyserMapper numbyserMapper;

    @Resource
    private VariablesMapper variablesMapper;


    @Override
    public List<Emp> mainfinalcase(CaseDto caseDto) {
        // 槽宽
        BigDecimal caoweight = caseDto.getCaoweight();
        // 板材厚度 = 芯板高度
        BigDecimal plaThick = caseDto.getPlaThick();
        // 工单号
        String jobNum = caseDto.getJobNum();
        // 销售订单
        String salesOrderNum = caseDto.getSalesOrderNum();
        // 颜色
        String colorInfo = caseDto.getColorInfo();
        List<Emp> maincase = maincase(caseDto);
        int serid = caseDto.getSerizesId();
        for (Emp emp : maincase) {
            emp.setCaoweight(caoweight);
            emp.setJobNum(jobNum);
            emp.setSalesOrderNum(salesOrderNum);
            emp.setColorInfo(colorInfo);
            if ("边框".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("边框").getHigh()));
            } else if ("上帽".equals(emp.getPartName())) {
                if (serid == 130 || serid == 132 || serid == 135 || serid == 136 || serid == 137 || serid == 138 || serid == 139 || serid == 140 || serid == 141 || serid == 143) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("插玻上帽").getHigh()));
                } else if (serid == 142) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("069上帽").getHigh()));
                } else {
                    emp.setHigh(new Double(variablesMapper.selecthigh("上帽").getHigh()));

                }
            } else if ("下帽".equals(emp.getPartName())) {
                if (serid == 142) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("069下帽").getHigh()));
                } else {
                    emp.setHigh(new Double(variablesMapper.selecthigh("下帽").getHigh()));
                }
            } else if ("中档".equals(emp.getPartName())) {
                if (serid == 142) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("069中档").getHigh()));
                } else if (serid == 140) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("插玻中档").getHigh()));
                } else {
                    emp.setHigh(new Double(variablesMapper.selecthigh("中档").getHigh()));
                }
            } else if ("上中挺".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("上中挺").getHigh()));
            } else if ("中中挺".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("中中挺").getHigh()));
            } else if ("下中挺".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("下中挺").getHigh()));
            } else if ("小中档".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("小中挡").getHigh()));
            } else if ("小中挺".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("小中挺").getHigh()));
            } else if ("上芯板".equals(emp.getPartName())) {
                emp.setHigh(plaThick.doubleValue());
            } else if ("中芯板".equals(emp.getPartName())) {
                emp.setHigh(plaThick.doubleValue());
            } else if ("下芯板".equals(emp.getPartName())) {
                emp.setHigh(plaThick.doubleValue());
            }
            if (emp.getYuliaoWidth() == null) {
                emp.setYuliaoWidth(new Double(0));
            }
            if (emp.getYuliaoLen() == null) {
                emp.setYuliaoLen(new Double(0));
            }
            if (emp.getHigh() == null || emp.getHigh() == 0) {
                emp.setHigh(new Double(-1));
            }
            if (emp.getWidth() == null || emp.getWidth() == 0) {
                emp.setWidth(new Double(-1));
            }
            if (emp.getLength() == null || emp.getLength() == 0) {
                emp.setLength(new Double(-1));
            }
            if (emp.getNumbyZhuang() == null) {
                emp.setNumbyZhuang(new Double(0));
            }
            if (emp.getNumbyGe() == null) {
                emp.setNumbyGe(new Double(0));
            }
            if (emp.getNumbyGens() == null) {
                emp.setNumbyGens(new Double(0));
            }
        }
        return maincase;
    }

    @Override
    public List<Emp> maincase(CaseDto caseDto) {
        //1.提取出该部件的每种部件数量
        Numbyser numbyser = numbyserMapper.selectByPrimaryKey(caseDto.getSerizesId());
        System.out.println("numbyser值为" + numbyser);
        //2.计算普通部件值
        List<Emp> emps = casenormal(caseDto, numbyser);
        CaseDoubles caseDoubles = change(caseDto);
        if ("1".equals(caseDto.getCaseires())) {
            return case1(caseDto, numbyser, emps);
        } else if ("2".equals(caseDto.getCaseires())) {
            return case2(caseDto, numbyser, emps);
        } else if ("3".equals(caseDto.getCaseires())) {
            return case3(caseDto, numbyser, emps, caseDoubles);
        } else if ("4".equals(caseDto.getCaseires())) {
            return case4(numbyser, emps, caseDoubles);
        } else if ("5".equals(caseDto.getCaseires())) {
            return case5(numbyser, emps, caseDoubles);
        } else if ("6".equals(caseDto.getCaseires())) {
            return case6(numbyser, emps, caseDoubles);
        } else if ("7".equals(caseDto.getCaseires())) {
            return case7(numbyser, emps, caseDoubles);
        } else if ("8".equals(caseDto.getCaseires())) {
            return case8(numbyser, emps, caseDoubles);
        } else if ("9".equals(caseDto.getCaseires())) {
            return case9(numbyser, emps, caseDoubles);
        } else if ("10".equals(caseDto.getCaseires())) {
            return case10(numbyser, emps, caseDoubles);
        } else if ("11".equals(caseDto.getCaseires())) {
            return case11(numbyser, emps, caseDoubles);
        }
        return null;
    }

    public CaseDoubles change(CaseDto caseDto) {
        CaseDoubles caseDoubles = new CaseDoubles();
        if (caseDto.getDoorhigh() != null) {
            caseDoubles.setDoorhigh(caseDto.getDoorhigh().doubleValue());
        }
        if (caseDto.getDoorweight() != null) {
            caseDoubles.setDoorweight(caseDto.getDoorweight().doubleValue());
        }
        if (caseDto.getDoornums() != null) {
            caseDoubles.setDoornums(caseDto.getDoornums().doubleValue());
        }
        if (caseDto.getZtweight() != null) {
            caseDoubles.setZtweight(caseDto.getZtweight().doubleValue());
        }
        if (caseDto.getPlaThick() != null) {
            caseDoubles.setPlaThick(caseDto.getPlaThick().doubleValue());
        }
        if (caseDto.getSztweight() != null) {
            caseDoubles.setSztweight(caseDto.getSztweight().doubleValue());
        }
        if (caseDto.getBkweight() != null) {
            caseDoubles.setBkweight(caseDto.getBkweight().doubleValue());
        }
        if (caseDto.getSxHigh() != null) {
            caseDoubles.setSxHigh(caseDto.getSxHigh().doubleValue());
        }
        if (caseDto.getZxHigh() != null) {
            caseDoubles.setZxHigh(caseDto.getZxHigh().doubleValue());
        }
        if (caseDto.getXxHigh() != null) {
            caseDoubles.setXxHigh(caseDto.getXxHigh().doubleValue());
        }
        if (caseDto.getZdWeight() != null) {
            caseDoubles.setZdWeight(caseDto.getZdWeight().doubleValue());
        }
        if (caseDto.getXbDepth() != null) {
            caseDoubles.setXbDepth(caseDto.getXbDepth().doubleValue());
        }
        if (caseDto.getZxWeight() != null) {
            caseDoubles.setZxWeight(caseDto.getZxWeight().doubleValue());
        }
        if (caseDto.getSmWeight() != null) {
            caseDoubles.setSmWeight(caseDto.getSmWeight().doubleValue());
        }
        if (caseDto.getXmWeight() != null) {
            caseDoubles.setXmWeight(caseDto.getXmWeight().doubleValue());
        }
        if (caseDto.getGlassDepth() != null) {
            caseDoubles.setGlassDepth(caseDto.getGlassDepth().doubleValue());
        }
        if (caseDto.getZztWeight() != null) {
            caseDoubles.setZztWeight(caseDto.getZztWeight().doubleValue());
        }
        if (caseDto.getXztWeight() != null) {
            caseDoubles.setXztWeight(caseDto.getXztWeight().doubleValue());
        }
        if (!StringUtils.isEmpty(caseDto.getMemo1())) {
            caseDoubles.setSzthigh(Double.valueOf(caseDto.getMemo1()));
        }
        if (!StringUtils.isEmpty(caseDto.getMemo2())) {
            caseDoubles.setZzthigh(Double.valueOf(caseDto.getMemo2()));
        }
        if (!StringUtils.isEmpty(caseDto.getMemo3())) {
            caseDoubles.setXzthigh(Double.valueOf(caseDto.getMemo3()));
        }
        if (!StringUtils.isEmpty(caseDto.getMemo4())) {
            caseDoubles.setXzdWeight(Double.valueOf(caseDto.getMemo4()));
        }
        if (!StringUtils.isEmpty(caseDto.getMemo5())) {
            caseDoubles.setSmztWeight(Double.valueOf(caseDto.getMemo5()));
        }
        return caseDoubles;
    }

    private Double caseYuliaoLenth(double c) {
        Double yuliaolenth = new Double(0);
        //13.计算上帽余料长
        double length = (2440 / (c + 4 + 5) - ((int) (2440 / (c + 4 + 5)))) * (c + 4 + 5);
        yuliaolenth = length;
        return yuliaolenth;
    }

    private Double caseYuliaoKuan(double a) {
        Double yuliaowidth = new Double(0);
        double c = ((1220 / (a + 5)) - (int) (1220 / (a + 5))) * (a + 5);
        yuliaowidth = c;
        return yuliaowidth;
    }

    /**
     * 1.计算边框
     * 2.计算上帽
     * 3.计算下帽
     * 4.计算中档
     *
     * @param caseDto
     * @param numbyser
     * @return
     */
    public List<Emp> casenormal(CaseDto caseDto, Numbyser numbyser) {
        /**
         * 将caseDto Decimal变量转换为double 或 int 型单独表示。
         */
        Double doorhigh = new Double(0);
        if (caseDto.getDoorhigh() != null) {
            doorhigh = caseDto.getDoorhigh().doubleValue();
        }
        Double doorweight = new Double(0);
        if (caseDto.getDoorweight() != null) {
            doorweight = caseDto.getDoorweight().doubleValue();
        }
        double doornums = new Double(0);
        if (caseDto.getDoornums() != null) {
            doornums = caseDto.getDoornums();
        }
        double ztweight = new Double(0);
        if (caseDto.getZztWeight() != null) {
            ztweight = caseDto.getZztWeight().doubleValue();
        }
        double plathick = new Double(0);
        if (caseDto.getPlaThick() != null) {
            plathick = caseDto.getPlaThick().doubleValue();
        }
        double bkweight = new Double(0);
        if (caseDto.getBkweight() != null) {
            bkweight = caseDto.getBkweight().doubleValue();
        }
        double sxHigh = new Double(0);
        if (caseDto.getSxHigh() != null) {
            sxHigh = caseDto.getSxHigh().doubleValue();
        }
        double zxHigh = new Double(0);
        if (caseDto.getZxHigh() != null) {
            zxHigh = caseDto.getZxHigh().doubleValue();
        }
        double xxHigh = new Double(0);
        if (caseDto.getXxHigh() != null) {
            xxHigh = caseDto.getXxHigh().doubleValue();
        }
        double zdWeight = new Double(0);
        if (caseDto.getZdWeight() != null) {
            zdWeight = caseDto.getZdWeight().doubleValue();
        }
        double xbDepth = new Double(0);
        if (caseDto.getXbDepth() != null) {
            xbDepth = caseDto.getXbDepth().doubleValue();
        }
        double zxWeight = new Double(0);
        if (caseDto.getZxWeight() != null) {
            zxWeight = caseDto.getZxWeight().doubleValue();
        }
        double smWeight = new Double(0);
        if (caseDto.getSmWeight() != null) {
            smWeight = caseDto.getSmWeight().doubleValue();
        }
        double xmWeight = new Double(0);
        if (caseDto.getXmWeight() != null) {
            xmWeight = caseDto.getXmWeight().doubleValue();
        }
        double glassDepth = new Double(0);
        if (caseDto.getGlassDepth() != null) {
            glassDepth = caseDto.getGlassDepth().doubleValue();
        }
        double xzthigh = new Double(0);
        if (!StringUtils.isEmpty(caseDto.getMemo1())) {
            xzthigh = Double.valueOf(caseDto.getMemo1());
        }
        List<Emp> emps = new ArrayList<>();
        Emp emp = new Emp();
        emp.setPartName("边框");
        //1.计算边框长
        Double biankuanglength = new Double(0);
        if (doorhigh < 2080) {
            biankuanglength = new Double(2100);
        } else if (doorhigh <= new Double(2230)) {
            biankuanglength = new Double(2250);
        } else {
            biankuanglength = new Double(2440);
        }

        emp.setLength(biankuanglength);
        //2.计算边框宽
        emp.setWidth(bkweight);
        //3.计算边框高
        Double bkhigh = new Double(40);
        emp.setHigh(bkhigh);
        //4.计算边框数量（根）
        Double bknumsGen = new Double(0);
        bknumsGen = doornums * 2;
        emp.setNumbyGens(bknumsGen);
        //5.计算边框数量（个）
        Double binumsGe = bknumsGen;
        emp.setNumbyGe(binumsGe);
        //6.计算边框数量（张）
        Double bknumsZhuang = new Double(0);
        bknumsZhuang = (2 * doornums / ((int) (1220 / (bkweight + 5))));
        emp.setNumbyZhuang(bknumsZhuang);
        emp.setYuliaoLen(new Double(0));
        emp.setYuliaoWidth(new Double(0));
        emps.add(emp);
        //7.计算上帽长
        Emp emp1 = new Emp();
        emp1.setPartName("上帽");
        Double smlength = (doorweight - 2 * bkweight + 2 * zxWeight);
        emp1.setLength(smlength);
        //8.计算上帽宽（含造型）
        emp1.setWidth(smWeight);
        //9.计算上帽数量（个）
        Double smnumsGe = doornums;
        emp1.setNumbyGe(smnumsGe);
        //10.计算上帽数量（根）
        Double smnumsGen = (doornums / ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5))));
        emp1.setNumbyGens(smnumsGen);
        //11.计算上帽数量（张）
        Double smnumsZhuang = (Double.valueOf(smnumsGen) / (int) (1220 / (smWeight + 5)));
        emp1.setNumbyZhuang(smnumsZhuang);
        //12.计算上帽余料宽
        Double smyuliaokuan = ((1220 / (smWeight + 5)) - (int) (1220 / (smWeight + 5))) * (smWeight + 5);
        emp1.setYuliaoWidth(smyuliaokuan);
        //13.计算上帽余料长
        Double smyuliaochang = (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) - ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)))) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5);
        emp1.setYuliaoLen(smyuliaochang);
        emps.add(emp1);
        Emp emp2 = new Emp();
        emp2.setPartName("下帽");
        //14.计算下帽长
        emp2.setLength(smlength);
        //15.计算下帽宽
        emp2.setWidth(xmWeight);
        //16.计算下帽数量（个）
        emp2.setNumbyGe(doornums);
        //17.计算下帽数量(根)
        Double xmnumsGen = doornums / ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)));
        emp2.setNumbyGens(xmnumsGen);
        //18.计算下帽数量（张）
        Double xmnumsZhuang = xmnumsGen / (int) (1220 / (xmWeight + 5));
        emp2.setNumbyZhuang(xmnumsZhuang);
        //19.计算下帽余料长
        Double xmyuliaochang = (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) - ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)))) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5);
        emp2.setYuliaoLen(xmyuliaochang);
        //20.计算下帽余料宽
        Double xmyuliaokuan = ((1220 / (xmWeight + 5)) - (int) (1220 / (xmWeight + 5))) * (xmWeight + 5);
        emp2.setYuliaoWidth(xmyuliaokuan);
        emps.add(emp2);
        Emp emp3 = new Emp();
        emp3.setPartName("中档");
        if (!StringUtils.isEmpty(numbyser.getZzdnums())) {
            //21.计算中档长
            emp3.setLength(smlength);
            //22.计算中档宽
            emp3.setWidth(zdWeight);
            //23.计算中档数量（个），（根）,(张)
            Double zdnumsGe = new Double(0);
            Double zdnumsGen = new Double(0);
            Double zdnumsZhuang = new Double(0);
            String zzdnums = numbyser.getZzdnums();
            if (!StringUtils.isEmpty(zzdnums)) {
                zdnumsGe = (doornums * Double.valueOf(zzdnums));
                double n = (doornums / ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5))) * Double.valueOf(zzdnums));
                zdnumsGen = n;
                zdnumsZhuang = (n / (int) (1220 / (zdWeight + 5)));
            }
            emp3.setNumbyZhuang(zdnumsZhuang);
            emp3.setNumbyGens(zdnumsGen);
            emp3.setNumbyGe(zdnumsGe);
            //24.计算中档余料长
            Double zdyuliaolen = new Double(0);
            double t = (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) - ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)))) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5);
            zdyuliaolen = t;
            emp3.setYuliaoLen(zdyuliaolen);
            //25.计算中档余料宽
            Double zdyuliaokuan = new Double(0);
            double v = ((1220 / (zdWeight + 5)) - (int) (1220 / (zdWeight + 5))) * (zdWeight + 5);
            zdyuliaokuan = v;
            emp3.setYuliaoWidth(zdyuliaokuan);
            emps.add(emp3);
        }
        return emps;
    }

    /**
     * 一类
     * 无中档无中挺，只含有芯板/玻璃
     */
    public List<Emp> case1(CaseDto caseDto, Numbyser numbyser, List<Emp> empList) {

        Double zxbnums = 0.0;
        //增加中心板判断
        boolean flagzxb = false;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        List<Emp> emps = new ArrayList<>();
        for (Emp emp : empList) {
            if (!"中档".equals(emp.getPartName())) {
                emps.add(emp);
            }
        }
        //1.中芯板长
        Double zxblength = new Double(0);
        if (caseDto.getDoorhigh() != null && caseDto.getSmWeight() != null && caseDto.getXmWeight() != null && caseDto.getXbDepth() != null) {
            Double doorhigh = caseDto.getDoorhigh().doubleValue();
            Double smweight = caseDto.getSmWeight().doubleValue();
            Double xmweight = caseDto.getXmWeight().doubleValue();
            Double xbDepth = caseDto.getXbDepth().doubleValue();
            zxblength = (doorhigh - smweight - xmweight + 2 * xbDepth);
        }
        //计算中芯板宽
        Double zxbwidth = new Double(0);
        if (caseDto.getXbDepth() != null && caseDto.getDoorweight() != null && caseDto.getBkweight() != null) {
            double doorWeight = caseDto.getDoorweight().doubleValue();
            double bkWeight = caseDto.getBkweight().doubleValue();
            double xbDepth = caseDto.getXbDepth().doubleValue();
            zxbwidth = (doorWeight - 2 * bkWeight + 2 * xbDepth);
        }
        Double zxbnumspian = new Double(0);
        int N = 0;
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(15)) == 0) {
            N = 1;
        } else {
            N = 2;
        }
        if (caseDto.getDoornums() != null) {
            zxbnumspian = (caseDto.getDoornums().doubleValue() * N * zxbnums);
        }
        Emp emp = new Emp();
        emp.setPartName("中芯板");
        emp.setLength(zxblength);
        emp.setWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            emps.add(emp);
        }
        return emps;
    }

    /**
     * 二类
     * 1中档无中挺，只含有中下芯板/玻璃
     */
    public List<Emp> case2(CaseDto caseDto, Numbyser numbyser, List<Emp> empList) {

        Double zxbnums = 0.0;
        Double xxbnums = 0.0;
        //增加中心板判断
        boolean flagzxb = false;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        boolean flagxxb = false;
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            xxbnums = Double.valueOf(numbyser.getXxbnums());
            flagxxb = true;
        }
//        List<ResultDto>resultDtoList=new ArrayList<>();
//        for(ResultDto resultDto:resultDtoList1){
//            if(!"中档".equals(resultDto.getPartName())){
//                resultDtoList.add(resultDto);
//            }
//        }
        //1.中、下芯板长
        Double zxblength = new Double(0);
        Double xxblength = new Double(0);
        if (caseDto.getDoorhigh() != null && caseDto.getSmWeight() != null && caseDto.getXmWeight() != null && caseDto.getXbDepth() != null) {
            Double doorhigh = caseDto.getDoorhigh().doubleValue();
            Double smweight = caseDto.getSmWeight().doubleValue();
            Double xmweight = caseDto.getXmWeight().doubleValue();
            Double xbDepth = caseDto.getXbDepth().doubleValue();
            Double xxhigh = caseDto.getXxHigh().doubleValue();
            Double zdweight = caseDto.getZdWeight().doubleValue();
            zxblength = (doorhigh - smweight - xmweight + 4 * xbDepth - zdweight - xxhigh);
            xxblength = (460 + 2 * xbDepth);
        }
        //计算中、下芯板宽
        Double zxbwidth = new Double(0);
        Double xxbwidth = new Double(0);
        if (caseDto.getXbDepth() != null && caseDto.getDoorweight() != null && caseDto.getBkweight() != null) {
            double doorWeight = caseDto.getDoorweight().doubleValue();
            double bkWeight = caseDto.getBkweight().doubleValue();
            double xbDepth = caseDto.getXbDepth().doubleValue();
            zxbwidth = (doorWeight - 2 * bkWeight + 2 * xbDepth);
            xxbwidth = zxbwidth;
        }
        Double zxbnumspian = new Double(0);
        Double xxbnumspian = new Double(0);
        int N = 0;
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(15)) == 0) {
            N = 1;
        } else {
            N = 2;
        }
        if (caseDto.getDoornums() != null) {
            zxbnumspian = (caseDto.getDoornums().doubleValue() * N * zxbnums);
            xxbnumspian = (caseDto.getDoornums().doubleValue() * N * xxbnums);

        }
        Emp emp = new Emp();
        emp.setPartName("中芯板");
        emp.setLength(zxblength);
        emp.setWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setPartName("下芯板");
        emp1.setLength(xxblength);
        emp1.setWidth(xxbwidth);
        emp1.setNumbyZhuang(xxbnumspian);
        if (flagxxb) {
            empList.add(emp1);
        }
        return empList;
    }


    /**
     * 三类
     * 2中档无中挺，含有上、中、下芯板
     */
    public List<Emp> case3(CaseDto caseDto, Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {

        Double zxbnums = 0.0;
        Double xxbnums = 0.0;
        Double sxbnums = 0.0;
        boolean flagsxb = false;
        if (!StringUtils.isEmpty(numbyser.getSxbnums())) {
            sxbnums = Double.valueOf(numbyser.getSxbnums());
            flagsxb = true;
        }
        //增加中心板判断
        boolean flagzxb = false;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        boolean flagxxb = false;
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            xxbnums = Double.valueOf(numbyser.getXxbnums());
            flagxxb = true;
        }
//        List<ResultDto>resultDtoList=new ArrayList<>();
//        for(ResultDto resultDto:resultDtoList1){
//            if(!"中档".equals(resultDto.getPartName())){
//                resultDtoList.add(resultDto);
//            }
//        }
        //1.上、中、下芯板长
        Double sxblength = new Double(0);
        sxblength = (caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - 2 * caseDoubles.getZdWeight() - caseDoubles.getZxHigh() - caseDoubles.getXxHigh() + 6 * caseDoubles.getXbDepth());
//        if(caseDto.getDoorhigh()!=null&&){
//            doorHigh-smweight-xmweight-2*zdweight- zxHigh - xxHigh +6*xbDepth
//        }
        Double zxblength = new Double(0);
        if (caseDto.getZxHigh() != null) {
            zxblength = caseDto.getZxHigh().doubleValue();
        }
        Double xxblength = new Double(0);
        if (caseDto.getXxHigh() != null) {
            xxblength = caseDto.getXxHigh().doubleValue();
        }
        //计算上，中、下芯板宽
        Double zxbwidth = new Double(0);
        Double xxbwidth = new Double(0);
        Double sxbwidth = new Double(0);
        if (caseDto.getXbDepth() != null && caseDto.getDoorweight() != null && caseDto.getBkweight() != null) {
            double doorWeight = caseDto.getDoorweight().doubleValue();
            double bkWeight = caseDto.getBkweight().doubleValue();
            double xbDepth = caseDto.getXbDepth().doubleValue();
            zxbwidth = (doorWeight - 2 * bkWeight + 2 * xbDepth);
            xxbwidth = zxbwidth;
            sxbwidth = zxbwidth;
        }
        Double zxbnumspian = new Double(0);
        Double xxbnumspian = new Double(0);
        Double sxbnumspian = new Double(0);
        int N = 0;
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(15)) == 0) {
            N = 1;
        } else {
            N = 2;
        }
        if (caseDto.getDoornums() != null) {
            zxbnumspian = (caseDto.getDoornums().doubleValue() * N * zxbnums);
            xxbnumspian = (caseDto.getDoornums().doubleValue() * N * xxbnums);
            sxbnumspian = (caseDto.getDoornums().doubleValue() * N * sxbnums);
        }
        Emp emp = new Emp();
        emp.setPartName("中芯板");
        emp.setLength(zxblength);
        emp.setWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setPartName("下芯板");
        emp1.setLength(xxblength);
        emp1.setWidth(xxbwidth);
        emp1.setNumbyZhuang(xxbnumspian);
        if (flagxxb) {
            empList.add(emp1);
        }
        Emp emp2 = new Emp();
        emp2.setPartName("上芯板");
        emp2.setLength(sxblength);
        emp2.setWidth(sxbwidth);
        emp2.setNumbyZhuang(sxbnumspian);
        if (flagsxb) {
            empList.add(emp2);
        }
        return empList;
    }

    /**
     * 四类 3中档无中挺，4*中芯板均分
     */

    public List<Emp> case4(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        boolean flagzxb = false;
        double zxbnums = 0.0;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        //中芯板长
        Double zxblength = new Double(0);
        zxblength = (caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - 3 * caseDoubles.getZdWeight()) / 4 + 2 * caseDoubles.getXbDepth();

        //中芯板宽
        Double zxbwidth = new Double(0);
        zxbwidth = caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() + 2 * caseDoubles.getXbDepth();

        //中芯板数量
        Double zxbnumspian = new Double(0);
        int N = 0;
        if (caseDoubles.getPlaThick() == 15) {
            N = 1;
        } else {
            N = 2;
        }
        zxbnumspian = (caseDoubles.getDoornums() * N * zxbnums);
        Emp emp = new Emp();
        emp.setPartName("中芯板");
        emp.setLength(zxblength);
        emp.setWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        return empList;
    }

    /**
     * 五类 无中档1中挺，含中芯板
     */

    public List<Emp> case5(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        boolean flagzxb = false;
        double zxbnums = 0.0;
        double zztnums = 0.0;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        boolean flagzzt = false;
        if (!StringUtils.isEmpty(numbyser.getZztnums())) {
            zztnums = Double.valueOf(numbyser.getZztnums());
            flagzzt = true;
        }
        //中芯板长
        Double zxblength = new Double(0);
        zxblength = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() + 2 * caseDoubles.getXbDepth();

        //中芯板宽
        Double zxbwidth = new Double(0);
        zxbwidth = (caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() - caseDoubles.getZztWeight()) / 2 + 2 * caseDoubles.getXbDepth();

        //中芯板数量
        Double zxbnumspian = new Double(0);
        int N = 0;
        if (caseDoubles.getPlaThick() == 15) {
            N = 1;
        } else {
            N = 2;
        }
        zxbnumspian = (caseDoubles.getDoornums() * N * zxbnums);
        Emp emp = new Emp();
        emp.setPartName("中芯板");
        emp.setLength(zxblength);
        emp.setWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        //中中挺长
        Double zztlenth = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() + 2 * caseDoubles.getZxWeight();
        //中中挺宽
        Double zztwidth = caseDoubles.getZztWeight();
        //中中挺数量（个）
        Double zztnumsge = caseDoubles.getDoornums() * zztnums;
        //中中挺数量（根）
        Double zztnumsGen = Double.valueOf(zztnumsge) / (int) (2440 / (Double.valueOf(zztlenth) + 4 + 5));
        //中中挺数量（张）
        Double zztnumsZhuang = Double.valueOf(zztnumsGen) / (int) (1220 / (caseDoubles.getZztWeight() + 5));
        //中中挺余料长
        Double zztYuliaoLen = caseYuliaoLenth(Double.valueOf(zztlenth));
        //中中挺余料宽
        Double zztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(zztwidth));
        Emp emp1 = new Emp();
        emp1.setPartName("中中挺");
        emp1.setLength(zztlenth);
        emp1.setWidth(zztwidth);
        emp1.setNumbyGe(zztnumsge);
        emp1.setNumbyGens(zztnumsGen);
        emp1.setNumbyZhuang(zztnumsZhuang);
        emp1.setYuliaoLen(zztYuliaoLen);
        emp1.setYuliaoWidth(zztYuLiaoWidth);
        if (flagzzt) {
            empList.add(emp1);
        }
        return empList;
    }


    /**
     * 六类 1中档1中挺，含中、下芯板
     */

    public List<Emp> case6(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        boolean flagzxb = false;
        boolean flagxxb = false;
        double xxbnums = 0.0;
        double zxbnums = 0.0;
        double zztnums = 0.0;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            xxbnums = Double.valueOf(numbyser.getXxbnums());
            flagxxb = true;
        }
        boolean flagzzt = false;
        if (!StringUtils.isEmpty(numbyser.getZztnums())) {
            zztnums = Double.valueOf(numbyser.getZztnums());
            flagzzt = true;
        }
        //中芯板长
        Double zxblength = new Double(0);
        zxblength = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getZdWeight() + 4 * caseDoubles.getXbDepth();
        //下芯板长
        Double xxblength = new Double(0);
        xxblength = caseDoubles.getXxHigh();
        //中芯板宽
        Double zxbwidth = new Double(0);
        zxbwidth = (caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() - caseDoubles.getZztWeight()) / 2 + 2 * caseDoubles.getXbDepth();
        //下芯板宽
        Double xxbwidth = new Double(0);
        xxbwidth = caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() + 2 * caseDoubles.getXbDepth();
        //中、下芯板数量
        Double zxbnumspian = new Double(0);
        Double xxbnumspian = new Double(0);
        int N = 0;
        if (caseDoubles.getPlaThick() == 15) {
            N = 1;
        } else {
            N = 2;
        }
        zxbnumspian = (caseDoubles.getDoornums() * N * zxbnums);
        xxbnumspian = (caseDoubles.getDoornums() * N * xxbnums);
        Emp emp = new Emp();
        emp.setPartName("中芯板");
        emp.setLength(zxblength);
        emp.setWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setPartName("下芯板");
        emp1.setLength(xxblength);
        emp1.setWidth(xxbwidth);
        emp1.setNumbyZhuang(xxbnumspian);
        if (flagxxb) {
            empList.add(emp1);
        }
        //中中挺长
        Double zztlenth = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getZdWeight() + 3 * caseDoubles.getZxWeight();
        //中中挺宽
        Double zztwidth = caseDoubles.getZztWeight();
        //中中挺数量（个）
        Double zztnumsge = caseDoubles.getDoornums() * zztnums;
        //中中挺数量（根）
        Double zztnumsGen = Double.valueOf(zztnumsge) / (int) (2440 / (Double.valueOf(zztlenth) + 4 + 5));
        //中中挺数量（张）
        Double zztnumsZhuang = Double.valueOf(zztnumsGen) / (int) (1220 / (caseDoubles.getZztWeight() + 5));
        //中中挺余料长
        Double zztYuliaoLen = caseYuliaoLenth(Double.valueOf(zztlenth));
        //中中挺余料宽
        Double zztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(zztwidth));
        Emp emp2 = new Emp();
        emp2.setPartName("中中挺");
        emp2.setLength(zztlenth);
        emp2.setWidth(zztwidth);
        emp2.setNumbyGe(zztnumsge);
        emp2.setNumbyGens(zztnumsGen);
        emp2.setNumbyZhuang(zztnumsZhuang);
        emp2.setYuliaoLen(zztYuliaoLen);
        emp2.setYuliaoWidth(zztYuLiaoWidth);
        if (flagzzt) {
            empList.add(emp2);
        }
        return empList;
    }


    /**
     * 七类 1中档2中挺，含中、下芯板
     */

    public List<Emp> case7(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        boolean flagzxb = false;
        boolean flagxxb = false;
        double xxbnums = 0.0;
        double zxbnums = 0.0;
        double zztnums = 0.0;
        double xztnums = 0.0;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            xxbnums = Double.valueOf(numbyser.getXxbnums());
            flagxxb = true;
        }
        boolean flagzzt = false;
        if (!StringUtils.isEmpty(numbyser.getZztnums())) {
            zztnums = Double.valueOf(numbyser.getZztnums());
            flagzzt = true;
        }
        boolean flagxzt = false;
        if (!StringUtils.isEmpty(numbyser.getXztnums())) {
            xztnums = Double.valueOf(numbyser.getXztnums());
            flagxzt = true;
        }
        //中芯板长
        Double zxblength = new Double(0);
        zxblength = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getZdWeight() + 4 * caseDoubles.getXbDepth();
        //下芯板长
        Double xxblength = new Double(0);
        xxblength = caseDoubles.getXxHigh();
        //中芯板宽
        Double zxbwidth = new Double(0);
        zxbwidth = (caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() - caseDoubles.getZztWeight()) / 2 + 2 * caseDoubles.getXbDepth();
        //下芯板宽
        Double xxbwidth = new Double(0);
        xxbwidth = (caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() - caseDoubles.getXztWeight()) / 2 + 2 * caseDoubles.getXbDepth();
        //中、下芯板数量
        Double zxbnumspian = new Double(0);
        Double xxbnumspian = new Double(0);
        int N = 0;
        if (caseDoubles.getPlaThick() == 15) {
            N = 1;
        } else {
            N = 2;
        }
        zxbnumspian = (caseDoubles.getDoornums() * N * zxbnums);
        xxbnumspian = (caseDoubles.getDoornums() * N * xxbnums);
        Emp emp = new Emp();
        emp.setPartName("中芯板");
        emp.setLength(zxblength);
        emp.setWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setPartName("下芯板");
        emp1.setLength(xxblength);
        emp1.setWidth(xxbwidth);
        emp1.setNumbyZhuang(xxbnumspian);
        if (flagxxb) {
            empList.add(emp1);
        }
        //中中挺长
        Double zztlenth = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getZdWeight() + 3 * caseDoubles.getZxWeight();
        //下中挺长
        Double xztlenth = caseDoubles.getXzthigh();
        //中中挺宽
        Double zztwidth = caseDoubles.getZztWeight();
        //下中挺宽
        Double xztwidth = caseDoubles.getXztWeight();
        //中中挺数量（个）
        Double zztnumsge = caseDoubles.getDoornums() * zztnums;
        //下中挺数量（个）
        Double xztnumsge = caseDoubles.getDoornums() * xztnums;
        //中中挺数量（根）
        Double zztnumsGen = Double.valueOf(zztnumsge) / (int) (2440 / (Double.valueOf(zztlenth) + 4 + 5));
        //下中挺数量（根）
        Double xztnumsGen = Double.valueOf(xztnumsge) / (int) (2440 / (Double.valueOf(xztlenth) + 4 + 5));
        //中中挺数量（张）
        Double zztnumsZhuang = Double.valueOf(zztnumsGen) / (int) (1220 / (caseDoubles.getZztWeight() + 5));
        //下中挺数量（张）
        Double xztnumsZhuang = Double.valueOf(xztnumsGen) / (int) (1220 / (caseDoubles.getXztWeight() + 5));
        //中中挺余料长
        Double zztYuliaoLen = caseYuliaoLenth(Double.valueOf(zztlenth));
        //下中挺余料长
        Double xztYuliaoLen = caseYuliaoLenth(Double.valueOf(xztlenth));
        //中中挺余料宽
        Double zztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(zztwidth));
        //下中挺余料宽
        Double xztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(xztwidth));
        Emp emp2 = new Emp();
        emp2.setPartName("中中挺");
        emp2.setLength(zztlenth);
        emp2.setWidth(zztwidth);
        emp2.setNumbyGe(zztnumsge);
        emp2.setNumbyGens(zztnumsGen);
        emp2.setNumbyZhuang(zztnumsZhuang);
        emp2.setYuliaoLen(zztYuliaoLen);
        emp2.setYuliaoWidth(zztYuLiaoWidth);
        if (flagzzt) {
            empList.add(emp2);
        }
        Emp emp3 = new Emp();
        emp3.setPartName("下中挺");
        emp3.setLength(xztlenth);
        emp3.setWidth(xztwidth);
        emp3.setNumbyGe(xztnumsge);
        emp3.setNumbyGens(xztnumsGen);
        emp3.setNumbyZhuang(xztnumsZhuang);
        emp3.setYuliaoLen(xztYuliaoLen);
        emp3.setYuliaoWidth(xztYuLiaoWidth);
        if (flagxzt) {
            empList.add(emp3);
        }
        return empList;
    }


    /**
     * 八类 2中档3中挺，含上、中、下芯板
     */

    public List<Emp> case8(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        boolean flagsxb = false;
        boolean flagzxb = false;
        boolean flagxxb = false;
        double sxbnums = 0.0;
        double xxbnums = 0.0;
        double zxbnums = 0.0;
        double sztnums = 0.0;
        double zztnums = 0.0;
        double xztnums = 0.0;
        if (!StringUtils.isEmpty(numbyser.getSxbnums())) {
            sxbnums = Double.valueOf(numbyser.getSxbnums());
            flagsxb = true;
        }
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            xxbnums = Double.valueOf(numbyser.getXxbnums());
            flagxxb = true;
        }
        boolean flagszt = false;
        if (!StringUtils.isEmpty(numbyser.getSztnums())) {
            sztnums = Double.valueOf(numbyser.getSztnums());
            flagszt = true;
        }
        boolean flagzzt = false;
        if (!StringUtils.isEmpty(numbyser.getZztnums())) {
            zztnums = Double.valueOf(numbyser.getZztnums());
            flagzzt = true;
        }
        boolean flagxzt = false;
        if (!StringUtils.isEmpty(numbyser.getXztnums())) {
            xztnums = Double.valueOf(numbyser.getXztnums());
            flagxzt = true;
        }
        //上芯板长
        Double sxblength = caseDoubles.getSxHigh();

        //中芯板长
        Double zxblength = new Double(0);
        zxblength = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getSxHigh() - 2 * caseDoubles.getZdWeight() + 6 * caseDoubles.getXbDepth();
        //下芯板长
        Double xxblength = new Double(0);
        xxblength = caseDoubles.getXxHigh();
        //中芯板宽
        Double zxbwidth = new Double(0);
        zxbwidth = (caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() - caseDoubles.getZztWeight()) / 2 + 2 * caseDoubles.getXbDepth();
        //上芯板宽
        Double sxbwidth = (caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() - caseDoubles.getSztweight()) / 2 + 2 * caseDoubles.getXbDepth();
        //下芯板宽
        Double xxbwidth = new Double(0);
        xxbwidth = (caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() - caseDoubles.getXztWeight()) / 2 + 2 * caseDoubles.getXbDepth();
        //上、中、下芯板数量
        Double sxbnumspian = new Double(0);
        Double zxbnumspian = new Double(0);
        Double xxbnumspian = new Double(0);
        int N = 0;
        if (caseDoubles.getPlaThick() == 15) {
            N = 1;
        } else {
            N = 2;
        }
        sxbnumspian = (caseDoubles.getDoornums() * N * sxbnums);
        zxbnumspian = (caseDoubles.getDoornums() * N * zxbnums);
        xxbnumspian = (caseDoubles.getDoornums() * N * xxbnums);
        Emp emp = new Emp();
        emp.setPartName("上芯板");
        emp.setLength(sxblength);
        emp.setWidth(sxbwidth);
        emp.setNumbyZhuang(sxbnumspian);
        if (flagsxb) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setPartName("中芯板");
        emp1.setLength(zxblength);
        emp1.setWidth(zxbwidth);
        emp1.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp1);
        }
        Emp emp2 = new Emp();
        emp2.setPartName("下芯板");
        emp2.setLength(xxblength);
        emp2.setWidth(xxbwidth);
        emp2.setNumbyZhuang(xxbnumspian);
        if (flagxxb) {
            empList.add(emp2);
        }
        //上中挺长
        Double sztlenth = caseDoubles.getSzthigh();
        //中中挺长
        Double zztlenth = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getSzthigh() - caseDoubles.getXzthigh() - 2 * caseDoubles.getZdWeight() + 6 * caseDoubles.getZxWeight();
        //下中挺长
        Double xztlenth = caseDoubles.getXzthigh();
        //上中挺宽
        Double sztwidth = caseDoubles.getSztweight();
        //中中挺宽
        Double zztwidth = caseDoubles.getZztWeight();
        //下中挺宽
        Double xztwidth = caseDoubles.getXztWeight();
        //上中挺数量（个）
        Double sztnumsge = caseDoubles.getDoornums() * sztnums;
        //中中挺数量（个）
        Double zztnumsge = caseDoubles.getDoornums() * zztnums;
        //下中挺数量（个）
        Double xztnumsge = caseDoubles.getDoornums() * xztnums;
        //上中挺数量（根）
        Double sztnumsGen = Double.valueOf(sztnumsge) / (int) (2440 / (Double.valueOf(sztlenth) + 4 + 5));
        //中中挺数量（根）
        Double zztnumsGen = Double.valueOf(zztnumsge) / (int) (2440 / (Double.valueOf(zztlenth) + 4 + 5));
        //下中挺数量（根）
        Double xztnumsGen = Double.valueOf(xztnumsge) / (int) (2440 / (Double.valueOf(xztlenth) + 4 + 5));
        //上中挺数量（张）
        Double sztnumsZhuang = Double.valueOf(sztnumsGen) / (int) (1220 / (caseDoubles.getSztweight() + 5));
        //中中挺数量（张）
        Double zztnumsZhuang = Double.valueOf(zztnumsGen) / (int) (1220 / (caseDoubles.getZztWeight() + 5));
        //下中挺数量（张）
        Double xztnumsZhuang = Double.valueOf(xztnumsGen) / (int) (1220 / (caseDoubles.getXztWeight() + 5));
        //上中挺余料长
        Double sztYuliaoLen = caseYuliaoLenth(Double.valueOf(sztlenth));
        //中中挺余料长
        Double zztYuliaoLen = caseYuliaoLenth(Double.valueOf(zztlenth));
        //下中挺余料长
        Double xztYuliaoLen = caseYuliaoLenth(Double.valueOf(xztlenth));
        //上中挺余料宽
        Double sztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(sztwidth));
        //中中挺余料宽
        Double zztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(zztwidth));
        //下中挺余料宽
        Double xztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(xztwidth));
        Emp emp3 = new Emp();
        emp3.setPartName("上中挺");
        emp3.setLength(sztlenth);
        emp3.setWidth(sztwidth);
        emp3.setNumbyGe(sztnumsge);
        emp3.setNumbyGens(sztnumsGen);
        emp3.setNumbyZhuang(sztnumsZhuang);
        emp3.setYuliaoLen(sztYuliaoLen);
        emp3.setYuliaoWidth(sztYuLiaoWidth);
        if (flagszt) {
            empList.add(emp3);
        }
        Emp emp4 = new Emp();
        emp4.setPartName("中中挺");
        emp4.setLength(zztlenth);
        emp4.setWidth(zztwidth);
        emp4.setNumbyGe(zztnumsge);
        emp4.setNumbyGens(zztnumsGen);
        emp4.setNumbyZhuang(zztnumsZhuang);
        emp4.setYuliaoLen(zztYuliaoLen);
        emp4.setYuliaoWidth(zztYuLiaoWidth);
        if (flagzzt) {
            empList.add(emp4);
        }
        Emp emp5 = new Emp();
        emp5.setPartName("下中挺");
        emp5.setLength(xztlenth);
        emp5.setWidth(xztwidth);
        emp5.setNumbyGe(xztnumsge);
        emp5.setNumbyGens(xztnumsGen);
        emp5.setNumbyZhuang(xztnumsZhuang);
        emp5.setYuliaoLen(xztYuliaoLen);
        emp5.setYuliaoWidth(xztYuLiaoWidth);
        if (flagxzt) {
            empList.add(emp5);
        }
        return empList;
    }


    /**
     * 九类 3小中档4小中挺
     */

    public List<Emp> case9(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        boolean flagxzd = false;
        boolean flagsmzt = false;
        double xzdnums = 0.0;
        double smztnums = 0.0;
        if (!StringUtils.isEmpty(numbyser.getXzdnums())) {
            xzdnums = Double.valueOf(numbyser.getXzdnums());
            flagxzd = true;
        }
        if (!StringUtils.isEmpty(numbyser.getMemo1())) {
            smztnums = Double.valueOf(numbyser.getMemo1());
            flagsmzt = true;
        }
        //小中档长
        Double xzdlength = new Double(0);
        xzdlength = caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() + 2 * caseDoubles.getZxWeight();
        //小中档宽
        Double xzdwidth = caseDoubles.getXzdWeight();
        //小中挺长
        Double xztlength = new Double(0);
        xztlength = (caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - 3 * caseDoubles.getXzdWeight()) / 4 + 2 * caseDoubles.getZxWeight();
        //小中挺宽
        Double xztwidth = new Double(0);
        xztwidth = caseDoubles.getSmztWeight();
        //小中档数量（个）
        Double xzdnumsge = caseDoubles.getDoornums() * xzdnums;
        //小中挺数量（个）
        Double xztnumsge = caseDoubles.getDoornums() * smztnums;
        //小中档数量（根）
        Double xzdnumsGen = Double.valueOf(xzdnumsge) / (int) (2440 / (Double.valueOf(xzdlength) + 4 + 5));
        //小中挺数量（根）
        Double xztnumsGen = Double.valueOf(xztnumsge) / (int) (2440 / (Double.valueOf(xztlength) + 4 + 5));
        //小中档数量（张）
        Double xzdnumsZhuang = Double.valueOf(xzdnumsGen) / (int) (1220 / (Double.valueOf(xzdwidth) + 5));
        //小中挺数量（张）
        Double xztnumsZhuang = Double.valueOf(xztnumsGen) / (int) (1220 / (Double.valueOf(xztwidth) + 5));
        //小中档余料长
        Double xzdYuliaoLen = caseYuliaoLenth(Double.valueOf(xzdlength));
        //小中挺余料长
        Double xztYuliaoLen = caseYuliaoLenth(Double.valueOf(xztlength));
        //小中档余料宽
        Double xzdYuLiaoWidth = caseYuliaoKuan(Double.valueOf(xzdwidth));
        //小中挺余料宽
        Double xztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(xztwidth));
        Emp emp = new Emp();
        emp.setPartName("小中档");
        emp.setLength(xzdlength);
        emp.setWidth(xzdwidth);
        emp.setNumbyGe(xzdnumsge);
        emp.setNumbyGens(xzdnumsGen);
        emp.setNumbyZhuang(xzdnumsZhuang);
        emp.setYuliaoLen(xzdYuliaoLen);
        emp.setYuliaoWidth(xzdYuLiaoWidth);
        if (flagxzd) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setPartName("小中挺");
        emp1.setLength(xztlength);
        emp1.setWidth(xztwidth);
        emp1.setNumbyGe(xztnumsge);
        emp1.setNumbyGens(xztnumsGen);
        emp1.setNumbyZhuang(xztnumsZhuang);
        emp1.setYuliaoLen(xztYuliaoLen);
        emp1.setYuliaoWidth(xztYuLiaoWidth);
        if (flagsmzt) {
            empList.add(emp1);
        }
        return empList;
    }


    /**
     * 十类 5小中档、无中挺，
     */

    public List<Emp> case10(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        boolean flagxzd = false;
        double xzdnums = 0.0;

        if (!StringUtils.isEmpty(numbyser.getXzdnums())) {
            xzdnums = Double.valueOf(numbyser.getXzdnums());
            flagxzd = true;
        }

        //小中档长
        Double xzdlength = new Double(0);
        xzdlength = caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() + 2 * caseDoubles.getZxWeight();
        //小中档宽
        Double xzdwidth = caseDoubles.getXzdWeight();
        //小中档数量（个）
        Double xzdnumsge = caseDoubles.getDoornums() * xzdnums;

        //小中档数量（根）
        Double xzdnumsGen = Double.valueOf(xzdnumsge) / (int) (2440 / (Double.valueOf(xzdlength) + 4 + 5));

        //小中档数量（张）
        Double xzdnumsZhuang = Double.valueOf(xzdnumsGen) / (int) (1220 / (Double.valueOf(xzdwidth) + 5));

        //小中档余料长
        Double xzdYuliaoLen = caseYuliaoLenth(Double.valueOf(xzdlength));

        //小中档余料宽
        Double xzdYuLiaoWidth = caseYuliaoKuan(Double.valueOf(xzdwidth));

        Emp emp = new Emp();
        emp.setPartName("小中档");
        emp.setLength(xzdlength);
        emp.setWidth(xzdwidth);
        emp.setNumbyGe(xzdnumsge);
        emp.setNumbyGens(xzdnumsGen);
        emp.setNumbyZhuang(xzdnumsZhuang);
        emp.setYuliaoLen(xzdYuliaoLen);
        emp.setYuliaoWidth(xzdYuLiaoWidth);
        if (flagxzd) {
            empList.add(emp);
        }

        return empList;
    }


    /**
     * 十一类 1中档、2小中档、3小中挺
     */

    public List<Emp> case11(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        boolean flagxzd = false;
        boolean flagsmzt = false;
        boolean flagxxb = false;
        double xxbnums = 0.0;
        double xzdnums = 0.0;
        double smztnums = 0.0;
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            xxbnums = Double.valueOf(numbyser.getXxbnums());
            flagxxb = true;
        }
        if (!StringUtils.isEmpty(numbyser.getXzdnums())) {
            xzdnums = Double.valueOf(numbyser.getXzdnums());
            flagxzd = true;
        }
        if (!StringUtils.isEmpty(numbyser.getMemo1())) {
            smztnums = Double.valueOf(numbyser.getMemo1());
            flagsmzt = true;
        }
        //下芯板长
        Double xxblength = caseDoubles.getXxHigh();
        //下芯板宽
        Double xxbwidth = new Double(0);
        xxbwidth = caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() + 2 * caseDoubles.getXbDepth();
        //下芯板数量
        int N = 0;
        if (caseDoubles.getPlaThick() == 15) {
            N = 1;
        } else {
            N = 2;
        }
        Double xxbnumsPian = (caseDoubles.getDoornums() * N * xxbnums);
        Emp emp = new Emp();
        emp.setPartName("下芯板");
        emp.setLength(xxblength);
        emp.setWidth(xxbwidth);
        emp.setNumbyZhuang(xxbnumsPian);
        if (flagxxb) {
            empList.add(emp);
        }
        //小中档长
        Double xzdlength = new Double(0);
        xzdlength = caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() + 2 * caseDoubles.getZxWeight();
        //小中档宽
        Double xzdwidth = caseDoubles.getXzdWeight();
        //小中挺长
        Double xztlength = new Double(0);
        xztlength = (caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getZdWeight() - 2 * caseDoubles.getXzdWeight() - caseDoubles.getXxHigh() + 2 * caseDoubles.getXbDepth()) / 3 + 2 * caseDoubles.getZxWeight();
        //小中挺宽
        Double xztwidth = new Double(0);
        xztwidth = caseDoubles.getSmztWeight();
        //小中档数量（个）
        Double xzdnumsge = caseDoubles.getDoornums() * xzdnums;
        //小中挺数量（个）
        Double xztnumsge = caseDoubles.getDoornums() * smztnums;
        //小中档数量（根）
        Double xzdnumsGen = Double.valueOf(xzdnumsge) / (int) (2440 / (Double.valueOf(xzdlength) + 4 + 5));
        //小中挺数量（根）
        Double xztnumsGen = Double.valueOf(xztnumsge) / (int) (2440 / (Double.valueOf(xztlength) + 4 + 5));
        //小中档数量（张）
        Double xzdnumsZhuang = Double.valueOf(xzdnumsGen) / (int) (1220 / (Double.valueOf(xzdwidth) + 5));
        //小中挺数量（张）
        Double xztnumsZhuang = Double.valueOf(xztnumsGen) / (int) (1220 / (Double.valueOf(xztwidth) + 5));
        //小中档余料长
        Double xzdYuliaoLen = caseYuliaoLenth(Double.valueOf(xzdlength));
        //小中挺余料长
        Double xztYuliaoLen = caseYuliaoLenth(Double.valueOf(xztlength));
        //小中档余料宽
        Double xzdYuLiaoWidth = caseYuliaoKuan(Double.valueOf(xzdwidth));
        //小中挺余料宽
        Double xztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(xztwidth));
        Emp emp1 = new Emp();
        emp1.setPartName("小中档");
        emp1.setLength(xzdlength);
        emp1.setWidth(xzdwidth);
        emp1.setNumbyGe(xzdnumsge);
        emp1.setNumbyGens(xzdnumsGen);
        emp1.setNumbyZhuang(xzdnumsZhuang);
        emp1.setYuliaoLen(xzdYuliaoLen);
        emp1.setYuliaoWidth(xzdYuLiaoWidth);
        if (flagxzd) {
            empList.add(emp1);
        }
        Emp emp2 = new Emp();
        emp2.setPartName("小中挺");
        emp2.setLength(xztlength);
        emp2.setWidth(xztwidth);
        emp2.setNumbyGe(xztnumsge);
        emp2.setNumbyGens(xztnumsGen);
        emp2.setNumbyZhuang(xztnumsZhuang);
        emp2.setYuliaoLen(xztYuliaoLen);
        emp2.setYuliaoWidth(xztYuLiaoWidth);
        if (flagsmzt) {
            empList.add(emp2);
        }
        return empList;
    }


}
