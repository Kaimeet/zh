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
public class DataXhServiceImpl implements DataXhService {

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
        // 计算边框宽
        emp.setWidth(bkweight);
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
        Double smyuliaochang = new Double(0);
        double d = (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) - ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)))) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5);
        smyuliaochang = d;
        emp1.setYuliaoLen(smyuliaochang);
        emps.add(emp1);
        Emp emp2 = new Emp();
        emp2.setPartName("下帽");
        // 计算下帽长
        Double xmlength = smlength;
        emp2.setLength(xmlength);
        // 计算下帽宽
        Double xmwidth = xmWeight;
        emp2.setWidth(xmwidth);
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
        Double xmyuliaochang = new Double(0);
        Double i = (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5) - ((int) (2440 / (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5)))) * (doorweight - 2 * bkweight + 2 * zxWeight + 4 + 5);
        xmyuliaochang = i;
        emp2.setYuliaoLen(xmyuliaochang);
        // 计算下帽余料宽
        Double xmyuliaokuan = new Double(0);
        Double m = ((1220 / (xmWeight + 5)) - (int) (1220 / (xmWeight + 5))) * (xmWeight + 5);
        xmyuliaokuan = m;
        emp2.setYuliaoWidth(xmyuliaokuan);
        emps.add(emp2);
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
        emp.setWidth(zxbwidth);
        emp.setNumbyZhuang(zxbnumspian);
        if (flagzxb) {
            emps.add(emp);
        }
        return emps;
    }
}
