package com.pzm.zh.service;

import com.pzm.zh.dao.NumbyserMapper;
import com.pzm.zh.entity.CaseDoubles;
import com.pzm.zh.entity.CaseDto;
import com.pzm.zh.entity.Numbyser;
import com.pzm.zh.entity.ResultDto;
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
public class KunHeServiceImpl implements KunHeService {
    @Resource
    NumbyserMapper numbyserMapper;
    @Override
    public Dto<List<ResultDto>> maincase(CaseDto caseDto) {
        System.out.println(caseDto.getSerizesId()+"idddddddd");
        //1.提取出该部件的每种部件数量
        Numbyser numbyser=numbyserMapper.selectByPrimaryKey(caseDto.getSerizesId());
        System.out.println(numbyser+"numbyser值为**************************");
        //2.计算普通部件值
        List<ResultDto>resultDtos=casenormal(caseDto,numbyser);
        CaseDoubles caseDoubles=change(caseDto);
        if("1".equals(caseDto.getCaseires())){
            return case1(caseDto,numbyser,resultDtos);
        }else if("2".equals(caseDto.getCaseires())){
            return case2(caseDto,numbyser,resultDtos);
        }else if("3".equals(caseDto.getCaseires())){
            return case3(caseDto,numbyser,resultDtos,caseDoubles);
        }else if("4".equals(caseDto.getCaseires())){
            return case4(numbyser,resultDtos,caseDoubles);
        }else if("5".equals(caseDto.getCaseires())){
            return case5(numbyser,resultDtos,caseDoubles);
        }else if("6".equals(caseDto.getCaseires())){
            return case6(numbyser,resultDtos,caseDoubles);
        }else if("7".equals(caseDto.getCaseires())){
            return case7(numbyser,resultDtos,caseDoubles);
        }else if("8".equals(caseDto.getCaseires())){
            return case8(numbyser,resultDtos,caseDoubles);
        }else if("9".equals(caseDto.getCaseires())){
            return case9(numbyser,resultDtos,caseDoubles);
        }else if("10".equals(caseDto.getCaseires())){
            return case10(numbyser,resultDtos,caseDoubles);
        }else if("11".equals(caseDto.getCaseires())){
            return case11(numbyser,resultDtos,caseDoubles);
        }
        return null;
    }
    public CaseDoubles change(CaseDto caseDto){
        CaseDoubles caseDoubles=new CaseDoubles();
        if(caseDto.getDoorhigh()!=null){
            caseDoubles.setDoorhigh(caseDto.getDoorhigh().doubleValue());
        }
        if(caseDto.getDoorweight()!=null){
            caseDoubles.setDoorweight(caseDto.getDoorweight().doubleValue());
        }
        if(caseDto.getDoornums()!=null){
            caseDoubles.setDoornums(caseDto.getDoornums().doubleValue());
        }
        if(caseDto.getZtweight()!=null){
            caseDoubles.setZtweight(caseDto.getZtweight().doubleValue());
        }
        if(caseDto.getPlaThick()!=null){
            caseDoubles.setPlaThick(caseDto.getPlaThick().doubleValue());
        }
        if(caseDto.getSztweight()!=null){
            caseDoubles.setSztweight(caseDto.getSztweight().doubleValue());
        }
        if(caseDto.getBkweight()!=null){
            caseDoubles.setBkweight(caseDto.getBkweight().doubleValue());
        }
        if(caseDto.getSxHigh()!=null){
            caseDoubles.setSxHigh(caseDto.getSxHigh().doubleValue());
        }
        if(caseDto.getZxHigh()!=null){
            caseDoubles.setZxHigh(caseDto.getZxHigh().doubleValue());
        }
        if(caseDto.getXxHigh()!=null){
            caseDoubles.setXxHigh(caseDto.getXxHigh().doubleValue());
        }
        if(caseDto.getZdWeight()!=null){
            caseDoubles.setZdWeight(caseDto.getZdWeight().doubleValue());
        }
        if(caseDto.getXbDepth()!=null){
            caseDoubles.setXbDepth(caseDto.getXbDepth().doubleValue());
        }
        if(caseDto.getZxWeight()!=null){
            caseDoubles.setZxWeight(caseDto.getZxWeight().doubleValue());
        }
        if(caseDto.getSmWeight()!=null){
            caseDoubles.setSmWeight(caseDto.getSmWeight().doubleValue());
        }
        if(caseDto.getXmWeight()!=null){
            caseDoubles.setXmWeight(caseDto.getXmWeight().doubleValue());
        }
        if(caseDto.getGlassDepth()!=null){
            caseDoubles.setGlassDepth(caseDto.getGlassDepth().doubleValue());
        }
        if(caseDto.getZztWeight()!=null){
            caseDoubles.setZztWeight(caseDto.getZztWeight().doubleValue());
        }
        if(caseDto.getXztWeight()!=null){
            caseDoubles.setXztWeight(caseDto.getXztWeight().doubleValue());
        }
        if(!StringUtils.isEmpty(caseDto.getMemo1())){
            caseDoubles.setSzthigh(Double.valueOf(caseDto.getMemo1()));
        }
        if(!StringUtils.isEmpty(caseDto.getMemo2())){
            caseDoubles.setZzthigh(Double.valueOf(caseDto.getMemo2()));
        }
        if(!StringUtils.isEmpty(caseDto.getMemo3())){
            caseDoubles.setXzthigh(Double.valueOf(caseDto.getMemo3()));
        }
        if(!StringUtils.isEmpty(caseDto.getMemo4())){
            caseDoubles.setXzdWeight(Double.valueOf(caseDto.getMemo4()));
        }
        if(!StringUtils.isEmpty(caseDto.getMemo5())){
            caseDoubles.setSmztWeight(Double.valueOf(caseDto.getMemo5()));
        }
        return caseDoubles;
    }
    private String caseYuliaoLenth(double c){
        String yuliaolenth="";
        //13.计算上帽余料长
        double length=(2440/(c+4+5)-((int)(2440/(c+4+5))))* (c+4+5);
        yuliaolenth=length+"";
        return  yuliaolenth;
    }

