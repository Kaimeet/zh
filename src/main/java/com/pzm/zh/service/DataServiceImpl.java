package com.pzm.zh.service;


import com.pzm.zh.dao.NumbyserMapper;
import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.Emp;
import com.pzm.zh.entity.Numbyser;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @program: zh
 * @description: 主计算逻辑实现类
 * @author: Mr.Tong
 * @create: 2020-11-16 10:11
 **/
@Service
public class DataServiceImpl implements DataService {
    @Resource
    NumbyserMapper numbyserMapper;

    private Double caseYuliaoLenth(Double c) {
        Double yuliaolenth = new Double(0);
        //13.计算上帽余料长
        double length = (2440 / (c + 4 + 5) - ((int) (2440 / (c + 4 + 5)))) * (c + 4 + 5);
        yuliaolenth = length;
        return yuliaolenth;
    }

    private Double caseYuliaoKuan(Double a) {
        Double yuliaowidth = new Double(0);
        double c = ((1220 / (a + 5)) - (int) (1220 / (a + 5))) * (a + 5);
        yuliaowidth = c;
        return yuliaowidth;
    }


    @Override
    public List<Emp> mainfinalcase(CaseDto caseDto) {
        // 板材厚度 = 芯板高度
        BigDecimal plaThick = caseDto.getPlaThick();
        // 槽宽
        BigDecimal caoweight = caseDto.getCaoweight();
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
                if (serid == 18) {
                    emp.setHigh(new Double(45));
                    emp.setPreHight(new Double(45));
                } else if (serid == 25) {
                    emp.setHigh(new Double(35));
                    emp.setPreHight(new Double(35));
                } else {
                    emp.setHigh(new Double(40));
                    emp.setPreHight(new Double(40));
                }
            } else if ("上帽".equals(emp.getPartName())) {
                if (serid == 18) {
                    emp.setHigh(new Double(40));
                    emp.setPreHight(new Double(40));
                } else if (serid == 25) {
                    emp.setHigh(new Double(32));
                    emp.setPreHight(new Double(32));
                } else {
                    emp.setHigh(new Double(37));
                    emp.setPreHight(new Double(37));
                }
            } else if ("下帽".equals(emp.getPartName())) {
                if (serid == 18) {
                    emp.setHigh(new Double(40));
                    emp.setPreHight(new Double(40));
                } else if (serid == 25) {
                    emp.setHigh(new Double(32));
                    emp.setPreHight(new Double(32));
                } else {
                    emp.setHigh(new Double(37));
                    emp.setPreHight(new Double(37));
                }
            } else if ("中档".equals(emp.getPartName())) {
                if (serid == 18) {
                    emp.setHigh(new Double(40));
                    emp.setPreHight(new Double(40));
                } else {
                    emp.setHigh(new Double(37));
                    emp.setPreHight(new Double(37));
                }
            } else if ("上中挺".equals(emp.getPartName())) {
                if (serid == 21) {
                    emp.setHigh(new Double(33));
                    emp.setPreHight(new Double(33));
                } else {
                    emp.setHigh(new Double(34));
                    emp.setPreHight(new Double(34));
                }
            } else if ("中中挺".equals(emp.getPartName())) {
                if (serid == 21) {
                    emp.setHigh(new Double(33));
                    emp.setPreHight(new Double(33));
                } else {
                    emp.setHigh(new Double(34));
                    emp.setPreHight(new Double(34));
                }
            } else if ("下中挺".equals(emp.getPartName())) {
                if (serid == 21) {
                    emp.setHigh(new Double(33));
                    emp.setPreHight(new Double(33));
                } else {
                    emp.setHigh(new Double(34));
                    emp.setPreHight(new Double(34));
                }
            } else if ("中挺".equals(emp.getPartName())) {
                if (serid == 21) {
                    emp.setHigh(new Double(33));
                    emp.setPreHight(new Double(33));
                } else {
                    emp.setHigh(new Double(34));
                    emp.setPreHight(new Double(34));
                }
            } else if ("小中挡".equals(emp.getPartName())) {
                emp.setHigh(new Double(34));
                emp.setPreHight(new Double(34));
            } else if ("小中挺".equals(emp.getPartName())) {
                if (serid == 21) {
                    emp.setHigh(new Double(33));
                    emp.setPreHight(new Double(33));
                } else {
                    emp.setHigh(new Double(34));
                    emp.setPreHight(new Double(34));
                }
            } else if ("上芯板".equals(emp.getPartName())) {
                emp.setHigh(plaThick.doubleValue());
                emp.setPreHight(plaThick.doubleValue());
            } else if ("中芯板".equals(emp.getPartName())) {
                emp.setHigh(plaThick.doubleValue());
                emp.setPreHight(plaThick.doubleValue());
            } else if ("下芯板".equals(emp.getPartName())) {
                emp.setHigh(plaThick.doubleValue());
                emp.setPreHight(plaThick.doubleValue());
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
            // 拼接备料尺寸和精截尺寸
            emp.setPreSize(emp.getPreLenght().intValue() + "*" + emp.getPreWidth().intValue() + "*" + emp.getPreHight().intValue());
            emp.setSize(emp.getLength().intValue() + "*" + emp.getWidth().intValue() + "*" + emp.getHigh().intValue());
        }
        return maincase;
    }

    /**
     * 计算主逻辑
     * 1.根据前端传输的算法类型判断是哪种算法
     * 2.简短部件调用简单部件算法进行计算。
     * 3.复杂部件对应到每种算法进行计算出结果。
     *
     * @param caseDto
     * @return
     */
    @Override
    public List<Emp> maincase(CaseDto caseDto) {
        //1.提取出该部件的每种部件数量
        Numbyser numbyser = numbyserMapper.selectByPrimaryKey(caseDto.getSerizesId());
        System.out.println(numbyser + "numbyser值为**************************");
        //2.计算普通部件值
        List<Emp> emps = casenormal(caseDto, numbyser);
        if ("1".equals(caseDto.getCaseires()) || "2".equals(caseDto.getCaseires())) {
            return case1(caseDto, numbyser, emps);
        } else if ("3".equals(caseDto.getCaseires())) {
            return case5(caseDto, numbyser, emps);
        } else if ("4".equals(caseDto.getCaseires())) {
            return case2(caseDto, numbyser, emps);
        } else if ("5".equals(caseDto.getCaseires()) || "6".equals(caseDto.getCaseires())) {
            return case3(caseDto, numbyser, emps);
        } else if ("7".equals(caseDto.getCaseires())) {
            return case4(caseDto, numbyser, emps);
        }
        return null;
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
        Double doornums = new Double(0);
        if (caseDto.getDoornums() != null) {
            doornums = caseDto.getDoornums().doubleValue();
        }
        Double ztweight = new Double(0);
        if (caseDto.getZztWeight() != null) {
            ztweight = caseDto.getZztWeight().doubleValue();
        }
        Double plathick = new Double(0);
        if (caseDto.getPlaThick() != null) {
            plathick = caseDto.getPlaThick().doubleValue();
        }
        Double bkweight = new Double(0);
        if (caseDto.getBkweight() != null) {
            bkweight = caseDto.getBkweight().doubleValue();
        }
        Double sxHigh = new Double(0);
        if (caseDto.getSxHigh() != null) {
            sxHigh = caseDto.getSxHigh().doubleValue();
        }
        Double zxHigh = new Double(0);
        if (caseDto.getZxHigh() != null) {
            zxHigh = caseDto.getZxHigh().doubleValue();
        }
        Double xxHigh = new Double(0);
        if (caseDto.getXxHigh() != null) {
            xxHigh = caseDto.getXxHigh().doubleValue();
        }
        Double zdWeight = new Double(0);
        if (caseDto.getZdWeight() != null) {
            zdWeight = caseDto.getZdWeight().doubleValue();
        }
        Double xbDepth = new Double(0);
        if (caseDto.getXbDepth() != null) {
            xbDepth = caseDto.getXbDepth().doubleValue();
        }
        Double zxWeight = new Double(0);
        if (caseDto.getZxWeight() != null) {
            zxWeight = caseDto.getZxWeight().doubleValue();
        }
        Double smWeight = new Double(0);
        if (caseDto.getSmWeight() != null) {
            smWeight = caseDto.getSmWeight().doubleValue();
        }
        Double xmWeight = new Double(0);
        if (caseDto.getXmWeight() != null) {
            xmWeight = caseDto.getXmWeight().doubleValue();
        }
        Double glassDepth = new Double(0);
        if (caseDto.getGlassDepth() != null) {
            glassDepth = caseDto.getGlassDepth().doubleValue();
        }
        Double xzthigh = new Double(0);
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
        } else if (doorhigh <= 2230) {
            biankuanglength = new Double(2250);
        } else {
            biankuanglength = new Double(2440);
        }

        emp.setLength(biankuanglength);
        emp.setPreLenght(biankuanglength);
        //2.计算边框宽
        emp.setWidth(bkweight);
        emp.setPreWidth(bkweight);
        //3.计算边框高
        Double bkhigh = new Double(40);
        emp.setHigh(bkhigh);
        //4.计算边框数量（根）
        Double bknumsGen = new Double(0);
        bknumsGen = (doornums * 2);
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
        Double smlength = new Double(0);
        smlength = (doorweight - 2 * bkweight + 2 * zxWeight);
        emp1.setLength(smlength);
        //8.计算上帽宽（含造型）
        Double smweights = smWeight;
        emp1.setWidth(smweights);
        emp1.setPreWidth(smweights);
        //9.计算上帽数量（个）
        Double smnumsGe = doornums;
        emp1.setNumbyGe(smnumsGe);
        //10.计算上帽数量（根）
        Double smnumsGen = new Double(0);
        smnumsGen = (doornums / ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5))));
        emp1.setNumbyGens(smnumsGen);
        //11.计算上帽数量（张）
        Double smnumsZhuang = new Double(0);
        smnumsZhuang = (Double.valueOf(smnumsGen) / (int) (1220 / (smWeight + 5)));
        emp1.setNumbyZhuang(smnumsZhuang);
        //12.计算上帽余料宽
        Double smyuliaokuan = new Double(0);
        double c = ((1220 / (smWeight + 5)) - (int) (1220 / (smWeight + 5))) * (smWeight + 5);
        smyuliaokuan = c;
        emp1.setYuliaoWidth(smyuliaokuan);
        //13.计算上帽余料长
