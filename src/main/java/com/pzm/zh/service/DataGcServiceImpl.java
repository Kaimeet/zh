package com.pzm.zh.service;

import com.pzm.zh.dao.NumbyserMapper;
import com.pzm.zh.dao.VariablesMapper;
import com.pzm.zh.entity.CaseDoubles;
import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.Emp;
import com.pzm.zh.entity.Numbyser;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class DataGcServiceImpl implements DataGcService {

    @Resource
    private NumbyserMapper numbyserMapper;

    @Resource
    private VariablesMapper variablesMapper;

    @Override
    public List<Emp> maincase(CaseDto caseDto) {
        //1. 提取出该部件的每种部件数量
        Numbyser numbyser = numbyserMapper.selectBySerizes(caseDto.getSerizesId());
        // 计算普通部件值
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
        }
        return null;
    }

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
                emp.setPreHight(new Double(variablesMapper.selecthigh("边框").getHigh()));
            } else if ("上帽".equals(emp.getPartName())) {
                if (serid == 130 || serid == 132 || serid == 135 || serid == 136 || serid == 137 || serid == 138 || serid == 139 || serid == 140 || serid == 141 || serid == 143) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("插玻上帽").getHigh()));
                    emp.setPreHight(new Double(variablesMapper.selecthigh("插玻上帽").getHigh()));
                } else if (serid == 142) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("069上帽").getHigh()));
                    emp.setPreHight(new Double(variablesMapper.selecthigh("069上帽").getHigh()));
                } else {
                    emp.setHigh(new Double(variablesMapper.selecthigh("上帽").getHigh()));
                    emp.setPreHight(new Double(variablesMapper.selecthigh("上帽").getHigh()));

                }
            } else if ("下帽".equals(emp.getPartName())) {
                if (serid == 142) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("069下帽").getHigh()));
                    emp.setPreHight(new Double(variablesMapper.selecthigh("069下帽").getHigh()));
                } else {
                    emp.setHigh(new Double(variablesMapper.selecthigh("下帽").getHigh()));
                    emp.setPreHight(new Double(variablesMapper.selecthigh("下帽").getHigh()));
                }
            } else if ("中档".equals(emp.getPartName())) {
                if (serid == 142) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("069中档").getHigh()));
                    emp.setPreHight(new Double(variablesMapper.selecthigh("069中档").getHigh()));
                } else if (serid == 140) {
                    emp.setHigh(new Double(variablesMapper.selecthigh("插玻中档").getHigh()));
                    emp.setPreHight(new Double(variablesMapper.selecthigh("插玻中档").getHigh()));
                } else {
                    emp.setHigh(new Double(variablesMapper.selecthigh("中档").getHigh()));
                    emp.setPreHight(new Double(variablesMapper.selecthigh("中档").getHigh()));
                }
            } else if ("上中挺".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("上中挺").getHigh()));
                emp.setPreHight(new Double(variablesMapper.selecthigh("上中挺").getHigh()));
            } else if ("中中挺".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("中中挺").getHigh()));
                emp.setPreHight(new Double(variablesMapper.selecthigh("中中挺").getHigh()));
            } else if ("下中挺".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("下中挺").getHigh()));
                emp.setPreHight(new Double(variablesMapper.selecthigh("下中挺").getHigh()));
            } else if ("小中档".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("小中挡").getHigh()));
                emp.setPreHight(new Double(variablesMapper.selecthigh("小中挡").getHigh()));
            } else if ("小中挺".equals(emp.getPartName())) {
                emp.setHigh(new Double(variablesMapper.selecthigh("小中挺").getHigh()));
                emp.setPreHight(new Double(variablesMapper.selecthigh("小中挺").getHigh()));
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
            emp.setPreSize(emp.getPreLenght() + "*" + emp.getPreWidth() + "*" + emp.getPreHight());
            emp.setSize(emp.getLength() + "*" + emp.getWidth() + "*" + emp.getHigh());
        }

        return maincase;
    }

    private List<Emp> casenormal(CaseDto caseDto, Numbyser numbyser) {
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
        // 所有部件的List
        List<Emp> emps = new ArrayList<>();
        Emp emp = new Emp();
        emp.setPartName("边框");
        // 计算边框长
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
        // 计算边框宽
        emp.setWidth(bkweight);
        emp.setPreWidth(bkweight);
        // 计算边框高
        Double bkhigh = new Double(40);
        emp.setHigh(bkhigh);
        // 计算边框数量(根)
        Double bknumsGen = new Double(0);
        bknumsGen = (doornums * 2);
        emp.setNumbyGens(bknumsGen);
        // 计算边框数量(个)
        Double binumsGe = bknumsGen;
        emp.setNumbyGe(binumsGe);
        // 计算边框数量(张)
        Double bknumsZhuang = new Double(0);
        bknumsZhuang = (2 * doornums / ((int) (1220 / (bkweight + 5))));
        emp.setNumbyZhuang(bknumsZhuang);
        emp.setYuliaoLen(new Double(0));
        emp.setYuliaoWidth(new Double(0));
        emps.add(emp);
        // 计算上帽长
        Emp emp1 = new Emp();
        emp1.setPartName("上帽");
        Double smlength = new Double(0);
        smlength = (doorweight - 2 * bkweight + 2 * zxWeight);
        emp1.setLength(smlength);
        // 计算上帽宽(含造型)
        Double smweights = smWeight;
        emp1.setWidth(smweights);
        emp1.setPreWidth(smweights);
        // 计算上帽数量(个)
        Double smnumsGe = doornums;
        emp1.setNumbyGe(smnumsGe);
        // 计算上帽数量(根)
        Double smnumsGen = new Double(0);
        smnumsGen = (doornums / ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5))));
        emp1.setNumbyGens(smnumsGen);
        // 计算上帽数量(张)
        Double smnumsZhuang = new Double(0);
        smnumsZhuang = (smnumsGen / (int) (1220 / (smWeight + 5)));
        emp1.setNumbyZhuang(smnumsZhuang);
        // 计算上帽余料宽
        Double smyuliaokuan = new Double(0);
        double c = ((1220 / (smWeight + 5)) - (int) (1220 / (smWeight + 5))) * (smWeight + 5);
        smyuliaokuan = c;
        emp1.setYuliaoWidth(smyuliaokuan);
        // 计算上帽余料长
        Double preLenght = preLength((int) (2440/(doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) + 50);
        emp1.setPreLenght(preLenght);
        emp1.setYuliaoLen(2440 - preLenght);
        emps.add(emp1);
        Emp emp2 = new Emp();
        emp2.setPartName("下帽");
        // 计算下帽长
        Double xmlength = smlength;
        emp2.setLength(xmlength);
        // 计算下帽宽
        Double xmwidth = xmWeight;
        emp2.setWidth(xmwidth);
        emp2.setPreWidth(xmwidth);
        // 计算下帽数量(个)
        Double xmnumsGe = doornums;
        emp2.setNumbyGe(xmnumsGe);
        // 计算下帽数量(根)
        Double xmnumsGen = new Double(0);
        Double f = doornums / ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)));
        xmnumsGen = f;
        emp2.setNumbyGens(xmnumsGen);
        // 计算下帽数量(张)
        Double xmnumsZhuang = new Double(0);
        double h = f / (int) (1220 / (xmWeight + 5));
        xmnumsZhuang = h;
        emp2.setNumbyZhuang(xmnumsZhuang);
        // 计算下帽余料长
        preLenght = preLength((int) (2440/(doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) + 50);
        emp2.setPreLenght(preLenght);
        emp2.setYuliaoLen(2440 - preLenght);
        // 计算下帽余料宽
        Double xmyuliaokuan = new Double(0);
        Double m = ((1220 / (xmWeight + 5)) - (int) (1220 / (xmWeight + 5))) * (xmWeight + 5);
        xmyuliaokuan = m;
        emp2.setYuliaoWidth(xmyuliaokuan);
        emps.add(emp2);
        Emp emp3 = new Emp();
        emp3.setPartName("中档");
        // 计算中档长
        Double zdlength = xmlength;
        emp3.setLength(zdlength);
        // 计算中档宽
        Double zdwidth = zdWeight;
        emp3.setWidth(zdwidth);
        emp3.setPreWidth(zdwidth);
        // 计算中档数量(个),(根),(张)
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
        // 计算中档余料长
        preLenght = preLength((int) (2440/(doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) + 50);
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

    private CaseDoubles change(CaseDto caseDto) {
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

    /**
     * 一类 无中档无中挺，只含有芯板/玻璃
     *
     * @param caseDto
     * @param numbyser
     * @param empList
     * @return
     */
    private List<Emp> case1(CaseDto caseDto, Numbyser numbyser, List<Emp> empList) {
        Double zxbnums = 0.0;
        //增加中芯板判断
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
        // 计算中芯板长
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
        // 计算中芯板数量
        Double zxbnumspian = new Double(0);
        int N = 0;
        if (caseDto.getPlaThick().compareTo(new BigDecimal(15)) == 0) {
            N = 1;
        } else if (caseDto.getPlaThick().compareTo(new BigDecimal(8)) == 0) {
            N = 2;
        }
        if (caseDto.getDoornums() != null) {
            zxbnumspian = (caseDto.getDoornums().doubleValue() * N * zxbnums);
        }
        Emp emp = new Emp();
        emp.setPartName("中芯板");
        emp.setLength(zxblength);
        emp.setPreLenght(zxblength);
        emp.setWidth(zxbwidth);
        emp.setPreWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            emps.add(emp);
        }
        return emps;
    }

    /**
     * 二类 1中档无中挺，只含有中下芯板/玻璃
     *
     * @param caseDto
     * @param numbyser
     * @param empList
     * @return
     */
    private List<Emp> case2(CaseDto caseDto, Numbyser numbyser, List<Emp> empList) {
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
            //doorHigh-smweight-xmweight-zdweight-xxHigh+4*zxWeight
            zxblength = (doorhigh - smweight - xmweight + 4 * xbDepth - zdweight - xxhigh);
            xxblength = xxhigh;
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
        if (caseDto.getPlaThick().compareTo(new BigDecimal(15)) == 0) {
            N = 1;
        } else if (caseDto.getPlaThick().compareTo(new BigDecimal(8)) == 0) {
            N = 2;
        }
        if (caseDto.getDoornums() != null) {
            zxbnumspian = (caseDto.getDoornums().doubleValue() * N * zxbnums);
            xxbnumspian = (caseDto.getDoornums().doubleValue() * N * xxbnums);

        }
        Emp emp = new Emp();
        emp.setPartName("中芯板");
        emp.setLength(zxblength);
        emp.setPreLenght(zxblength);
        emp.setWidth(zxbwidth);
        emp.setPreWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setPartName("下芯板");
        emp1.setLength(xxblength);
        emp1.setPreLenght(xxblength);
        emp1.setWidth(xxbwidth);
        emp1.setPreWidth(xxbwidth);
        emp1.setNumbyZhuang(xxbnumspian);
        if (flagxxb) {
            empList.add(emp1);
        }
        return empList;
    }


    /**
     * 三类 2中档无中挺，含上中下芯板/玻璃
     *
     * @param caseDto
     * @param numbyser
     * @param empList
     * @param caseDoubles
     * @return
     */
    private List<Emp> case3(CaseDto caseDto, Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        Double zxbnums = new Double(0);
        Double xxbnums = new Double(0);
        Double sxbnums = new Double(0);
        // 增加对上、中、下芯板的判断
        Boolean flagsxb = false;
        Boolean flagzxb = false;
        Boolean flagxxb = false;
        if (!StringUtils.isEmpty(numbyser.getSxbnums())) {
            sxbnums = Double.valueOf(numbyser.getSxbnums());
            flagsxb = true;
        }
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        if (!StringUtils.isEmpty(numbyser.getXzdnums())) {
            xxbnums = Double.valueOf(numbyser.getXxbnums());
            flagxxb = true;
        }
        // 计算上、中、下芯板长
        Double sxblength = new Double(0);
        sxblength = (caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - 2 * caseDoubles.getZdWeight() - caseDoubles.getZxHigh() - caseDoubles.getXxHigh() + 6 * caseDoubles.getXbDepth());
        Double zxblength = new Double(0);
        if (caseDto.getZxHigh() != null) {
            zxblength = caseDto.getZxHigh().doubleValue();
        }
        Double xxblength = new Double(0);
        if (caseDto.getXxHigh() != null) {
            xxblength = caseDto.getXxHigh().doubleValue();
        }
        // 计算上、中、下芯板宽
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
        //  计算上、中、下芯板数量（片）
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
        emp.setPreLenght(zxblength);
        emp.setWidth(zxbwidth);
        emp.setPreWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setPartName("下芯板");
        emp1.setLength(xxblength);
        emp1.setPreLenght(xxblength);
        emp1.setWidth(xxbwidth);
        emp1.setPreWidth(xxbwidth);
        emp1.setNumbyZhuang(xxbnumspian);
        if (flagxxb) {
            empList.add(emp1);
        }
        Emp emp2 = new Emp();
        emp2.setPartName("上芯板");
        emp2.setLength(sxblength);
        emp2.setPreLenght(sxblength);
        emp2.setWidth(sxbwidth);
        emp2.setPreWidth(sxbwidth);
        emp2.setNumbyZhuang(sxbnumspian);
        if (flagsxb) {
            empList.add(emp2);
        }
        return empList;
    }

    /**
     * 四类 3中档无中挺，4*中芯板均分
     *
     * @param numbyser
     * @param empList
     * @param caseDoubles
     * @return
     */
    private List<Emp> case4(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
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
        emp.setPreLenght(zxblength);
        emp.setWidth(zxbwidth);
        emp.setPreWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        return empList;
    }


    /**
     * 五类 2中档无中挺，3*中芯板/玻璃均分
     *
     * @param numbyser
     * @param empList
     * @param caseDoubles
     * @return
     */
    private List<Emp> case5(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
        boolean flagzxb = false;
        double zxbnums = 0.0;
        if (!StringUtils.isEmpty(numbyser.getZxbnums())) {
            zxbnums = Double.valueOf(numbyser.getZxbnums());
            flagzxb = true;
        }
        //中芯板长
        Double zxblength = new Double(0);
        zxblength = (caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight()) / 3 + 2 * caseDoubles.getXbDepth();

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
        emp.setPreLenght(zxblength);
        emp.setWidth(zxbwidth);
        emp.setPreWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        return empList;
    }

    /**
     * 六类 1中档1中挺，含中、下芯板
     *
     * @param numbyser
     * @param empList
     * @param caseDoubles
     * @return
     */
    private List<Emp> case6(Numbyser numbyser, List<Emp> empList, CaseDoubles caseDoubles) {
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
        // 中中挺
        boolean flagzzt = false;
        if (!StringUtils.isEmpty(numbyser.getZztnums())) {
            zztnums = Double.valueOf(numbyser.getZztnums());
            flagzzt = true;
        }
        // 下中挺
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
        // 计算方法：(doorweight-2*bkweight-zztWeight）/2+2*xbDepth
        xxbwidth = (caseDoubles.getDoorweight() - 2 * caseDoubles.getBkweight() - caseDoubles.getZztWeight()) / 2 + 2 * caseDoubles.getXbDepth();
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
        emp.setPreLenght(zxblength);
        emp.setWidth(zxbwidth);
        emp.setPreWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            empList.add(emp);
        }
        Emp emp1 = new Emp();
        emp1.setPartName("下芯板");
        emp1.setLength(xxblength);
        emp1.setPreLenght(xxblength);
        emp1.setWidth(xxbwidth);
        emp1.setPreWidth(xxbwidth);
        emp1.setNumbyZhuang(xxbnumspian);
        if (flagxxb) {
            empList.add(emp1);
        }
        //中中挺长 doorHigh-smWeight-xmWeight-xxHigh-zdWeight+4*zxWeight
        Double zztlenth = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getZdWeight() + 4 * caseDoubles.getZxWeight();
        //中中挺宽
        Double zztwidth = caseDoubles.getZztWeight();
        //中中挺数量（个）
        Double zztnumsge = caseDoubles.getDoornums() * zztnums;
        //中中挺数量（根）
        Double zztnumsGen = Double.valueOf(zztnumsge) / (int) (2440 / (Double.valueOf(zztlenth) + 4 + 5));
        //中中挺数量（张）
        Double zztnumsZhuang = Double.valueOf(zztnumsGen) / (int) (1220 / (caseDoubles.getZztWeight() + 5));
        // 中中挺余料长
//        Double zztYuliaoLen = caseYuliaoLenth(Double.valueOf(zztlenth));
        //zztblHigh=(INT)2440/(doorHigh-smWeight-xmWeight-xxHigh-zdWeight+4*zxWeight +4+5))* (doorHigh-smWeight-xmWeight-xxHigh-zdWeight+4*zxWeight +4+5)+50
        Double preLength = preLength((int) (2440 / (caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getZdWeight() + 4 * caseDoubles.getZxWeight()) )*
                (caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getXzdWeight() + 4 * caseDoubles.getZxWeight() + 4 + 5) + 50);
        //中中挺余料宽
        Double zztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(zztwidth));
        Emp emp2 = new Emp();
        emp2.setPartName("中中挺");
        emp2.setLength(zztlenth);
        emp2.setPreLenght(preLength);
        emp2.setWidth(zztwidth);
        emp2.setPreWidth(zztwidth);
        emp2.setNumbyGe(zztnumsge);
        emp2.setNumbyGens(zztnumsGen);
        emp2.setNumbyZhuang(zztnumsZhuang);
        emp2.setYuliaoLen(2440 - preLength);
        emp2.setYuliaoWidth(zztYuLiaoWidth);
        if (flagzzt) {
            empList.add(emp2);
        }
        // 下中挺长
        Double xztLength = caseDoubles.getXzthigh();
        // 下中挺宽
        Double xztwidth = caseDoubles.getXztWeight();
        // 下中梃数量 (个) doornums*下中梃部件数量
        Double xztnumsge = caseDoubles.getDoornums() * xztnums;
        // 下中梃数量(根) doornums*中中梃部件数量/((INT)2440/( doorHigh-smWeight-xmWeight-xxHigh-zdWeight+4*zxWeight +4+5))
        Double xztnumsGen = Double.valueOf(xztnumsge) / (int) (2440 / (caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getZdWeight() + 4 * caseDoubles.getZxWeight() + 4 + 5));
        //下中挺数量（张） 下中梃根数/(INT)(1220/(zztWeight+5))
        Double xztnumsZhuang = Double.valueOf(xztnumsGen) / (int) (1220 / (caseDoubles.getZztWeight() + 5));
        //  (doorHigh-smWeight-xmWeight-xxHigh-zdWeight+4*zxWeight +4+5)
        Double mid = caseDoubles.getDoorhigh() - caseDoubles.getSmWeight() - caseDoubles.getXmWeight() - caseDoubles.getXxHigh() - caseDoubles.getZdWeight() + 4 * caseDoubles.getZxWeight();
        // 下中挺余料长
//        Double xztYuliaoLen = caseYuliaoLenth(Double.valueOf(mid));
        //xztblHigh=(INT)2440/(xztHigh+4+5))*( xztHigh+4+5)+50
        preLength = preLength((int) (2440 / (xztLength + 4 + 5)) * (xztLength + 4 + 5) + 50);
        // 下中挺余料宽
        Double xztYuLiaoWidth = caseYuliaoKuan(Double.valueOf(xztwidth));
        Emp emp3 = new Emp();
        emp3.setPartName("下中挺");
        emp3.setLength(xztLength);
        emp3.setPreLenght(preLength);
        emp3.setWidth(xztwidth);
        emp3.setPreWidth(xztwidth);
        emp3.setNumbyGe(xztnumsge);
        emp3.setNumbyGens(xztnumsGen);
        emp3.setNumbyZhuang(xztnumsZhuang);
        emp3.setYuliaoLen(2440 - preLength);
        emp.setYuliaoWidth(xztYuLiaoWidth);
        if (flagxzt) {
            empList.add(emp3);
        }
        return empList;
    }


    /**
     * 中中挺余料长x
     *
     * @param c
     * @return
     */
    private Double caseYuliaoLenth(double c) {
        Double yuliaolenth = new Double(0);
        //13.计算上帽余料长
        double length = (2440 / (c + 4 + 5) - ((int) (2440 / (c + 4 + 5)))) * (c + 4 + 5);
        yuliaolenth = length;
        return yuliaolenth;
    }

    /**
     * 中中挺余料宽
     *
     * @param a
     * @return
     */
    private Double caseYuliaoKuan(double a) {
        Double yuliaowidth = new Double(0);
        double c = ((1220 / (a + 5)) - (int) (1220 / (a + 5))) * (a + 5);
        yuliaowidth = c;
        return yuliaowidth;
    }


    //      若2100>bjHigh时，bjHigh=2100；
    //        若2100≤bjHigh＜2150时，bjHigh=2150；
    //        若2150≤bjHigh＜2200时，bjHigh=2200；
    //        若2200≤bjHigh＜2250时，bjHigh=2250；
    //        若2250≤bjHigh＜2300时，bjHigh=2300；
    //        若2300≤bjHigh时，bjHigh=2440；
    private Double preLength(Double length) {
        if (length.compareTo(new Double(2100)) < 0) {
            length = new Double(2100);
        } else if (length.compareTo(new Double(2150)) >= 0 && length.compareTo(new Double(2200)) < 0) {
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