    private String caseYuliaoKuan(double a){
        String yuliaowidth="";
        double c=((1220/(a+5))-(int)(1220/(a+5)))* (a+5);
        yuliaowidth=c+"";
        return yuliaowidth;
    }
    /**
     * 1.计算边框
     * 2.计算上帽
     * 3.计算下帽
     * 4.计算中档
     * @param caseDto
     * @param numbyser
     * @return
     */
    public List<ResultDto>casenormal(CaseDto caseDto, Numbyser numbyser){
        /**
         * 将caseDto Decimal变量转换为double 或 int 型单独表示。
         */
        Double doorhigh=0.0;
        if(caseDto.getDoorhigh()!=null){
            doorhigh=caseDto.getDoorhigh().doubleValue();
        }
        Double doorweight=0.0;
        if(caseDto.getDoorweight()!=null){
            doorweight=caseDto.getDoorweight().doubleValue();
        }
        double doornums=0;
        if(caseDto.getDoornums()!=null){
            doornums=caseDto.getDoornums();
        }
        double ztweight=0;
        if(caseDto.getZztWeight()!=null){
            ztweight=caseDto.getZztWeight().doubleValue();
        }
        double plathick=0;
        if(caseDto.getPlaThick()!=null){
            plathick=caseDto.getPlaThick().doubleValue();
        }
        double bkweight=0;
        if(caseDto.getBkweight()!=null){
            bkweight=caseDto.getBkweight().doubleValue();
        }
        double sxHigh=0;
        if(caseDto.getSxHigh()!=null){
            sxHigh=caseDto.getSxHigh().doubleValue();
        }
        double zxHigh=0;
        if(caseDto.getZxHigh()!=null){
            zxHigh=caseDto.getZxHigh().doubleValue();
        }
        double xxHigh=0;
        if(caseDto.getXxHigh()!=null){
            xxHigh=caseDto.getXxHigh().doubleValue();
        }
        double zdWeight=0;
        if(caseDto.getZdWeight()!=null){
            zdWeight=caseDto.getZdWeight().doubleValue();
        }
        double xbDepth=0;
        if(caseDto.getXbDepth()!=null){
            xbDepth=caseDto.getXbDepth().doubleValue();
        }
        double zxWeight=0;
        if(caseDto.getZxWeight()!=null){
            zxWeight=caseDto.getZxWeight().doubleValue();
        }
        double smWeight=0;
        if(caseDto.getSmWeight()!=null){
            smWeight=caseDto.getSmWeight().doubleValue();
        }
        double xmWeight=0;
        if(caseDto.getXmWeight()!=null){
            xmWeight=caseDto.getXmWeight().doubleValue();
        }
        double glassDepth=0;
        if(caseDto.getGlassDepth()!=null){
            glassDepth=caseDto.getGlassDepth().doubleValue();
        }
        double xzthigh=0;
        if(!StringUtils.isEmpty(caseDto.getMemo1())){
            xzthigh=Double.valueOf(caseDto.getMemo1());
        }
        List<ResultDto>resultDtos=new ArrayList<>();
        ResultDto resultDtobk=new ResultDto();
        resultDtobk.setPartName("边框");
        //1.计算边框长
        String biankuanglength="";
        if (doorhigh < 2080) {
            biankuanglength = "2100";
        } else if (doorhigh <= 2230) {
            biankuanglength = "2250";
        } else {
            biankuanglength = "2440";
        }

        resultDtobk.setLength(biankuanglength);
        //2.计算边框宽
        resultDtobk.setWidth(String.valueOf(bkweight));
        //3.计算边框高
        String bkhigh="40";
        resultDtobk.setHigh(bkhigh);
        //4.计算边框数量（根）
        String bknumsGen="";
        bknumsGen=(doornums*2)+"";
        resultDtobk.setNumbyGens(bknumsGen);
        //5.计算边框数量（个）
        String binumsGe= bknumsGen;
        resultDtobk.setNumbyGe(binumsGe);
        //6.计算边框数量（张）
        String bknumsZhuang="";
        bknumsZhuang=(2*doornums/((int)(1220/(bkweight+5)))) +"";
        resultDtobk.setNumbyZhuang(bknumsZhuang);
        resultDtos.add(resultDtobk);
        //7.计算上帽长
        ResultDto resultDtosm=new ResultDto();
        resultDtosm.setPartName("上帽");
        String smlength="";
        smlength=(doorweight-2*bkweight+2*zxWeight)+"";
        resultDtosm.setLength(smlength);
        //8.计算上帽宽（含造型）
        String smweights=String.valueOf(smWeight);
        resultDtosm.setWidth(smweights);
        //9.计算上帽数量（个）
        String smnumsGe=String.valueOf(doornums);
        resultDtosm.setNumbyGe(smnumsGe);
        //10.计算上帽数量（根）
        String smnumsGen="";
        smnumsGen=(doornums/((int)(2440/(doorweight-2*bkweight+2*zxWeight+4+5))))+"";
        resultDtosm.setNumbyGens(smnumsGen);
        //11.计算上帽数量（张）
        String smnumsZhuang="";
        smnumsZhuang=(Double.valueOf(smnumsGen)/(int)(1220/(smWeight+5)))+"";
        resultDtosm.setNumbyZhuang(smnumsZhuang);
        //12.计算上帽余料宽
        String smyuliaokuan="";
        double c=((1220/(smWeight+5))-(int)(1220/(smWeight+5)))* (smWeight+5);
        smyuliaokuan=c+"";
        resultDtosm.setYuliaoWidth(smyuliaokuan);
        //13.计算上帽余料长
        String smyuliaochang="";
        double d=(2440/(doorweight-2*bkweight+2*zxWeight+4+5)-((int)(2440/(doorweight-2*bkweight+2*zxWeight+4+5))))* (doorweight-2*bkweight+2*zxWeight+4+5);
        smyuliaochang=d+"";
        resultDtosm.setYuliaoLen(smyuliaochang);
        resultDtos.add(resultDtosm);
        ResultDto resultDtoxm=new ResultDto();
        resultDtoxm.setPartName("下帽");
        //14.计算下帽长
        String xmlength=smlength;
        resultDtoxm.setLength(xmlength);
        //15.计算下帽宽
        String xmwidth=String.valueOf(xmWeight);
        resultDtoxm.setWidth(xmwidth);
        //16.计算下帽数量（个）
        String xmnumsGe=String.valueOf(doornums);
        resultDtoxm.setNumbyGe(xmnumsGe);
        //17.计算下帽数量(根)
        String xmnumsGen="";
        double f=doornums/((int)(2440/(doorweight-2*bkweight+2*zxWeight+4+5)));
        xmnumsGen=f+"";
        resultDtoxm.setNumbyGens(xmnumsGen);
        //18.计算下帽数量（张）
        String xmnumsZhuang="";
        double h= f/(int)(1220/(xmWeight+5));
        xmnumsZhuang=h+"";
        resultDtoxm.setNumbyZhuang(xmnumsZhuang);
        //19.计算下帽余料长
        String xmyuliaochang="";
        double i=(2440/(doorweight-2*bkweight+2*zxWeight+4+5)-((int)(2440/(doorweight-2*bkweight+2*zxWeight+4+5))))* (doorweight-2*bkweight+2*zxWeight+4+5);
        xmyuliaochang=i+"";
        resultDtoxm.setYuliaoLen(xmyuliaochang);
        //20.计算下帽余料宽
        String xmyuliaokuan="";
        double m=((1220/(xmWeight+5))-(int)(1220/(xmWeight+5)))* (xmWeight+5);
        xmyuliaokuan=m+"";
        resultDtoxm.setYuliaoWidth(xmyuliaokuan);
        resultDtos.add(resultDtoxm);
        ResultDto resultDtozd=new ResultDto();
        resultDtozd.setPartName("中档");
        if(!StringUtils.isEmpty(numbyser.getZzdnums())){
            //21.计算中档长
            String zdlength=xmlength;
            resultDtozd.setLength(zdlength);
            //22.计算中档宽
            String zdwidth=String.valueOf(zdWeight);
            resultDtozd.setWidth(zdwidth);
            //23.计算中档数量（个），（根）,(张)
            String zdnumsGe="";
            String zdnumsGen="";
            String zdnumsZhuang="";
            String zzdnums=numbyser.getZzdnums();
            if(!StringUtils.isEmpty(zzdnums)){
                zdnumsGe= (doornums*Double.valueOf(zzdnums))+"";
                double n=(doornums/((int)(2440/(doorweight-2*bkweight+2*zxWeight+4+5))) *Double.valueOf(zzdnums));
                zdnumsGen=n+"";
                zdnumsZhuang=(n/(int)(1220/(zdWeight+5)))+"";
            }
            resultDtozd.setNumbyZhuang(zdnumsZhuang);
            resultDtozd.setNumbyGens(zdnumsGen);
            resultDtozd.setNumbyGe(zdnumsGe);
            //24.计算中档余料长
            String zdyuliaolen="";
            double t=(2440/(doorweight-2*bkweight+2*zxWeight+4+5)-((int)(2440/(doorweight-2*bkweight+2*zxWeight+4+5))))* (doorweight-2*bkweight+2*zxWeight+4+5);
            zdyuliaolen=t+"";
            resultDtozd.setYuliaoLen(zdyuliaolen);
            //25.计算中档余料宽
            String zdyuliaokuan="";
            double v=((1220/(zdWeight+5))-(int)(1220/(zdWeight+5)))* (zdWeight+5);
            zdyuliaokuan=v+"";
            resultDtozd.setYuliaoWidth(zdyuliaokuan);
            resultDtos.add(resultDtozd);
        }
        return resultDtos;
    }
    /**
     * 一类
     * 无中档无中挺，只含有芯板/玻璃
     */
    public Dto<List<ResultDto>>case1(CaseDto caseDto,Numbyser numbyser,List<ResultDto>resultDtoList1){

        Double zxbnums=0.0;
        //增加中心板判断
        boolean flagzxb=false;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            zxbnums=Double.valueOf(numbyser.getZxbnums());
            flagzxb=true;
        }
        List<ResultDto>resultDtoList=new ArrayList<>();
        for(ResultDto resultDto:resultDtoList1){
            if(!"中档".equals(resultDto.getPartName())){
                resultDtoList.add(resultDto);
            }
        }
        //1.中芯板长
        String zxblength="";
        if(caseDto.getDoorhigh()!=null&&caseDto.getSmWeight()!=null&&caseDto.getXmWeight()!=null&&caseDto.getXbDepth()!=null){
            Double doorhigh=caseDto.getDoorhigh().doubleValue();
            Double smweight=caseDto.getSmWeight().doubleValue();
            Double xmweight=caseDto.getXmWeight().doubleValue();
            Double xbDepth=caseDto.getXbDepth().doubleValue();
            zxblength=(doorhigh-smweight-xmweight +2*xbDepth)+"";
        }
        //计算中芯板宽
        String zxbwidth="";
        if(caseDto.getXbDepth()!=null&&caseDto.getDoorweight()!=null&&caseDto.getBkweight()!=null){
            double doorWeight=caseDto.getDoorweight().doubleValue();
            double bkWeight=caseDto.getBkweight().doubleValue();
            double xbDepth=caseDto.getXbDepth().doubleValue();
            zxbwidth=(doorWeight-2*bkWeight+2*xbDepth)+"";
        }
        String zxbnumspian="";
        int N=0;
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(15))==0){
            N=1;
        }else{
            N=2;
        }
        if(caseDto.getDoornums()!=null){
            zxbnumspian=(caseDto.getDoornums().doubleValue()*N*zxbnums)+"";
        }
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setLength(zxblength);
        resultDtozxb.setWidth(zxbwidth);
        resultDtozxb.setNumbyZhuang(zxbnumspian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }

    /**
     * 二类
     * 1中档无中挺，只含有中下芯板/玻璃
     */
    public Dto<List<ResultDto>>case2(CaseDto caseDto,Numbyser numbyser,List<ResultDto>resultDtoList){

        Double zxbnums=0.0;
        Double xxbnums=0.0;
        //增加中心板判断
        boolean flagzxb=false;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            zxbnums=Double.valueOf(numbyser.getZxbnums());
            flagzxb=true;
        }
        boolean flagxxb=false;
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            xxbnums=Double.valueOf(numbyser.getXxbnums());
            flagxxb=true;
        }