//        Double smyuliaochang = new Double(0);
//        double d = (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) - ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)))) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5);
//        smyuliaochang = d;
//        emp1.setYuliaoLen(smyuliaochang);
        Double preLenght = preLength((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) + 50);
        emp1.setPreLenght(preLenght);
        emp1.setYuliaoLen(2440 - preLenght);
        emps.add(emp1);
        Emp emp2 = new Emp();
        emp2.setPartName("下帽");
        //14.计算下帽长
        Double xmlength = smlength;
        emp2.setLength(xmlength);
        //15.计算下帽宽
        Double xmwidth = xmWeight;
        emp2.setWidth(xmwidth);
        emp2.setPreWidth(xmwidth);
        //16.计算下帽数量（个）
        Double xmnumsGe = doornums;
        emp2.setNumbyGe(xmnumsGe);
        //17.计算下帽数量(根)
        Double xmnumsGen = new Double(0);
        Double f = doornums / ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)));
        xmnumsGen = f;
        emp2.setNumbyGens(xmnumsGen);
        //18.计算下帽数量（张）
        Double xmnumsZhuang = new Double(0);
        double h = f / (int) (1220 / (xmWeight + 5));
        xmnumsZhuang = h;
        emp2.setNumbyZhuang(xmnumsZhuang);
        //19.计算下帽余料长
//        Double xmyuliaochang = new Double(0);
//        Double i = (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) - ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)))) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5);
//        xmyuliaochang = i;
//        emp2.setYuliaoLen(xmyuliaochang);
        preLenght = preLength((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) + 50);
        emp2.setPreLenght(preLenght);
        emp2.setYuliaoLen(2440 - preLenght);
        //20.计算下帽余料宽
        Double xmyuliaokuan = new Double(0);
        Double m = ((1220 / (xmWeight + 5)) - (int) (1220 / (xmWeight + 5))) * (xmWeight + 5);
        xmyuliaokuan = m;
        emp2.setYuliaoWidth(xmyuliaokuan);
        emps.add(emp2);
        Emp emp3 = new Emp();
        emp3.setPartName("中档");
        //21.计算中档长
        Double zdlength = xmlength;
        emp3.setLength(zdlength);
        //22.计算中档宽
        Double zdwidth = zdWeight;
        emp3.setWidth(zdwidth);
        emp3.setPreWidth(zdwidth);
        //23.计算中档数量（个），（根）,(张)
        Double zdnumsGe = new Double(0);
        Double zdnumsGen = new Double(0);
        Double zdnumsZhuang = new Double(0);
        String zzdnums = numbyser.getZzdnums();
        if (!StringUtils.isEmpty(zzdnums)) {
            zdnumsGe = (doornums * Double.valueOf(zzdnums));
            Double n = (doornums / ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5))) * Double.valueOf(zzdnums));
            zdnumsGen = n;
            zdnumsZhuang = (n / (int) (1220 / (zdWeight + 5)));
        }
        emp3.setNumbyZhuang(zdnumsZhuang);
        emp3.setNumbyGens(zdnumsGen);
        emp3.setNumbyGe(zdnumsGe);
        //24.计算中档余料长