//        List<ResultDto>resultDtoList=new ArrayList<>();
//        for(ResultDto resultDto:resultDtoList1){
//            if(!"中档".equals(resultDto.getPartName())){
//                resultDtoList.add(resultDto);
//            }
//        }
        //1.中、下芯板长
        String zxblength="";
        String xxblength="";
        if(caseDto.getDoorhigh()!=null&&caseDto.getSmWeight()!=null&&caseDto.getXmWeight()!=null&&caseDto.getXbDepth()!=null){
            Double doorhigh=caseDto.getDoorhigh().doubleValue();
            Double smweight=caseDto.getSmWeight().doubleValue();
            Double xmweight=caseDto.getXmWeight().doubleValue();
            Double xbDepth=caseDto.getXbDepth().doubleValue();
            zxblength=(doorhigh-smweight-xmweight +2*xbDepth)+"";
            xxblength=(460+2*xbDepth)+"";
        }
        //计算中、下芯板宽
        String zxbwidth="";
        String xxbwidth="";
        if(caseDto.getXbDepth()!=null&&caseDto.getDoorweight()!=null&&caseDto.getBkweight()!=null){
            double doorWeight=caseDto.getDoorweight().doubleValue();
            double bkWeight=caseDto.getBkweight().doubleValue();
            double xbDepth=caseDto.getXbDepth().doubleValue();
            zxbwidth=(doorWeight-2*bkWeight+2*xbDepth)+"";
            xxbwidth=zxbwidth;
        }
        String zxbnumspian="";
        String xxbnumspian="";
        int N=0;
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(15))==0){
            N=1;
        }else{
            N=2;
        }
        if(caseDto.getDoornums()!=null){
            zxbnumspian=(caseDto.getDoornums().doubleValue()*N*zxbnums)+"";
            xxbnumspian=(caseDto.getDoornums().doubleValue()*N*xxbnums)+"";

        }
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setLength(zxblength);
        resultDtozxb.setWidth(zxbwidth);
        resultDtozxb.setNumbyZhuang(zxbnumspian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        ResultDto resultDtoxxb=new ResultDto();
        resultDtoxxb.setPartName("下芯板");
        resultDtoxxb.setLength(xxblength);
        resultDtoxxb.setWidth(xxbwidth);
        resultDtoxxb.setNumbyZhuang(xxbnumspian);
        if(flagxxb){
            resultDtoList.add(resultDtoxxb);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }





    /**
     * 三类
     * 2中档无中挺，含有上、中、下芯板
     */
    public Dto<List<ResultDto>>case3(CaseDto caseDto,Numbyser numbyser,List<ResultDto>resultDtoList,CaseDoubles caseDoubles){

        Double zxbnums=0.0;
        Double xxbnums=0.0;
        Double sxbnums=0.0;
        boolean flagsxb=false;
        if(!StringUtils.isEmpty(numbyser.getSxbnums())){
            sxbnums=Double.valueOf(numbyser.getSxbnums());
            flagsxb=true;
        }
        //增加中心板判断
        boolean flagzxb=false;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            zxbnums=Double.valueOf(numbyser.getZxbnums());
            flagzxb=true;
        }
        boolean flagxxb=false;
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            xxbnums=Double.valueOf(numbyser.getXxbnums());
            flagxxb=true;
        }
//        List<ResultDto>resultDtoList=new ArrayList<>();
//        for(ResultDto resultDto:resultDtoList1){
//            if(!"中档".equals(resultDto.getPartName())){
//                resultDtoList.add(resultDto);
//            }
//        }
        //1.上、中、下芯板长
        String sxblength="";
        sxblength=(caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-2*caseDoubles.getZdWeight()- caseDoubles.getZxHigh() - caseDoubles.getXxHigh() +6*caseDoubles.getXbDepth())+"";
//        if(caseDto.getDoorhigh()!=null&&){
//            doorHigh-smweight-xmweight-2*zdweight- zxHigh - xxHigh +6*xbDepth
//        }
        String zxblength="";
        if(caseDto.getZxHigh()!=null){
            zxblength=caseDto.getZxHigh().toString();
        }
        String xxblength="";
        if(caseDto.getXxHigh()!=null){
            xxblength=caseDto.getXxHigh().toString();
        }
        //计算上，中、下芯板宽
        String zxbwidth="";
        String xxbwidth="";
        String sxbwidth="";
        if(caseDto.getXbDepth()!=null&&caseDto.getDoorweight()!=null&&caseDto.getBkweight()!=null){
            double doorWeight=caseDto.getDoorweight().doubleValue();
            double bkWeight=caseDto.getBkweight().doubleValue();
            double xbDepth=caseDto.getXbDepth().doubleValue();
            zxbwidth=(doorWeight-2*bkWeight+2*xbDepth)+"";
            xxbwidth=zxbwidth;
            sxbwidth=zxbwidth;
        }
        String zxbnumspian="";
        String xxbnumspian="";
        String sxbnumspian="";
        int N=0;
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(15))==0){
            N=1;
        }else{
            N=2;
        }
        if(caseDto.getDoornums()!=null){
            zxbnumspian=(caseDto.getDoornums().doubleValue()*N*zxbnums)+"";
            xxbnumspian=(caseDto.getDoornums().doubleValue()*N*xxbnums)+"";
            sxbnumspian=(caseDto.getDoornums().doubleValue()*N*sxbnums)+"";
        }
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setLength(zxblength);
        resultDtozxb.setWidth(zxbwidth);
        resultDtozxb.setNumbyZhuang(zxbnumspian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        ResultDto resultDtoxxb=new ResultDto();
        resultDtoxxb.setPartName("下芯板");
        resultDtoxxb.setLength(xxblength);
        resultDtoxxb.setWidth(xxbwidth);
        resultDtoxxb.setNumbyZhuang(xxbnumspian);
        if(flagxxb){
            resultDtoList.add(resultDtoxxb);
        }
        ResultDto resultDtosxb=new ResultDto();
        resultDtosxb.setPartName("上芯板");
        resultDtosxb.setLength(sxblength);
        resultDtosxb.setWidth(sxbwidth);
        resultDtosxb.setNumbyZhuang(sxbnumspian);
        if(flagsxb){
            resultDtoList.add(resultDtosxb);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }

/**
 * 四类 3中档无中挺，4*中芯板均分
 */

public Dto<List<ResultDto>>case4(Numbyser numbyser,List<ResultDto>resultDtoList,CaseDoubles caseDoubles){
    boolean flagzxb=false;
    double zxbnums=0.0;
    if(!StringUtils.isEmpty(numbyser.getZxbnums())){
        zxbnums=Double.valueOf(numbyser.getZxbnums());
        flagzxb=true;
    }
    //中芯板长
    String zxblength="";
    zxblength=(caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-3*caseDoubles.getZdWeight())/4+2*caseDoubles.getXbDepth()+"";

    //中芯板宽
    String zxbwidth="";
    zxbwidth=caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()+2*caseDoubles.getXbDepth()+"";

    //中芯板数量
    String zxbnumspian="";
    int N=0;
    if(caseDoubles.getPlaThick()==15){
        N=1;
    }else{
        N=2;
    }
    zxbnumspian=(caseDoubles.getDoornums()*N*zxbnums)+"";
    ResultDto resultDtozxb=new ResultDto();
    resultDtozxb.setPartName("中芯板");
    resultDtozxb.setLength(zxblength);
    resultDtozxb.setWidth(zxbwidth);
    resultDtozxb.setNumbyZhuang(zxbnumspian);
    if(flagzxb){
        resultDtoList.add(resultDtozxb);
    }
    return DtoUtil.returnDataSuccess(resultDtoList,"001");
}
    /**
     * 五类 无中档1中挺，含中芯板
     */

    public Dto<List<ResultDto>>case5(Numbyser numbyser,List<ResultDto>resultDtoList,CaseDoubles caseDoubles){
        boolean flagzxb=false;
        double zxbnums=0.0;
        double zztnums=0.0;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            zxbnums=Double.valueOf(numbyser.getZxbnums());
            flagzxb=true;
        }
        boolean flagzzt=false;
        if(!StringUtils.isEmpty(numbyser.getZztnums())){
            zztnums=Double.valueOf(numbyser.getZztnums());
            flagzzt=true;
        }
        //中芯板长
        String zxblength="";
        zxblength=caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()+2*caseDoubles.getXbDepth()+"";

        //中芯板宽
        String zxbwidth="";
        zxbwidth=(caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()-caseDoubles.getZztWeight())/2+2*caseDoubles.getXbDepth()+"";

        //中芯板数量
        String zxbnumspian="";
        int N=0;
        if(caseDoubles.getPlaThick()==15){
            N=1;
        }else{
            N=2;
        }
        zxbnumspian=(caseDoubles.getDoornums()*N*zxbnums)+"";
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setLength(zxblength);
        resultDtozxb.setWidth(zxbwidth);
        resultDtozxb.setNumbyZhuang(zxbnumspian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        //中中挺长
        String zztlenth=caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()+2*caseDoubles.getZxWeight()+"";
        //中中挺宽
        String zztwidth=String.valueOf(caseDoubles.getZztWeight());
        //中中挺数量（个）
        String zztnumsge=caseDoubles.getDoornums()*zztnums+"";
        //中中挺数量（根）
        String zztnumsGen=Double.valueOf(zztnumsge)/(int)(2440/(Double.valueOf(zztlenth)+4+5))+"";
        //中中挺数量（张）
        String zztnumsZhuang=Double.valueOf(zztnumsGen)/(int)(1220/(caseDoubles.getZztWeight()+5))+"";
        //中中挺余料长
        String zztYuliaoLen=caseYuliaoLenth(Double.valueOf(zztlenth));
        //中中挺余料宽
        String zztYuLiaoWidth=caseYuliaoKuan(Double.valueOf(zztwidth));
        ResultDto resultDtozzt=new ResultDto();
        resultDtozzt.setPartName("中中挺");
        resultDtozzt.setLength(zztlenth);
        resultDtozzt.setWidth(zztwidth);
        resultDtozzt.setNumbyGe(zztnumsge);
        resultDtozzt.setNumbyGens(zztnumsGen);
        resultDtozzt.setNumbyZhuang(zztnumsZhuang);
        resultDtozzt.setYuliaoLen(zztYuliaoLen);
        resultDtozzt.setYuliaoWidth(zztYuLiaoWidth);
        if(flagzzt){
            resultDtoList.add(resultDtozzt);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }



    /**
     * 六类 1中档1中挺，含中、下芯板
     */

    public Dto<List<ResultDto>>case6(Numbyser numbyser,List<ResultDto>resultDtoList,CaseDoubles caseDoubles){
        boolean flagzxb=false;
        boolean flagxxb=false;
        double xxbnums=0.0;
        double zxbnums=0.0;
        double zztnums=0.0;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            zxbnums=Double.valueOf(numbyser.getZxbnums());
            flagzxb=true;
        }
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            xxbnums=Double.valueOf(numbyser.getXxbnums());
            flagxxb=true;
        }
        boolean flagzzt=false;
        if(!StringUtils.isEmpty(numbyser.getZztnums())){
            zztnums=Double.valueOf(numbyser.getZztnums());
            flagzzt=true;
        }
        //中芯板长
        String zxblength="";
        zxblength=caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-caseDoubles.getXxHigh()-caseDoubles.getZdWeight()+4*caseDoubles.getXbDepth()+"";
        //下芯板长
        String xxblength="";
        xxblength=String.valueOf(caseDoubles.getXxHigh());
        //中芯板宽
        String zxbwidth="";
        zxbwidth=(caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()-caseDoubles.getZztWeight())/2+2*caseDoubles.getXbDepth()+"";
        //下芯板宽
        String xxbwidth="";
        xxbwidth=caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()+2*caseDoubles.getXbDepth()+"";
        //中、下芯板数量
        String zxbnumspian="";
        String xxbnumspian="";
        int N=0;
        if(caseDoubles.getPlaThick()==15){
            N=1;
        }else{
            N=2;
        }
        zxbnumspian=(caseDoubles.getDoornums()*N*zxbnums)+"";
        xxbnumspian=(caseDoubles.getDoornums()*N*xxbnums)+"";
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setLength(zxblength);
        resultDtozxb.setWidth(zxbwidth);
        resultDtozxb.setNumbyZhuang(zxbnumspian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        ResultDto resultDtoxxb=new ResultDto();
        resultDtoxxb.setPartName("下芯板");
        resultDtoxxb.setLength(xxblength);
        resultDtoxxb.setWidth(xxbwidth);
        resultDtoxxb.setNumbyZhuang(xxbnumspian);
        if(flagxxb){
            resultDtoList.add(resultDtoxxb);
        }
        //中中挺长
        String zztlenth=caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-caseDoubles.getXxHigh()-caseDoubles.getZdWeight()+4*caseDoubles.getZxWeight()+"";
        //中中挺宽
        String zztwidth=String.valueOf(caseDoubles.getZztWeight());
        //中中挺数量（个）
        String zztnumsge=caseDoubles.getDoornums()*zztnums+"";
        //中中挺数量（根）
        String zztnumsGen=Double.valueOf(zztnumsge)/(int)(2440/(Double.valueOf(zztlenth)+4+5))+"";
        //中中挺数量（张）
        String zztnumsZhuang=Double.valueOf(zztnumsGen)/(int)(1220/(caseDoubles.getZztWeight()+5))+"";
        //中中挺余料长
        String zztYuliaoLen=caseYuliaoLenth(Double.valueOf(zztlenth));
        //中中挺余料宽
        String zztYuLiaoWidth=caseYuliaoKuan(Double.valueOf(zztwidth));
        ResultDto resultDtozzt=new ResultDto();
        resultDtozzt.setPartName("中中挺");
        resultDtozzt.setLength(zztlenth);
        resultDtozzt.setWidth(zztwidth);
        resultDtozzt.setNumbyGe(zztnumsge);
        resultDtozzt.setNumbyGens(zztnumsGen);
        resultDtozzt.setNumbyZhuang(zztnumsZhuang);
        resultDtozzt.setYuliaoLen(zztYuliaoLen);
        resultDtozzt.setYuliaoWidth(zztYuLiaoWidth);
        if(flagzzt){
            resultDtoList.add(resultDtozzt);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }


    /**
     * 七类 1中档2中挺，含中、下芯板
     */

    public Dto<List<ResultDto>>case7(Numbyser numbyser,List<ResultDto>resultDtoList,CaseDoubles caseDoubles){
        boolean flagzxb=false;
        boolean flagxxb=false;
        double xxbnums=0.0;
        double zxbnums=0.0;
        double zztnums=0.0;
        double xztnums=0.0;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            zxbnums=Double.valueOf(numbyser.getZxbnums());
            flagzxb=true;
        }
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            xxbnums=Double.valueOf(numbyser.getXxbnums());
            flagxxb=true;
        }
        boolean flagzzt=false;
        if(!StringUtils.isEmpty(numbyser.getZztnums())){
            zztnums=Double.valueOf(numbyser.getZztnums());
            flagzzt=true;
        }
        boolean flagxzt=false;
        if(!StringUtils.isEmpty(numbyser.getXztnums())){
            xztnums=Double.valueOf(numbyser.getXztnums());
            flagxzt=true;
        }
        //中芯板长
        String zxblength="";
        zxblength=caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-caseDoubles.getXxHigh()-caseDoubles.getZdWeight()+4*caseDoubles.getXbDepth()+"";
        //下芯板长
        String xxblength="";
        xxblength=String.valueOf(caseDoubles.getXxHigh());
        //中芯板宽
        String zxbwidth="";
        zxbwidth=(caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()-caseDoubles.getZztWeight())/2+2*caseDoubles.getXbDepth()+"";
        //下芯板宽
        String xxbwidth="";
        xxbwidth=(caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()-caseDoubles.getXztWeight())/2+2*caseDoubles.getXbDepth()+"";
        //中、下芯板数量
        String zxbnumspian="";
        String xxbnumspian="";
        int N=0;
        if(caseDoubles.getPlaThick()==15){
            N=1;
        }else{
            N=2;
        }
        zxbnumspian=(caseDoubles.getDoornums()*N*zxbnums)+"";
        xxbnumspian=(caseDoubles.getDoornums()*N*xxbnums)+"";
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setLength(zxblength);
        resultDtozxb.setWidth(zxbwidth);
        resultDtozxb.setNumbyZhuang(zxbnumspian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        ResultDto resultDtoxxb=new ResultDto();
        resultDtoxxb.setPartName("下芯板");
        resultDtoxxb.setLength(xxblength);
        resultDtoxxb.setWidth(xxbwidth);
        resultDtoxxb.setNumbyZhuang(xxbnumspian);
        if(flagxxb){
            resultDtoList.add(resultDtoxxb);
        }
        //中中挺长
        String zztlenth=caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-caseDoubles.getXxHigh()-caseDoubles.getZdWeight()+4*caseDoubles.getZxWeight()+"";
        //下中挺长
        String xztlenth=caseDoubles.getXzthigh()+"";
        //中中挺宽
        String zztwidth=String.valueOf(caseDoubles.getZztWeight());
        //下中挺宽
        String xztwidth=String.valueOf(caseDoubles.getXztWeight());
        //中中挺数量（个）
        String zztnumsge=caseDoubles.getDoornums()*zztnums+"";
        //下中挺数量（个）
        String xztnumsge=caseDoubles.getDoornums()*xztnums+"";
        //中中挺数量（根）
        String zztnumsGen=Double.valueOf(zztnumsge)/(int)(2440/(Double.valueOf(zztlenth)+4+5))+"";
        //下中挺数量（根）
        String xztnumsGen=Double.valueOf(xztnumsge)/(int)(2440/(Double.valueOf(xztlenth)+4+5))+"";
        //中中挺数量（张）
        String zztnumsZhuang=Double.valueOf(zztnumsGen)/(int)(1220/(caseDoubles.getZztWeight()+5))+"";
        //下中挺数量（张）
        String xztnumsZhuang=Double.valueOf(xztnumsGen)/(int)(1220/(caseDoubles.getXztWeight()+5))+"";
        //中中挺余料长
        String zztYuliaoLen=caseYuliaoLenth(Double.valueOf(zztlenth));
        //下中挺余料长
        String xztYuliaoLen=caseYuliaoLenth(Double.valueOf(xztlenth));
        //中中挺余料宽
        String zztYuLiaoWidth=caseYuliaoKuan(Double.valueOf(zztwidth));
        //下中挺余料宽
        String xztYuLiaoWidth=caseYuliaoKuan(Double.valueOf(xztwidth));
        ResultDto resultDtozzt=new ResultDto();
        resultDtozzt.setPartName("中中挺");
        resultDtozzt.setLength(zztlenth);
        resultDtozzt.setWidth(zztwidth);
        resultDtozzt.setNumbyGe(zztnumsge);
        resultDtozzt.setNumbyGens(zztnumsGen);
        resultDtozzt.setNumbyZhuang(zztnumsZhuang);
        resultDtozzt.setYuliaoLen(zztYuliaoLen);
        resultDtozzt.setYuliaoWidth(zztYuLiaoWidth);
        if(flagzzt){
            resultDtoList.add(resultDtozzt);
        }
        ResultDto resultDtoxzt=new ResultDto();
        resultDtoxzt.setPartName("下中挺");
        resultDtoxzt.setLength(xztlenth);
        resultDtoxzt.setWidth(xztwidth);
        resultDtoxzt.setNumbyGe(xztnumsge);
        resultDtoxzt.setNumbyGens(xztnumsGen);
        resultDtoxzt.setNumbyZhuang(xztnumsZhuang);
        resultDtoxzt.setYuliaoLen(xztYuliaoLen);
        resultDtoxzt.setYuliaoWidth(xztYuLiaoWidth);
        if(flagxzt){
            resultDtoList.add(resultDtoxzt);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }



    /**
     * 八类 2中档3中挺，含上、中、下芯板
     */

    public Dto<List<ResultDto>>case8(Numbyser numbyser,List<ResultDto>resultDtoList,CaseDoubles caseDoubles){
        boolean flagsxb=false;
        boolean flagzxb=false;
        boolean flagxxb=false;
        double sxbnums=0.0;
        double xxbnums=0.0;
        double zxbnums=0.0;
        double sztnums=0.0;
        double zztnums=0.0;
        double xztnums=0.0;
        if(!StringUtils.isEmpty(numbyser.getSxbnums())){
            sxbnums=Double.valueOf(numbyser.getSxbnums());
            flagsxb=true;
        }
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            zxbnums=Double.valueOf(numbyser.getZxbnums());
            flagzxb=true;
        }
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            xxbnums=Double.valueOf(numbyser.getXxbnums());
            flagxxb=true;
        }
        boolean flagszt=false;
        if(!StringUtils.isEmpty(numbyser.getSztnums())){
            sztnums=Double.valueOf(numbyser.getSztnums());
            flagszt=true;
        }
        boolean flagzzt=false;
        if(!StringUtils.isEmpty(numbyser.getZztnums())){
            zztnums=Double.valueOf(numbyser.getZztnums());
            flagzzt=true;
        }
        boolean flagxzt=false;
        if(!StringUtils.isEmpty(numbyser.getXztnums())){
            xztnums=Double.valueOf(numbyser.getXztnums());
            flagxzt=true;
        }
        //上芯板长
        String sxblength=String.valueOf(caseDoubles.getSxHigh());

        //中芯板长
        String zxblength="";
        zxblength=caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-caseDoubles.getXxHigh()-caseDoubles.getZdWeight()+4*caseDoubles.getXbDepth()+"";
        //下芯板长
        String xxblength="";
        xxblength=String.valueOf(caseDoubles.getXxHigh());
        //中芯板宽
        String zxbwidth="";
        zxbwidth=(caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()-caseDoubles.getZztWeight())/2+2*caseDoubles.getXbDepth()+"";
        //上芯板宽
        String sxbwidth=(caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()-caseDoubles.getSztweight())/2+2*caseDoubles.getXbDepth()+"";
        //下芯板宽
        String xxbwidth="";
        xxbwidth=(caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()-caseDoubles.getXztWeight())/2+2*caseDoubles.getXbDepth()+"";
        //上、中、下芯板数量
        String sxbnumspian="";
        String zxbnumspian="";
        String xxbnumspian="";
        int N=0;
        if(caseDoubles.getPlaThick()==15){
            N=1;
        }else{
            N=2;
        }
        sxbnumspian=(caseDoubles.getDoornums()*N*sxbnums)+"";
        zxbnumspian=(caseDoubles.getDoornums()*N*zxbnums)+"";
        xxbnumspian=(caseDoubles.getDoornums()*N*xxbnums)+"";
        ResultDto resultDtosxb=new ResultDto();
        resultDtosxb.setPartName("上芯板");
        resultDtosxb.setLength(sxblength);
        resultDtosxb.setWidth(sxbwidth);
        resultDtosxb.setNumbyZhuang(sxbnumspian);
        if(flagsxb){
            resultDtoList.add(resultDtosxb);
        }
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setLength(zxblength);
        resultDtozxb.setWidth(zxbwidth);
        resultDtozxb.setNumbyZhuang(zxbnumspian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        ResultDto resultDtoxxb=new ResultDto();
        resultDtoxxb.setPartName("下芯板");
        resultDtoxxb.setLength(xxblength);
        resultDtoxxb.setWidth(xxbwidth);
        resultDtoxxb.setNumbyZhuang(xxbnumspian);
        if(flagxxb){
            resultDtoList.add(resultDtoxxb);
        }
        //上中挺长
        String sztlenth=String.valueOf(caseDoubles.getSzthigh());
        //中中挺长
        String zztlenth=caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-caseDoubles.getSzthigh()-caseDoubles.getXzthigh()-2*caseDoubles.getZdWeight()+6*caseDoubles.getZxWeight()+"";
        //下中挺长
        String xztlenth=caseDoubles.getXzthigh()+"";
        //上中挺宽
        String sztwidth=String.valueOf(caseDoubles.getSztweight());
        //中中挺宽
        String zztwidth=String.valueOf(caseDoubles.getZztWeight());
        //下中挺宽
        String xztwidth=String.valueOf(caseDoubles.getXztWeight());
        //上中挺数量（个）
        String sztnumsge=caseDoubles.getDoornums()*sztnums+"";
        //中中挺数量（个）
        String zztnumsge=caseDoubles.getDoornums()*zztnums+"";
        //下中挺数量（个）
        String xztnumsge=caseDoubles.getDoornums()*xztnums+"";
        //上中挺数量（根）
        String sztnumsGen=Double.valueOf(sztnumsge)/(int)(2440/(Double.valueOf(sztlenth)+4+5))+"";
        //中中挺数量（根）
        String zztnumsGen=Double.valueOf(zztnumsge)/(int)(2440/(Double.valueOf(zztlenth)+4+5))+"";
        //下中挺数量（根）
        String xztnumsGen=Double.valueOf(xztnumsge)/(int)(2440/(Double.valueOf(xztlenth)+4+5))+"";
        //上中挺数量（张）
        String sztnumsZhuang=Double.valueOf(sztnumsGen)/(int)(1220/(caseDoubles.getSztweight()+5))+"";
        //中中挺数量（张）
        String zztnumsZhuang=Double.valueOf(zztnumsGen)/(int)(1220/(caseDoubles.getZztWeight()+5))+"";
        //下中挺数量（张）
        String xztnumsZhuang=Double.valueOf(xztnumsGen)/(int)(1220/(caseDoubles.getXztWeight()+5))+"";
        //上中挺余料长
        String sztYuliaoLen=caseYuliaoLenth(Double.valueOf(sztlenth));
        //中中挺余料长
        String zztYuliaoLen=caseYuliaoLenth(Double.valueOf(zztlenth));
        //下中挺余料长
        String xztYuliaoLen=caseYuliaoLenth(Double.valueOf(xztlenth));
        //上中挺余料宽
        String sztYuLiaoWidth=caseYuliaoKuan(Double.valueOf(sztwidth));
        //中中挺余料宽
        String zztYuLiaoWidth=caseYuliaoKuan(Double.valueOf(zztwidth));
        //下中挺余料宽
        String xztYuLiaoWidth=caseYuliaoKuan(Double.valueOf(xztwidth));
        ResultDto resultDtoszt=new ResultDto();
        resultDtoszt.setPartName("上中挺");
        resultDtoszt.setLength(sztlenth);
        resultDtoszt.setWidth(sztwidth);
        resultDtoszt.setNumbyGe(sztnumsge);
        resultDtoszt.setNumbyGens(sztnumsGen);
        resultDtoszt.setNumbyZhuang(sztnumsZhuang);
        resultDtoszt.setYuliaoLen(sztYuliaoLen);
        resultDtoszt.setYuliaoWidth(sztYuLiaoWidth);
        if(flagszt){
            resultDtoList.add(resultDtoszt);
        }
        ResultDto resultDtozzt=new ResultDto();
        resultDtozzt.setPartName("中中挺");
        resultDtozzt.setLength(zztlenth);
        resultDtozzt.setWidth(zztwidth);
        resultDtozzt.setNumbyGe(zztnumsge);
        resultDtozzt.setNumbyGens(zztnumsGen);
        resultDtozzt.setNumbyZhuang(zztnumsZhuang);
        resultDtozzt.setYuliaoLen(zztYuliaoLen);
        resultDtozzt.setYuliaoWidth(zztYuLiaoWidth);
        if(flagzzt){
            resultDtoList.add(resultDtozzt);
        }
        ResultDto resultDtoxzt=new ResultDto();
        resultDtoxzt.setPartName("下中挺");
        resultDtoxzt.setLength(xztlenth);
        resultDtoxzt.setWidth(xztwidth);
        resultDtoxzt.setNumbyGe(xztnumsge);
        resultDtoxzt.setNumbyGens(xztnumsGen);
        resultDtoxzt.setNumbyZhuang(xztnumsZhuang);
        resultDtoxzt.setYuliaoLen(xztYuliaoLen);
        resultDtoxzt.setYuliaoWidth(xztYuLiaoWidth);
        if(flagxzt){
            resultDtoList.add(resultDtoxzt);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }





    /**
     * 九类 3小中档4小中挺
     */

    public Dto<List<ResultDto>>case9(Numbyser numbyser,List<ResultDto>resultDtoList,CaseDoubles caseDoubles){
        boolean flagxzd=false;
        boolean flagsmzt=false;
        double xzdnums=0.0;
        double smztnums=0.0;
        if(!StringUtils.isEmpty(numbyser.getXzdnums())){
            xzdnums=Double.valueOf(numbyser.getXzdnums());
            flagxzd=true;
        }
        if(!StringUtils.isEmpty(numbyser.getMemo1())){
            smztnums=Double.valueOf(numbyser.getMemo1());
            flagsmzt=true;
        }
        //小中档长
        String xzdlength="";
        xzdlength=caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()+2*caseDoubles.getZxWeight()+"";
        //小中档宽
        String xzdwidth=String.valueOf(caseDoubles.getXzdWeight());
        //小中挺长
        String xztlength="";
        xztlength=(caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-3*caseDoubles.getXzdWeight())/4+2*caseDoubles.getZxWeight()+"";
        //小中挺宽
        String xztwidth="";
        xztwidth=String.valueOf(caseDoubles.getSmztWeight());
        //小中档数量（个）
        String xzdnumsge=caseDoubles.getDoornums()*xzdnums+"";
        //小中挺数量（个）
        String xztnumsge=caseDoubles.getDoornums()*smztnums+"";
        //小中档数量（根）
        String xzdnumsGen=Double.valueOf(xzdnumsge)/(int)(2440/(Double.valueOf(xzdlength)+4+5))+"";
        //小中挺数量（根）
        String xztnumsGen=Double.valueOf(xztnumsge)/(int)(2440/(Double.valueOf(xztlength)+4+5))+"";
        //小中档数量（张）
        String xzdnumsZhuang=Double.valueOf(xzdnumsGen)/(int)(1220/(Double.valueOf(xzdwidth)+5))+"";
        //小中挺数量（张）
        String xztnumsZhuang=Double.valueOf(xztnumsGen)/(int)(1220/(Double.valueOf(xztwidth)+5))+"";
        //小中档余料长
        String xzdYuliaoLen=caseYuliaoLenth(Double.valueOf(xzdlength));
        //小中挺余料长
        String xztYuliaoLen=caseYuliaoLenth(Double.valueOf(xztlength));
        //小中档余料宽
        String xzdYuLiaoWidth=caseYuliaoKuan(Double.valueOf(xzdwidth));
        //小中挺余料宽
        String xztYuLiaoWidth=caseYuliaoKuan(Double.valueOf(xztwidth));
        ResultDto resultDtoxzd=new ResultDto();
        resultDtoxzd.setPartName("小中档");
        resultDtoxzd.setLength(xzdlength);
        resultDtoxzd.setWidth(xzdwidth);
        resultDtoxzd.setNumbyGe(xzdnumsge);
        resultDtoxzd.setNumbyGens(xzdnumsGen);
        resultDtoxzd.setNumbyZhuang(xzdnumsZhuang);
        resultDtoxzd.setYuliaoLen(xzdYuliaoLen);
        resultDtoxzd.setYuliaoWidth(xzdYuLiaoWidth);
        if(flagxzd){
            resultDtoList.add(resultDtoxzd);
        }
        ResultDto resultDtoxzt =new ResultDto();
        resultDtoxzt.setPartName("小中挺");
        resultDtoxzt.setLength(xztlength);
        resultDtoxzt.setWidth(xztwidth);
        resultDtoxzt.setNumbyGe(xztnumsge);
        resultDtoxzt.setNumbyGens(xztnumsGen);
        resultDtoxzt.setNumbyZhuang(xztnumsZhuang);
        resultDtoxzt.setYuliaoLen(xztYuliaoLen);
        resultDtoxzt.setYuliaoWidth(xztYuLiaoWidth);
        if(flagsmzt){
            resultDtoList.add(resultDtoxzt);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }


    /**
     * 十类 5小中档、无中挺，
     */

    public Dto<List<ResultDto>>case10(Numbyser numbyser,List<ResultDto>resultDtoList,CaseDoubles caseDoubles){
        boolean flagxzd=false;
        double xzdnums=0.0;

        if(!StringUtils.isEmpty(numbyser.getXzdnums())){
            xzdnums=Double.valueOf(numbyser.getXzdnums());
            flagxzd=true;
        }

        //小中档长
        String xzdlength="";
        xzdlength=caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()+2*caseDoubles.getZxWeight()+"";
        //小中档宽
        String xzdwidth=String.valueOf(caseDoubles.getXzdWeight());
        //小中档数量（个）
        String xzdnumsge=caseDoubles.getDoornums()*xzdnums+"";

        //小中档数量（根）
        String xzdnumsGen=Double.valueOf(xzdnumsge)/(int)(2440/(Double.valueOf(xzdlength)+4+5))+"";

        //小中档数量（张）
        String xzdnumsZhuang=Double.valueOf(xzdnumsGen)/(int)(1220/(Double.valueOf(xzdwidth)+5))+"";

        //小中档余料长
        String xzdYuliaoLen=caseYuliaoLenth(Double.valueOf(xzdlength));

        //小中档余料宽
        String xzdYuLiaoWidth=caseYuliaoKuan(Double.valueOf(xzdwidth));

        ResultDto resultDtoxzd=new ResultDto();
        resultDtoxzd.setPartName("小中档");
        resultDtoxzd.setLength(xzdlength);
        resultDtoxzd.setWidth(xzdwidth);
        resultDtoxzd.setNumbyGe(xzdnumsge);
        resultDtoxzd.setNumbyGens(xzdnumsGen);
        resultDtoxzd.setNumbyZhuang(xzdnumsZhuang);
        resultDtoxzd.setYuliaoLen(xzdYuliaoLen);
        resultDtoxzd.setYuliaoWidth(xzdYuLiaoWidth);
        if(flagxzd){
            resultDtoList.add(resultDtoxzd);
        }

        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }





    /**
     * 十一类 1中档、2小中档、3小中挺
     */

    public Dto<List<ResultDto>>case11(Numbyser numbyser,List<ResultDto>resultDtoList,CaseDoubles caseDoubles){
        boolean flagxzd=false;
        boolean flagsmzt=false;
        boolean flagxxb=false;
        double  xxbnums=0.0;
        double xzdnums=0.0;
        double smztnums=0.0;
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            xxbnums=Double.valueOf(numbyser.getXxbnums());
            flagxxb=true;
        }
        if(!StringUtils.isEmpty(numbyser.getXzdnums())){
            xzdnums=Double.valueOf(numbyser.getXzdnums());
            flagxzd=true;
        }
        if(!StringUtils.isEmpty(numbyser.getMemo1())){
            smztnums=Double.valueOf(numbyser.getMemo1());
            flagsmzt=true;
        }
        //下芯板长
        String xxblength=String.valueOf(caseDoubles.getXxHigh());
        //下芯板宽
        String xxbwidth="";
        xxbwidth=caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()+2*caseDoubles.getXbDepth()+"";
        //下芯板数量
        int N=0;
        if(caseDoubles.getPlaThick()==15){
            N=1;
        }else{
            N=2;
        }
        String xxbnumsPian=(caseDoubles.getDoornums()*N*xxbnums)+"";
        ResultDto resultDtoxxb=new ResultDto();
        resultDtoxxb.setPartName("下芯板");
        resultDtoxxb.setLength(xxblength);
        resultDtoxxb.setWidth(xxbwidth);
        resultDtoxxb.setNumbyZhuang(xxbnumsPian);
        if(flagxxb){
            resultDtoList.add(resultDtoxxb);
        }
        //小中档长
        String xzdlength="";
        xzdlength=caseDoubles.getDoorweight()-2*caseDoubles.getBkweight()+2*caseDoubles.getZxWeight()+"";
        //小中档宽
        String xzdwidth=String.valueOf(caseDoubles.getXzdWeight());
        //小中挺长
        String xztlength="";
        xztlength=(caseDoubles.getDoorhigh()-caseDoubles.getSmWeight()-caseDoubles.getXmWeight()-caseDoubles.getZdWeight()-2*caseDoubles.getXzdWeight()-caseDoubles.getXxHigh()+2*caseDoubles.getXbDepth())/3+2*caseDoubles.getZxWeight()+"";
        //小中挺宽
        String xztwidth="";
        xztwidth=String.valueOf(caseDoubles.getSmztWeight());
        //小中档数量（个）
        String xzdnumsge=caseDoubles.getDoornums()*xzdnums+"";
        //小中挺数量（个）
        String xztnumsge=caseDoubles.getDoornums()*smztnums+"";
        //小中档数量（根）
        String xzdnumsGen=Double.valueOf(xzdnumsge)/(int)(2440/(Double.valueOf(xzdlength)+4+5))+"";
        //小中挺数量（根）
        String xztnumsGen=Double.valueOf(xztnumsge)/(int)(2440/(Double.valueOf(xztlength)+4+5))+"";
        //小中档数量（张）
        String xzdnumsZhuang=Double.valueOf(xzdnumsGen)/(int)(1220/(Double.valueOf(xzdwidth)+5))+"";
        //小中挺数量（张）
        String xztnumsZhuang=Double.valueOf(xztnumsGen)/(int)(1220/(Double.valueOf(xztwidth)+5))+"";
        //小中档余料长
        String xzdYuliaoLen=caseYuliaoLenth(Double.valueOf(xzdlength));
        //小中挺余料长
        String xztYuliaoLen=caseYuliaoLenth(Double.valueOf(xztlength));
        //小中档余料宽
        String xzdYuLiaoWidth=caseYuliaoKuan(Double.valueOf(xzdwidth));
        //小中挺余料宽
        String xztYuLiaoWidth=caseYuliaoKuan(Double.valueOf(xztwidth));
        ResultDto resultDtoxzd=new ResultDto();
        resultDtoxzd.setPartName("小中档");
        resultDtoxzd.setLength(xzdlength);
        resultDtoxzd.setWidth(xzdwidth);
        resultDtoxzd.setNumbyGe(xzdnumsge);
        resultDtoxzd.setNumbyGens(xzdnumsGen);
        resultDtoxzd.setNumbyZhuang(xzdnumsZhuang);
        resultDtoxzd.setYuliaoLen(xzdYuliaoLen);
        resultDtoxzd.setYuliaoWidth(xzdYuLiaoWidth);
        if(flagxzd){
            resultDtoList.add(resultDtoxzd);
        }
        ResultDto resultDtoxzt =new ResultDto();
        resultDtoxzt.setPartName("小中挺");
        resultDtoxzt.setLength(xztlength);
        resultDtoxzt.setWidth(xztwidth);
        resultDtoxzt.setNumbyGe(xztnumsge);
        resultDtoxzt.setNumbyGens(xztnumsGen);
        resultDtoxzt.setNumbyZhuang(xztnumsZhuang);
        resultDtoxzt.setYuliaoLen(xztYuliaoLen);
        resultDtoxzt.setYuliaoWidth(xztYuLiaoWidth);
        if(flagsmzt){
            resultDtoList.add(resultDtoxzt);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }



}