//        Double zdyuliaolen = new Double(0);
//        Double t = (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) - ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)))) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5);
//        zdyuliaolen = t;
//        emp3.setYuliaoLen(zdyuliaolen);
        preLenght = preLength((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) + 50);
        emp3.setPreLenght(preLenght);
        emp3.setYuliaoLen(2440 - preLenght);
        //25.计算中档余料宽
        Double zdyuliaokuan = new Double(0);
        double v = ((1220 / (zdWeight + 5)) - (int) (1220 / (zdWeight + 5))) * (zdWeight + 5);
        zdyuliaokuan = v;
        emp3.setYuliaoWidth(zdyuliaokuan);
        boolean flagzd = false;
        if (!StringUtils.isEmpty(numbyser.getZzdnums())) {
            flagzd = true;
        }
        if (flagzd) {
            emps.add(emp3);
        }

        return emps;
    }

    /**
     * 编号为Ⅰ大类的算法逻辑（下芯板固定（含中挺或不含中挺））
     * 1.计算下芯板长（含进槽）
     * 2.计算下芯板宽（含进槽）
     * 3.计算下芯板数量（片）
     * 4.计算中芯板长
     * 5.计算中芯板宽（含进槽）
     * 6.计算中芯板数量（片）
     * 7.根据case判断是否含中挺，以下步骤为含中挺算法。
     * 8.计算中中挺长
     * 9.计算中中挺宽
     * 10.计算中中挺数量（个）
     * 11.计算中中挺数量（根）
     * 12.计算中中挺数量(张)
     * 13.计算下中挺长
     * 14.计算下中挺宽
     * 15.计算下中挺数量（个）
     * 16.计算下中挺数量（根）
     * 17.计算下中挺数量（张）
     *
     * @param caseDto
     * @return
     */
    public List<Emp> case1(CaseDto caseDto, Numbyser numbyser, List<Emp> empList) {
        boolean flagsxb = false;
        if (!StringUtils.isEmpty(numbyser.getSxbnums())) {
            flagsxb = true;
        }
        boolean flagxxb = false;
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            flagxxb = true;
        }
        boolean flagzxb = false;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            flagzxb = true;
        }
        boolean flagzt = false;
        String caserizes = caseDto.getCaseires();
        if (caserizes.equals("2") || caserizes.equals("4") || caserizes.equals("6")) {
            flagzt = true;
        }
        //if(caserizes.)
        Double xxlength = new Double(0);
        //1.计算上、下芯板长
        if (caseDto.getXxHigh() != null) {
            xxlength = caseDto.getXxHigh().doubleValue();
        }
        //2.计算下芯板宽
        Double xxwidth = new Double(0);
        if (caseDto.getDoorweight() != null && caseDto.getBkweight() != null && caseDto.getZxWeight() != null) {
            Double doorweight = caseDto.getDoorweight().doubleValue();
            Double bkweight = caseDto.getBkweight().doubleValue();
            Double zxweight = caseDto.getZxWeight().doubleValue();
            xxwidth = (doorweight - 2 * bkweight + 2 * zxweight);
        }
        //3.计算下芯板数量（片）
        Double xxnumpian = new Double(0);
        int N = 0;
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(15)) == 0) {
            if (flagzt) {
                N = 2;
            } else {
                N = 1;
            }
        }
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(8)) == 0) {
            if (flagzt) {
                N = 4;
            } else {
                N = 2;
            }
        }
        xxnumpian = new Double(caseDto.getDoornums() * N);
        Emp emp = new Emp();
        emp.setLength(xxlength);
        emp.setPreLenght(xxlength);
        emp.setWidth(xxwidth);
        emp.setPreWidth(xxwidth);
        emp.setNumbyZhuang(xxnumpian);
        emp.setPartName("下芯板");
        if (flagxxb) {
            empList.add(emp);
        }

        //4.计算中芯板长
        Double zxblenth = new Double(0);
        if (caseDto.getDoorhigh() != null && caseDto.getSmWeight() != null && caseDto.getZdWeight() != null && caseDto.getXmWeight() != null && caseDto.getZxWeight() != null && caseDto.getXxHigh() != null) {
            Double doorhigh = caseDto.getDoorhigh().doubleValue();
            Double smweight = caseDto.getSmWeight().doubleValue();
            Double zdweight = caseDto.getZdWeight().doubleValue();
            Double xmweight = caseDto.getXmWeight().doubleValue();
            Double xxhigh = caseDto.getXxHigh().doubleValue();
            Double zxweight = caseDto.getZxWeight().doubleValue();
            zxblenth = doorhigh - smweight - xmweight - zdweight - xxhigh + 4 * zxweight;
        }
        //5.计算中芯板宽，数量与下芯板一致。
        Emp emp1 = new Emp();
        emp1.setLength(zxblenth);
        emp1.setPreLenght(zxblenth);
        emp1.setPartName("中芯板");
        emp1.setWidth(xxwidth);
        emp1.setPreWidth(xxwidth);
        emp1.setNumbyZhuang(xxnumpian);
        if (flagzxb) {
            empList.add(emp1);
        }
        //caseDto.getDoorweight().subtract(new BigDecimal(2).multiply(caseDto.getBkweight())).add(new BigDecimal(2).multiply(caseDto.getZxWeight())).subtract(new BigDecimal(2));
        //6.若有中挺，计算中挺
        Emp empszt = new Emp();
        Emp empzzt = new Emp();
        Emp empxzt = new Emp();
        empszt.setPartName("上中挺");
        empxzt.setPartName("下中挺");
        empzzt.setPartName("中中挺");
        boolean flagszt = false;
        boolean flagzzt = false;
        boolean flagxzt = false;
        if (!StringUtils.isEmpty(numbyser.getSztnums())) {
            flagszt = true;
        }
        if (!StringUtils.isEmpty(numbyser.getZztnums())) {
            flagzzt = true;
        }
        if (!StringUtils.isEmpty(numbyser.getXztnums())) {
            flagxzt = true;
        }
        if (flagzt) {
            //10.计算下中挺长
            Double xztlength = new Double(0);
            if (caseDto.getMemo1() != null && !caseDto.getMemo1().equals("")) {
                xztlength = new Double(caseDto.getMemo1());
            }
            //11.计算下中挺宽
            Double xztweight = new Double(0);
            if (caseDto.getXztWeight() != null) {
                xztweight = caseDto.getXztWeight().doubleValue();
            }
            //12.计算下中挺数量（个）
            Double xztnumGe = new Double(0);
            if (caseDto.getDoornums() != null) {
                xztnumGe = caseDto.getDoornums().doubleValue();
            }
            //13.计算下中挺数量（根）
            Double xztnumGen = new Double(0);
            if (caseDto.getDoornums() != null && !StringUtils.isEmpty(caseDto.getMemo1())) {
                double doornums = caseDto.getDoornums().doubleValue();
                double xzthigh = Double.valueOf(caseDto.getMemo1());
                double e = doornums / ((int) (2440 / (xzthigh + 4 + 5)));
                xztnumGen = e;
            }
            //14.计算下中挺数量（张）
            Double xztnumZhuang = new Double(0);
            if (caseDto.getXztWeight() != null) {
                double xztweights = caseDto.getXztWeight().doubleValue();
                double xztnums = Double.valueOf(xztnumGen);
                double numszhauang = xztnums / (int) (1220 / (xztweights + 5));
                xztnumZhuang = numszhauang;
            }
            empxzt.setLength(xztlength);
            empxzt.setWidth(xztweight);
            empxzt.setNumbyGe(xztnumGe);
            empxzt.setNumbyGens(xztnumGen);
            empxzt.setNumbyZhuang(xztnumZhuang);


            //7.计算中中挺长//中中挺数量（根）
            Double zztnumsGen = new Double(0);
            Double zztlength = new Double(0);
            Double zztnumsZhang = new Double(0);
            if (caseDto.getDoorhigh() != null && caseDto.getSmWeight() != null && caseDto.getXmWeight() != null && caseDto.getDoornums() != null && caseDto.getZxWeight() != null) {
                Double doorhigh1 = caseDto.getDoorhigh().doubleValue();
                Double smweight1 = caseDto.getSmWeight().doubleValue();
                Double zdweight1 = 0.0;
                if (caseDto.getZdWeight() != null) {
                    zdweight1 = caseDto.getZdWeight().doubleValue();
                }

                Double xmweight1 = caseDto.getXmWeight().doubleValue();
                Double xxhigh1 = 0.0;
                if (caseDto.getXxHigh() != null) {
                    xxhigh1 = caseDto.getXxHigh().doubleValue();
                }
                Double zxweight = caseDto.getZxWeight().doubleValue();
                zztlength = doorhigh1 - smweight1 - xmweight1 - zdweight1 - xxhigh1 + 2 * zxweight;
                // 中中挺余料长
//                Double zztyuliaolen = caseYuliaoLenth(doorhigh1 - smweight1 - xmweight1 - zdweight1 - xxhigh1 + 2 * zxweight);
//                empzzt.setYuliaoLen(zztyuliaolen);
                // (INT)2440/(doorHigh-smWeight-xmWeight-xxHigh-zdWeight+4*zxWeight+4+5))*(doorHigh-smWeight-xmWeight-xxHigh-zdWeight+4*zxWeight +4+5)+50
                Double preLength = preLength((int) (2440 / (doorhigh1 - smweight1 - xmweight1 - xxhigh1 - zdweight1 + 4 * zdweight1 + 4 + 5)) * (doorhigh1 - smweight1 - xmweight1 - xxhigh1 - zdweight1 + 4 * zdweight1 + 4 + 5) + 50);
                empzzt.setPreLenght(preLength);
                empzzt.setYuliaoLen(2440 - preLength);
                Double doornums = caseDto.getDoornums().doubleValue();
                Double c = doornums / ((int) (2440 / (doorhigh1 - smweight1 - xmweight1 - zdweight1 - xxhigh1 + 2 * zxweight + 4 + 5)));
                zztnumsGen = c;
                if (caseDto.getZztWeight() != null) {
                    Double zhangs = c / (int) (1220 / (caseDto.getZztWeight().doubleValue() + 5));
                    zztnumsZhang = zhangs;
                }
            }
            //8.计算中中挺宽,中中挺数量（张）
            Double zztwidth = new Double(0);
            if (caseDto.getZztWeight() != null) {
                zztwidth = caseDto.getZztWeight().doubleValue();
            }
            //9.中中挺数量（个）
            Double zztnumsGe = new Double(0);
            if (caseDto.getDoornums() != null) {
                zztnumsGe = caseDto.getDoornums().doubleValue();
            }
            empzzt.setLength(zztlength);
            empzzt.setWidth(zztwidth);
            empzzt.setPreWidth(zztwidth);
            empzzt.setNumbyGe(zztnumsGe);
            empzzt.setNumbyGens(zztnumsGen);
            empzzt.setNumbyZhuang(zztnumsZhang);
            //12.计算中中挺余料宽
            Double zztyuliaokuan = new Double(0);
            if (caseDto.getZztWeight() != null) {
                Double zztweights = caseDto.getZztWeight().doubleValue();
                Double c = ((1220 / (zztweights + 5)) - (int) (1220 / (zztweights + 5))) * (zztweights + 5);
                zztyuliaokuan = c;
                empzzt.setYuliaoWidth(zztyuliaokuan);
            }
            //13.计算余料长
            if (flagszt) {
                empList.add(empszt);
            }
            if (flagxzt) {
                empList.add(empxzt);
            }
            if (flagzzt) {
                empList.add(empzzt);
            }

        }

        return empList;
    }

    /**
     * 编号为Ⅱ大类的算法逻辑（上下芯板固定（含中挺或不含中挺））
     * 1.计算上、下芯板长（含进槽）
     * 2.计算上、下芯板宽（含进槽）
     * 3.计算上、下芯板数量（片）
     * 4.计算中芯板长
     * 5.计算中芯板宽（含进槽）
     * 6.计算中芯板数量（片）
     * 7.根据case判断是否含中挺，以下步骤为含中挺算法。
     * 8.计算上、下中挺长
     * 9.计算上、下中挺宽
     * 10.上、下中挺数量（个）
     * 11.计算上、下中挺数量（根）
     * 12.计算上、下中挺数量（张）
     * 13.计算中中挺长
     * 14.计算中中挺宽
     * 15.计算中中挺数量（个）
     * 16.计算中中挺数量（根）
     * 17.计算中中挺数量（张）
     *
     * @param caseDto
     * @return
     */
    public List<Emp> case2(CaseDto caseDto, Numbyser numbyser, List<Emp> empList) {
        boolean flagsxb = false;
        if (!StringUtils.isEmpty(numbyser.getSxbnums())) {
            flagsxb = true;
        }
        boolean flagxxb = false;
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            flagxxb = true;
        }
        boolean flagzxb = false;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            flagzxb = true;
        }
        boolean flagzt = false;
        String caserizes = caseDto.getCaseires();
        if (caserizes.equals("2") || caserizes.equals("4") || caserizes.equals("6")) {
            flagzt = true;
        }
        //if(caserizes.)
        Double xxlength = new Double(0);
        //1.计算上、下芯板长
        if (caseDto.getXxHigh() != null) {
            xxlength = caseDto.getSxHigh().doubleValue();
        }
        //2.计算上、下芯板宽
        Double xxwidth = new Double(0);
        if (caseDto.getDoorweight() != null && caseDto.getBkweight() != null && caseDto.getZxWeight() != null && caseDto.getSztweight() != null) {
            Double doorweight = caseDto.getDoorweight().doubleValue();
            Double bkweight = caseDto.getBkweight().doubleValue();
            Double zxweight = caseDto.getZxWeight().doubleValue();
            Double sztweight = caseDto.getSztweight().doubleValue();
            xxwidth = (doorweight - 2 * bkweight + 4 * zxweight - sztweight) / 2;
        }
        //3.计算上、下芯板数量（片）
        Double xxnumpian = new Double(0);
        int N = 0;
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(15)) == 0) {
            if (flagzt) {
                N = 2;
            } else {
                N = 1;
            }
        }
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(8)) == 0) {
            if (flagzt) {
                N = 4;
            } else {
                N = 2;
            }
        }
        xxnumpian = new Double(caseDto.getDoornums() * N);
        Emp emp = new Emp();
        emp.setLength(xxlength);
        emp.setPreLenght(xxlength);
        emp.setWidth(xxwidth);
        emp.setPreWidth(xxwidth);
        emp.setNumbyZhuang(xxnumpian);
        emp.setPartName("下芯板");
        if (flagxxb) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setLength(xxlength);
        emp1.setPreLenght(xxlength);
        emp1.setWidth(xxwidth);
        emp1.setPreWidth(xxwidth);
        emp1.setNumbyZhuang(xxnumpian);
        emp1.setPartName("上芯板");
        if (flagsxb) {
            empList.add(emp1);
        }

        //4.计算中芯板长
        Double zxblenth = new Double(0);
        if (caseDto.getDoorhigh() != null && caseDto.getSmWeight() != null && caseDto.getZdWeight() != null && caseDto.getXmWeight() != null && caseDto.getSxHigh() != null && caseDto.getXxHigh() != null && caseDto.getZxWeight() != null) {
            Double doorhigh = caseDto.getDoorhigh().doubleValue();
            Double smweight = caseDto.getSmWeight().doubleValue();
            Double zdweight = caseDto.getZdWeight().doubleValue();
            Double xmweight = caseDto.getXmWeight().doubleValue();
            Double sxhighs = caseDto.getSxHigh().doubleValue();
            Double xxhighs = caseDto.getXxHigh().doubleValue();
            Double zxweights = caseDto.getZxWeight().doubleValue();
            zxblenth = doorhigh - smweight - xmweight - sxhighs - xxhighs - 2 * zdweight + 6 * zxweights;
        }
        //5.计算中芯板宽，数量与下芯板一致。
        Emp emp2 = new Emp();
        emp2.setLength(zxblenth);
        emp2.setPreLenght(zxblenth);
        emp2.setPartName("中芯板");
        emp2.setWidth(xxwidth);
        emp2.setPreWidth(xxwidth);
        emp2.setNumbyZhuang(xxnumpian);
        if (flagzxb) {
            empList.add(emp2);
        }
        //caseDto.getDoorweight().subtract(new BigDecimal(2).multiply(caseDto.getBkweight())).add(new BigDecimal(2).multiply(caseDto.getZxWeight())).subtract(new BigDecimal(2));
        //6.若有中挺，计算中挺
        Emp empszt = new Emp();
        Emp empzzt = new Emp();
        Emp empxzt = new Emp();
        empszt.setPartName("上中挺");
        empxzt.setPartName("下中挺");
        empzzt.setPartName("中中挺");
        if (flagzt) {
            //10.计算上、下中挺长
            Double xztlength = new Double(0);
            if (caseDto.getMemo1() != null) {
                xztlength = new Double(caseDto.getMemo1());
            }
            // ztblHigh=(INT)2440/(xztlength+4+5))*( xztlength+4+5)+50 下中挺备料长
            Double preLength = preLength((int) (2240 / (xztlength + 4 + 5)) * (xztlength + 4 + 5));
            empxzt.setPreLenght(preLength);
            empszt.setPreLenght(preLength);
            empxzt.setYuliaoLen(2440 - preLength);
            empszt.setYuliaoLen(2440 - preLength);
            //11.计算上、下中挺宽
            Double xztweight = new Double(0);
            if (caseDto.getXztWeight() != null) {
                Double xztyuliaokuan = new Double(0);
                Double c = ((1220 / (caseDto.getXztWeight().doubleValue() + 5)) - (int) (1220 / (caseDto.getXztWeight().doubleValue() + 5))) * (caseDto.getXztWeight().doubleValue() + 5);
                xztyuliaokuan = c;
                empszt.setYuliaoWidth(xztyuliaokuan);
                empxzt.setYuliaoWidth(xztyuliaokuan);
                xztweight = caseDto.getXztWeight().doubleValue();
            }
            //12.计算上、下中挺数量（个）
            Double xztnumGe = new Double(0);
            if (caseDto.getDoornums() != null) {
                xztnumGe = caseDto.getDoornums().doubleValue();
            }
            //13.计算上、下中挺数量（根）
            Double xztnumGen = new Double(0);
            if (caseDto.getDoornums() != null && !StringUtils.isEmpty(caseDto.getMemo1())) {
                Double doornums = caseDto.getDoornums().doubleValue();
                Double xzthigh = Double.valueOf(caseDto.getMemo1());
                Double e = doornums / ((int) (2440 / (xzthigh + 4 + 5)));
                xztnumGen = e;
            }
            //14.计算上、下中挺数量（张）
            Double xztnumZhuang = new Double(0);
            if (caseDto.getXztWeight() != null) {
                Double xztweights = caseDto.getXztWeight().doubleValue();
                Double xztnums = Double.valueOf(xztnumGen);
                Double numszhauang = xztnums / (int) (1220 / (xztweights + 5));
                xztnumZhuang = numszhauang;
            }
            empxzt.setLength(xztlength);
            empxzt.setWidth(xztweight);
            empxzt.setPreWidth(xztweight);
            empxzt.setNumbyGe(xztnumGe);
            empxzt.setNumbyGens(xztnumGen);
            empxzt.setNumbyZhuang(xztnumZhuang);
            empszt.setLength(xztlength);
            empszt.setWidth(xztweight);
            empszt.setPreWidth(xztweight);
            empszt.setNumbyGe(xztnumGe);
            empszt.setNumbyGens(xztnumGen);
            empszt.setNumbyZhuang(xztnumZhuang);
            //7.计算中中挺长//中中挺数量（根）
            Double zztnumsGen = new Double(0);
            Double zztlength = new Double(0);
            Double zztnumsZhang = new Double(0);
            if (caseDto.getDoorhigh() != null && caseDto.getSmWeight() != null && caseDto.getZdWeight() != null && caseDto.getXmWeight() != null && caseDto.getDoornums() != null && caseDto.getZxWeight() != null) {
                Double doorhigh1 = caseDto.getDoorhigh().doubleValue();
                Double smweight1 = caseDto.getSmWeight().doubleValue();
                Double zdweight1 = caseDto.getZdWeight().doubleValue();
                Double xmweight1 = caseDto.getXmWeight().doubleValue();
                Double zxweights = caseDto.getZxWeight().doubleValue();
                zztlength = doorhigh1 - smweight1 - xmweight1 - 2 * zdweight1 - 2 * Double.valueOf(xztlength) + 6 * zxweights;
                //13.计算中中挺余料长
                // 计算方法：zztblHigh=(INT)2440/(doorHigh-smWeight-xmWeight-xxHigh-zdWeight+4*zxWeight+4+5))*(doorHigh-smWeight-xmWeight-xxHigh-zdWeight+4*zxWeight +4+5)+50
                Double lenght = (int) (2440 / (doorhigh1 - smweight1 - xmweight1 - caseDto.getXxHigh().doubleValue() - zdweight1 - zdweight1 + 4 * zxweights + 4 + 5) )* (doorhigh1 - smweight1 - xmweight1 - caseDto.getXxHigh().doubleValue() - zdweight1 - zdweight1 + 4 * zxweights + 4 + 5) + 50;
                preLength = preLength(lenght);
//                Double zztyuliaochang = new Double(0);
//                Double d = (2440 / (doorhigh1 - smweight1 - xmweight1 - 2 * zdweight1 - 2 * Double.valueOf(xztlength) + 6 * zxweights + 4 + 5) - ((int) (2440 / (doorhigh1 - smweight1 - xmweight1 - 2 * zdweight1 - 2 * Double.valueOf(xztlength) + 6 * zxweights + 4 + 5)))) * (doorhigh1 - smweight1 - xmweight1 - 2 * zdweight1 - 2 * Double.valueOf(xztlength) + 6 * zxweights + 4 + 5);
//                zztyuliaochang = d;
                empzzt.setPreLenght(preLength);
                empzzt.setYuliaoLen(2440 - preLength);
                Double doornums = caseDto.getDoornums().doubleValue();
                Double c = doornums / ((int) (2440 / (doorhigh1 - smweight1 - xmweight1 - 2 * zdweight1 - 2 * Double.valueOf(xztlength) + 2 * zxweights + 4 + 5)));
                zztnumsGen = c;
                if (caseDto.getZztWeight() != null) {
                    Double zhangs = c / (int) (1220 / (caseDto.getZztWeight().doubleValue() + 5));
                    zztnumsZhang = zhangs;
                }
            }
            //8.计算中中挺宽,中中挺数量（张）
            Double zztwidth = new Double(0);
            if (caseDto.getZztWeight() != null) {
                Double zztyuliaokuan = new Double(0);
                Double zztweights = caseDto.getZztWeight().doubleValue();
                Double c = ((1220 / (zztweights + 5)) - (int) (1220 / (zztweights + 5))) * (zztweights + 5);
                zztyuliaokuan = c;
                empzzt.setYuliaoWidth(zztyuliaokuan);
                zztwidth = caseDto.getZztWeight().doubleValue();
            }
            //9.中中挺数量（个）
            Double zztnumsGe = new Double(0);
            if (caseDto.getDoornums() != null) {
                zztnumsGe = caseDto.getDoornums().doubleValue();
            }
            empzzt.setLength(zztlength);
            empzzt.setWidth(zztwidth);
            empzzt.setPreWidth(zztwidth);
            empzzt.setNumbyGe(zztnumsGe);
            empzzt.setNumbyGens(zztnumsGen);
            empzzt.setNumbyZhuang(zztnumsZhang);
        }
        empList.add(empszt);
        empList.add(empxzt);
        empList.add(empzzt);
        return empList;
    }

    /**
     * 编号为Ⅲ大类的算法逻辑（上中下芯板固定均分含造型（含中挺或不含中挺））
     * 1.计算上、中、下芯板长（含进槽）
     * 2.计算上、中、下芯板宽（含进槽）
     * 3.计算上、中、下芯板数量（片）
     * 4.根据case判断是否含中挺，以下步骤为含中挺算法。
     * 5.计算上、中、下中挺长
     * 6.计算上、中、下中挺宽
     * 7.计算上、中、下中挺数量（个）
     * 8.计算上、中、下中挺数量（根）
     * 9.计算上、中、下中挺数量（张）
     *
     * @param caseDto
     * @return
     */
    public List<Emp> case3(CaseDto caseDto, Numbyser numbyser, List<Emp> empList) {
        boolean flagsxb = false;
        if (!StringUtils.isEmpty(numbyser.getSxbnums())) {
            flagsxb = true;
        }
        boolean flagxxb = false;
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            flagxxb = true;
        }
        boolean flagzxb = false;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            flagzxb = true;
        }
        boolean flagzt = false;
        String caserizes = caseDto.getCaseires();
        if (caserizes.equals("2") || caserizes.equals("4") || caserizes.equals("6")) {
            flagzt = true;
        }
        int doornumes = 0;
        if (caseDto.getDoornums() != null) {
            doornumes = caseDto.getDoornums();
        }
        String zzdnums = numbyser.getZzdnums();
        int zdnumsGe = (Integer.valueOf(zzdnums));
        //if(caserizes.)
        Double xxlength = new Double(0);
        //1.计算上中下芯板长
        if (caseDto.getDoorhigh() != null && caseDto.getSmWeight() != null && caseDto.getZdWeight() != null && caseDto.getXmWeight() != null && caseDto.getZxWeight() != null) {
            Double doorhigh = caseDto.getDoorhigh().doubleValue();
            Double smweight = caseDto.getSmWeight().doubleValue();
            Double zdweight = caseDto.getZdWeight().doubleValue();
            Double xmweight = caseDto.getXmWeight().doubleValue();
            Double zxweight = caseDto.getZxWeight().doubleValue();
            xxlength = ((doorhigh - smweight - xmweight - zdweight * zdnumsGe) / (zdnumsGe + 1) + 2 * zxweight);
        }
        //2.计算上中下芯板宽
        Double xxwidth = new Double(0);
        if (flagzt) {
            if (caseDto.getZxWeight() != null && caseDto.getDoorweight() != null && caseDto.getBkweight() != null && caseDto.getZztWeight() != null) {
                Double doorweight = caseDto.getDoorweight().doubleValue();
                Double bkweight = caseDto.getBkweight().doubleValue();
                Double zxweight = caseDto.getZxWeight().doubleValue();
                Double ztweight = caseDto.getZztWeight().doubleValue();
                xxwidth = (doorweight - 2 * bkweight + 2 * zxweight - ztweight);
            }
        } else {
            if (caseDto.getZxWeight() != null && caseDto.getDoorweight() != null && caseDto.getBkweight() != null) {
                Double doorweight = caseDto.getDoorweight().doubleValue();
                Double bkweight = caseDto.getBkweight().doubleValue();
                Double zxweight = caseDto.getZxWeight().doubleValue();
                xxwidth = (doorweight - 2 * bkweight + 2 * zxweight);
            }

        }
        //3.计算上中下芯板数量（片）
        Double xxnumpian = new Double(0);
        int N = 0;
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(15)) == 0) {
            if (flagzt) {
                N = 2;
            } else {
                N = 1;
            }
        }
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(8)) == 0) {
            if (flagzt) {
                N = 4;
            } else {
                N = 2;
            }
        }
        xxnumpian = new Double(caseDto.getDoornums() * N * (zdnumsGe + 1));
        Emp empsxb = new Emp();
        empsxb.setLength(xxlength);
        empsxb.setPreLenght(xxlength);
        empsxb.setWidth(xxwidth);
        empsxb.setPreWidth(xxwidth);
        empsxb.setNumbyZhuang(xxnumpian);
        empsxb.setPartName("上芯板");

        Emp empzxb = new Emp();
        empzxb.setLength(xxlength);
        empzxb.setPreLenght(xxlength);
        empzxb.setWidth(xxwidth);
        empzxb.setPreWidth(xxwidth);
        empzxb.setNumbyZhuang(xxnumpian);
        empzxb.setPartName("中芯板");

        Emp empxxb = new Emp();
        empxxb.setLength(xxlength);
        empxxb.setPreLenght(xxlength);
        empxxb.setWidth(xxwidth);
        empxxb.setPreWidth(xxwidth);
        empxxb.setNumbyZhuang(xxnumpian);
        empxxb.setPartName("下芯板");
        if (flagsxb) {
            empList.add(empsxb);
        }
        if (flagxxb) {
            empList.add(empxxb);
        }
        if (flagzxb) {
            empList.add(empzxb);

        }

        //caseDto.getDoorweight().subtract(new BigDecimal(2).multiply(caseDto.getBkweight())).add(new BigDecimal(2).multiply(caseDto.getZxWeight())).subtract(new BigDecimal(2));
        //6.若有中挺，计算中挺
//        Emp empszt = new Emp();
//        Emp empzzt = new Emp();
//        Emp empxzt = new Emp();
//        empszt.setPartName("中挺");
//        //empxzt.setPartName("中挺");
//        //empzzt.setPartName("中中挺");
//        if (flagzt) {
//            //7.计算上中下挺长//中中挺数量（根）
//            Double zztnumsGen = new Double(0);
//            Double zztlength = xxlength;
//            Double zztlengthsou = Double.valueOf(xxlength);
//            Double zztnumsZhang = new Double(0);
//            Double doornums = caseDto.getDoornums().doubleValue();
//            Double c = doornums * (zdnumsGe + 1) / ((int) (2440 / (zztlengthsou + 4 + 5)));
//            zztnumsGen = c;
//            if (caseDto.getZztWeight() != null) {
//                Double zhangs = c / (int) (1220 / (caseDto.getZztWeight().doubleValue() + 5));
//                zztnumsZhang = zhangs;
//            }
//
//            //8.计算中中挺宽,中中挺数量（张）
//            Double zztwidth = new Double(0);
//            if (caseDto.getZztWeight() != null) {
//                zztwidth = caseDto.getZztWeight().doubleValue();
//            }
//            //9.中中挺数量（个）
//            Double zztnumsGe = new Double(0);
//            if (caseDto.getDoornums() != null) {
//                zztnumsGe = (doornums * (zdnumsGe + 1));
//            }
//            Double zztyuliaolenth = caseYuliaoLenth(Double.valueOf(zztlength));
//            empszt.setYuliaoLen(zztyuliaolenth);
//            Double yuliaowidth = caseYuliaoKuan(Double.valueOf(zztwidth));
//            empszt.setYuliaoWidth(yuliaowidth);
//            empzzt.setLength(zztlength);
//            empzzt.setWidth(zztwidth);
//            empzzt.setNumbyGe(zztnumsGe);
//            empzzt.setNumbyGens(zztnumsGen);
//            empzzt.setNumbyZhuang(zztnumsZhang);
//            empszt.setLength(zztlength);
//            empszt.setWidth(zztwidth);
//            empszt.setNumbyGe(zztnumsGe);
//            empszt.setNumbyGens(zztnumsGen);
//            empszt.setNumbyZhuang(zztnumsZhang);
//            empxzt.setLength(zztlength);
//            empxzt.setWidth(zztwidth);
//            empxzt.setNumbyGe(zztnumsGe);
//            empxzt.setNumbyGens(zztnumsGen);
//            empxzt.setNumbyZhuang(zztnumsZhang);
//            empList.add(empszt);
//            //resultDtoList.add(empxzt);
//            //resultDtoList.add(empzzt);
//        }
        return empList;
    }

    /**
     * Ⅳ类，此类只含有中芯板/中玻璃，无中档、中挺
     */
    public List<Emp> case4(CaseDto caseDto, Numbyser numbyser, List<Emp> empList) {
        //增加中心板判断
        boolean flagzxb = false;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
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
            Double doorWeight = caseDto.getDoorweight().doubleValue();
            Double bkWeight = caseDto.getBkweight().doubleValue();
            Double xbDepth = caseDto.getXbDepth().doubleValue();
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
            zxbnumspian = (caseDto.getDoornums().doubleValue() * N);
        }
        Emp empzxb = new Emp();
        empzxb.setPartName("中芯板");
        empzxb.setLength(zxblength);
        empzxb.setPreLenght(zxblength);
        empzxb.setWidth(zxbwidth);
        empzxb.setPreWidth(zxbwidth);
        empzxb.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            emps.add(empzxb);
        }
        return emps;
    }

    /**
     * 新三类，情况说明：此类中、下芯板为固定尺寸（含造型），。此类包含两种情况：
     * 1、部件只含有上、中、下芯板，此时只需计算上、中、下芯板尺寸，不含中挺，含中档。
     */
    public List<Emp> case5(CaseDto caseDto, Numbyser numbyser, List<Emp> empList) {
        //增加中心板判断
        boolean flagzxb = false;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            flagzxb = true;
        }
        //增加中心板判断
        boolean flagsxb = false;
        if (!StringUtils.isEmpty(numbyser.getSxbnums())) {
            flagsxb = true;
        }
        //增加中心板判断
        boolean flagxxb = false;
        if (!StringUtils.isEmpty(numbyser.getXxbnums())) {
            flagxxb = true;
        }
        //1.计算上芯板长
        Double sxblength = new Double(0);
        if (caseDto.getDoorhigh() != null && caseDto.getSmWeight() != null && caseDto.getXmWeight() != null && caseDto.getZdWeight() != null && caseDto.getXxHigh() != null && caseDto.getZxHigh() != null && caseDto.getZxWeight() != null) {
            Double doorhigh = caseDto.getDoorhigh().doubleValue();
            Double smweight = caseDto.getSmWeight().doubleValue();
            Double xmweight = caseDto.getXmWeight().doubleValue();
            Double zdweight = caseDto.getZdWeight().doubleValue();
            Double xxhigh = caseDto.getXxHigh().doubleValue();
            Double zxHigh = caseDto.getZxHigh().doubleValue();
            Double zxweight = caseDto.getZxWeight().doubleValue();
            sxblength = (doorhigh - smweight - xmweight - 2 * zdweight - xxhigh - zxHigh + 6 * zxweight);
        }
        //2.计算上芯板宽
        Double sxbwidth = new Double(0);
        if (caseDto.getDoorweight() != null && caseDto.getBkweight() != null && caseDto.getZxWeight() != null) {
            Double doorweight = caseDto.getDoorweight().doubleValue();
            Double bkweight = caseDto.getBkweight().doubleValue();
            Double zxweight = caseDto.getZxWeight().doubleValue();
            sxbwidth = (doorweight - 2 * bkweight + 2 * zxweight);
        }
        //3.中芯板长
        Double zxblength = new Double(0);
        if (caseDto.getZxHigh() != null) {
            Double zxhigh = caseDto.getZxHigh().doubleValue();
            zxblength = (zxhigh);
        }
        //4.计算中芯板宽
        Double zxbwidth = new Double(0);
        if (caseDto.getZxWeight() != null && caseDto.getDoorweight() != null && caseDto.getBkweight() != null) {
            double doorWeight = caseDto.getDoorweight().doubleValue();
            double bkWeight = caseDto.getBkweight().doubleValue();
            double zxweight = caseDto.getZxWeight().doubleValue();
            zxbwidth = (doorWeight - 2 * bkWeight + 2 * zxweight);
        }
        Double zxbnumspian = new Double(0);
        int N = 0;
        if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(15)) == 0) {
            N = 1;
        } else if (caseDto.getPlaThick() != null && caseDto.getPlaThick().compareTo(new BigDecimal(8)) == 0) {
            N = 2;
        }
        if (caseDto.getDoornums() != null) {
            zxbnumspian = (caseDto.getDoornums().doubleValue() * N);
        }
        Emp empzxb = new Emp();
        empzxb.setPartName("中芯板");
        empzxb.setLength(zxblength);
        empzxb.setPreLenght(zxblength);
        empzxb.setWidth(zxbwidth);
        empzxb.setPreWidth(zxbwidth);
        empzxb.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(empzxb);
        }
        //5.计算下芯板长
        Double xxblenth = new Double(0);
        if (caseDto.getXxHigh() != null) {
            xxblenth = caseDto.getXxHigh().doubleValue();
        }
        //6.计算下芯板宽与中芯板一致

        //7.计算芯板数量（片），中芯板计算好

        Emp empsxb = new Emp();
        empsxb.setPartName("上芯板");
        empsxb.setLength(sxblength);
        empsxb.setPreLenght(sxblength);
        empsxb.setWidth(sxbwidth);
        empsxb.setPreWidth(sxbwidth);
        empsxb.setNumbyZhuang(zxbnumspian);

        Emp empxxb = new Emp();
        empxxb.setPartName("下芯板");
        empxxb.setLength(xxblenth);
        empxxb.setPreLenght(xxblenth);
        empxxb.setWidth(zxbwidth);
        empxxb.setPreWidth(zxbwidth);
        empxxb.setNumbyZhuang(zxbnumspian);

        if (flagsxb) {
            empList.add(empsxb);
        }
        if (flagxxb) {
            empList.add(empxxb);
        }
        return empList;
    }

    /**
     * 计算备件长
     *
     * @param length
     * @return
     */
    private Double preLength(Double length) {
        if (length.compareTo(new Double(2100)) < 0) {
            length = new Double(2100);
        } else if (length.compareTo(new Double(2100)) >= 0 && length.compareTo(new Double(2150)) < 0) {
            length = new Double(2150);
        }else if (length.compareTo(new Double(2150)) >= 0 && length.compareTo(new Double(2200)) < 0) {
            length = new Double(2200);
        } else if (length.compareTo(new Double(2200)) >= 0 && length.compareTo(new Double(2250)) < 0) {
            length = new Double(2250);
        } else if (length.compareTo(new Double(2250)) >= 0 && length.compareTo(new Double(2300)) < 0) {
            length = new Double(2300);
        } else if (length.compareTo(new Double(2300)) >= 0) {
            length = new Double(2440);
        }
        return length;
    }
}
