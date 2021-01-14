package com.pzm.zh.service;
import com.pzm.zh.dao.NumbyserMapper;
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
 * @description: 主计算逻辑实现类
 * @author: Mr.Tong
 * @create: 2020-11-16 10:11
 **/
@Service
public class MainServiceImpl implements MainService {
    @Resource
    NumbyserMapper numbyserMapper;

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
     * 计算主逻辑
     * 1.根据前端传输的算法类型判断是哪种算法
     * 2.简短部件调用简单部件算法进行计算。
     * 3.复杂部件对应到每种算法进行计算出结果。
     * @param caseDto
     * @return
     */
    @Override
    public Dto<List<ResultDto>> maincase(CaseDto caseDto) {
        System.out.println(caseDto.getSerizesId()+"idddddddd");
        //1.提取出该部件的每种部件数量
        Numbyser numbyser=numbyserMapper.selectByPrimaryKey(caseDto.getSerizesId());
        System.out.println(numbyser+"numbyser值为**************************");
        //2.计算普通部件值
        List<ResultDto>resultDtos=casenormal(caseDto,numbyser);
        if("1".equals(caseDto.getCaseires())||"2".equals(caseDto.getCaseires())){
            return case1(caseDto,numbyser,resultDtos);
        }else  if("3".equals(caseDto.getCaseires())){
            return case5(caseDto,numbyser,resultDtos);
        }
        else if("4".equals(caseDto.getCaseires())){
            return case2(caseDto,numbyser,resultDtos);
        }else if("5".equals(caseDto.getCaseires())||"6".equals(caseDto.getCaseires())){
            return case3(caseDto,numbyser,resultDtos);
        }else if("7".equals(caseDto.getCaseires())){
            return case4(caseDto,numbyser,resultDtos);
        }
        return null;
    }

    @Override
    public Dto<List<ResultDto>> mainfinalcase(CaseDto caseDto) {
        Dto<List<ResultDto>> dto=maincase(caseDto);
        List<ResultDto>resultDtoList=dto.getData();
        List<ResultDto>newresultDto=new ArrayList<>();
        for(ResultDto resultDto:resultDtoList){
            if("边框".equals(resultDto.getPartName())){
                resultDto.setHigh("40");
            }else if("上帽".equals(resultDto.getPartName())){
                resultDto.setHigh("37");
            }else if("下帽".equals(resultDto.getPartName())){
                resultDto.setHigh("37");
            }else if("中档".equals(resultDto.getPartName())){
                resultDto.setHigh("37");
            }else if("上中挺".equals(resultDto.getPartName())){
                resultDto.setHigh("34");
            }else if("中中挺".equals(resultDto.getPartName())){
                resultDto.setHigh("34");
            }else if("下中挺".equals(resultDto.getPartName())){
                resultDto.setHigh("34");
            }else if("小中挡".equals(resultDto.getPartName())){
                resultDto.setHigh("34");
            }else if("小中挺".equals(resultDto.getPartName())){
                resultDto.setHigh("34");
            }
            newresultDto.add(resultDto);
        }
        return DtoUtil.returnDataSuccess(newresultDto,"001");
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
    public List<ResultDto>casenormal(CaseDto caseDto,Numbyser numbyser){
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
        boolean flagzd=false;
        if(!StringUtils.isEmpty(numbyser.getZzdnums())){
            flagzd=true;
        }
        if(flagzd){
            resultDtos.add(resultDtozd);
        }

        return resultDtos;
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
     * @param caseDto
     * @return
     */
    public Dto<List<ResultDto>>case1(CaseDto caseDto,Numbyser numbyser,List<ResultDto>resultDtoList){
        boolean flagsxb=false;
        if(!StringUtils.isEmpty(numbyser.getSxbnums())){
            flagsxb=true;
        }
        boolean flagxxb=false;
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            flagxxb=true;
        }
        boolean flagzxb=false;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            flagzxb=true;
        }
        boolean flagzt=false;
        String caserizes=caseDto.getCaseires();
        if(caserizes.equals("2")||caserizes.equals("4")||caserizes.equals("6")){
            flagzt=true;
        }
        //if(caserizes.)
        String xxlength="";
        //1.计算上、下芯板长
        if(caseDto.getXxHigh()!=null){
            xxlength=caseDto.getXxHigh().toString();
        }
        //2.计算下芯板宽
        String xxwidth="";
        if(caseDto.getDoorweight()!=null&&caseDto.getBkweight()!=null&&caseDto.getZxWeight()!=null){
            Double doorweight=caseDto.getDoorweight().doubleValue();
            Double bkweight=caseDto.getBkweight().doubleValue();
            Double zxweight=caseDto.getZxWeight().doubleValue();
            xxwidth=(doorweight-2*bkweight+2*zxweight)+"";
        }
        //3.计算下芯板数量（片）
        String xxnumpian="";
        int N=0;
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(15))==0){
            if(flagzt){
                N=2;
            }else{
                N=1;
            }
        }
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(8))==0){
                  if(flagzt){
                      N=4;
                  }else{
                      N=2;
                  }
        }
        xxnumpian=caseDto.getDoornums()*N+"";
        ResultDto resultDtosxb=new ResultDto();
        resultDtosxb.setLength(xxlength);
        resultDtosxb.setWidth(xxwidth);
        resultDtosxb.setNumbyZhuang(xxnumpian);
        resultDtosxb.setPartName("下芯板");
        if(flagxxb){
            resultDtoList.add(resultDtosxb);
        }

        //4.计算中芯板长
         String zxblenth="";
         if(caseDto.getDoorhigh()!=null&&caseDto.getSmWeight()!=null&&caseDto.getZdWeight()!=null&&caseDto.getXmWeight()!=null&&caseDto.getZxWeight()!=null&&caseDto.getXxHigh()!=null){
             Double doorhigh=caseDto.getDoorhigh().doubleValue();
             Double smweight=caseDto.getSmWeight().doubleValue();
             Double zdweight=caseDto.getZdWeight().doubleValue();
             Double xmweight=caseDto.getXmWeight().doubleValue();
             Double xxhigh=caseDto.getXxHigh().doubleValue();
             Double zxweight=caseDto.getZxWeight().doubleValue();
             zxblenth=doorhigh-smweight-xmweight-zdweight-xxhigh+4*zxweight+"";
         }
         //5.计算中芯板宽，数量与下芯板一致。
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setLength(zxblenth);
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setWidth(xxwidth);
        resultDtozxb.setNumbyZhuang(xxnumpian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        //caseDto.getDoorweight().subtract(new BigDecimal(2).multiply(caseDto.getBkweight())).add(new BigDecimal(2).multiply(caseDto.getZxWeight())).subtract(new BigDecimal(2));
        //6.若有中挺，计算中挺
        ResultDto resultDtoszt=new ResultDto();
        ResultDto resultDtozzt=new ResultDto();
        ResultDto resultDtoxzt=new ResultDto();
        resultDtoszt.setPartName("上中挺");
        resultDtoxzt.setPartName("下中挺");
        resultDtozzt.setPartName("中中挺");
        boolean flagszt=false;
        boolean flagzzt=false;
        boolean flagxzt=false;
        if(!StringUtils.isEmpty(numbyser.getSztnums())){
            flagszt=true;
        }
        if(!StringUtils.isEmpty(numbyser.getZztnums())){
            flagzzt=true;
        }
        if(!StringUtils.isEmpty(numbyser.getXztnums())){
            flagxzt=true;
        }
        if(flagzt){
            //10.计算下中挺长
            String xztlength="";
            if(caseDto.getMemo1()!=null){
                xztlength=caseDto.getMemo1();
            }
            //11.计算下中挺宽
            String xztweight="";
            if(caseDto.getXztWeight()!=null){
                xztweight=caseDto.getXztWeight().toString();
            }
            //12.计算下中挺数量（个）
            String xztnumGe="";
            if(caseDto.getDoornums()!=null){
                xztnumGe=caseDto.getDoornums().toString();
            }
            //13.计算下中挺数量（根）
            String xztnumGen="";
            if(caseDto.getDoornums()!=null&&!StringUtils.isEmpty(caseDto.getMemo1())){
                double doornums=caseDto.getDoornums().doubleValue();
                double xzthigh=Double.valueOf(caseDto.getMemo1());
                double e=doornums/((int)(2440/( xzthigh +4+5)));
                xztnumGen=e+"";
            }
            //14.计算下中挺数量（张）
            String xztnumZhuang="";
            if(caseDto.getXztWeight()!=null&&!StringUtils.isEmpty(xztnumGen)){
                double xztweights=caseDto.getXztWeight().doubleValue();
                double xztnums=Double.valueOf(xztnumGen);
                double numszhauang=  xztnums/(int)(1220/( xztweights +5));
                xztnumZhuang=numszhauang+"";
            }
            resultDtoxzt.setLength(xztlength);
            resultDtoxzt.setWidth(xztweight);
            resultDtoxzt.setNumbyGe(xztnumGe);
            resultDtoxzt.setNumbyGens(xztnumGen);
            resultDtoxzt.setNumbyZhuang(xztnumZhuang);


            //7.计算中中挺长//中中挺数量（根）
            String zztnumsGen="";
            String zztlength="";
            String zztnumsZhang="";
            if(caseDto.getDoorhigh()!=null&&caseDto.getSmWeight()!=null&&caseDto.getXmWeight()!=null&&caseDto.getDoornums()!=null&&caseDto.getZxWeight()!=null){
                Double doorhigh1=caseDto.getDoorhigh().doubleValue();
                Double smweight1=caseDto.getSmWeight().doubleValue();
                Double zdweight1=0.0;
                if(caseDto.getZdWeight()!=null){
                    zdweight1=caseDto.getZdWeight().doubleValue();
                }

                Double xmweight1=caseDto.getXmWeight().doubleValue();
                Double xxhigh1=0.0;
                if(caseDto.getXxHigh()!=null){
                   xxhigh1= caseDto.getXxHigh().doubleValue();
                }
                Double zxweight=caseDto.getZxWeight().doubleValue();
                zztlength=doorhigh1-smweight1-xmweight1-zdweight1-xxhigh1+2*zxweight+"";
                String zztyuliaolen=caseYuliaoLenth(doorhigh1-smweight1-xmweight1-zdweight1-xxhigh1+2*zxweight);
                resultDtozzt.setYuliaoLen(zztyuliaolen);
                Double doornums=caseDto.getDoornums().doubleValue();
                double c= doornums/((int)(2440/( doorhigh1-smweight1-xmweight1-zdweight1-xxhigh1+2*zxweight+4+5)));
                zztnumsGen=String.valueOf(c);
                if(caseDto.getZztWeight()!=null){
                    double zhangs=c/(int)(1220/(caseDto.getZztWeight().doubleValue()+5));
                    zztnumsZhang=String.valueOf(zhangs);
                }
            }
            //8.计算中中挺宽,中中挺数量（张）
            String zztwidth="";
            if(caseDto.getZztWeight()!=null){
                zztwidth=caseDto.getZztWeight().toString();
            }
            //9.中中挺数量（个）
            String zztnumsGe="";
            if(caseDto.getDoornums()!=null){
                zztnumsGe=caseDto.getDoornums().toString();
            }
            resultDtozzt.setLength(zztlength);
            resultDtozzt.setWidth(zztwidth);
            resultDtozzt.setNumbyGe(zztnumsGe);
            resultDtozzt.setNumbyGens(zztnumsGen);
            resultDtozzt.setNumbyZhuang(zztnumsZhang);
            //12.计算中中挺余料宽
            String zztyuliaokuan="";
            if(caseDto.getZztWeight()!=null){
                double zztweights=caseDto.getZztWeight().doubleValue();
                double c=((1220/(zztweights+5))-(int)(1220/(zztweights+5)))* (zztweights+5);
                zztyuliaokuan=c+"";
                resultDtozzt.setYuliaoWidth(zztyuliaokuan);
            }
            //13.计算余料长
            if(flagszt){
                resultDtoList.add(resultDtoszt);
            }
            if(flagxzt){
                resultDtoList.add(resultDtoxzt);
            }
            if(flagzzt){
                resultDtoList.add(resultDtozzt);
            }

        }

        return DtoUtil.returnDataSuccess(resultDtoList,"001");
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
     * @param caseDto
     * @return
     */
    public Dto<List<ResultDto>>case2(CaseDto caseDto,Numbyser numbyser,List<ResultDto>resultDtoList){
        boolean flagsxb=false;
        if(!StringUtils.isEmpty(numbyser.getSxbnums())){
            flagsxb=true;
        }
        boolean flagxxb=false;
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            flagxxb=true;
        }
        boolean flagzxb=false;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            flagzxb=true;
        }
        boolean flagzt=false;
        String caserizes=caseDto.getCaseires();
        if(caserizes.equals("2")||caserizes.equals("4")||caserizes.equals("6")){
            flagzt=true;
        }
        //if(caserizes.)
        String xxlength="";
        //1.计算上、下芯板长
        if(caseDto.getXxHigh()!=null){
            xxlength=caseDto.getSxHigh().toString();
        }
        //2.计算上、下芯板宽
        String xxwidth="";
        if(caseDto.getDoorweight()!=null&&caseDto.getBkweight()!=null&&caseDto.getZxWeight()!=null&&caseDto.getSztweight()!=null){
            Double doorweight=caseDto.getDoorweight().doubleValue();
            Double bkweight=caseDto.getBkweight().doubleValue();
            Double zxweight=caseDto.getZxWeight().doubleValue();
            Double sztweight=caseDto.getSztweight().doubleValue();
            xxwidth=(doorweight-2*bkweight+4*zxweight-sztweight)/2+"";
        }
        //3.计算上、下芯板数量（片）
        String xxnumpian="";
        int N=0;
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(15))==0){
            if(flagzt){
                N=2;
            }else{
                N=1;
            }
        }
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(8))==0){
            if(flagzt){
                N=4;
            }else{
                N=2;
            }
        }
        xxnumpian=caseDto.getDoornums()*N+"";
        ResultDto resultDtosxb=new ResultDto();
        resultDtosxb.setLength(xxlength);
        resultDtosxb.setWidth(xxwidth);
        resultDtosxb.setNumbyZhuang(xxnumpian);
        resultDtosxb.setPartName("下芯板");
        if(flagxxb){
            resultDtoList.add(resultDtosxb);
        }
        ResultDto resultDtosxbs=new ResultDto();
        resultDtosxbs.setLength(xxlength);
        resultDtosxbs.setWidth(xxwidth);
        resultDtosxbs.setNumbyZhuang(xxnumpian);
        resultDtosxbs.setPartName("上芯板");
        if(flagsxb){
            resultDtoList.add(resultDtosxbs);
        }

        //4.计算中芯板长
        String zxblenth="";
        if(caseDto.getDoorhigh()!=null&&caseDto.getSmWeight()!=null&&caseDto.getZdWeight()!=null&&caseDto.getXmWeight()!=null&&caseDto.getSxHigh()!=null&&caseDto.getXxHigh()!=null&&caseDto.getZxWeight()!=null){
            Double doorhigh=caseDto.getDoorhigh().doubleValue();
            Double smweight=caseDto.getSmWeight().doubleValue();
            Double zdweight=caseDto.getZdWeight().doubleValue();
            Double xmweight=caseDto.getXmWeight().doubleValue();
            Double sxhighs=caseDto.getSxHigh().doubleValue();
            Double xxhighs=caseDto.getXxHigh().doubleValue();
            Double zxweights=caseDto.getZxWeight().doubleValue();
            zxblenth=doorhigh-smweight-xmweight-sxhighs-xxhighs-2*zdweight+6*zxweights+"";
        }
        //5.计算中芯板宽，数量与下芯板一致。
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setLength(zxblenth);
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setWidth(xxwidth);
        resultDtozxb.setNumbyZhuang(xxnumpian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        //caseDto.getDoorweight().subtract(new BigDecimal(2).multiply(caseDto.getBkweight())).add(new BigDecimal(2).multiply(caseDto.getZxWeight())).subtract(new BigDecimal(2));
        //6.若有中挺，计算中挺
        ResultDto resultDtoszt=new ResultDto();
        ResultDto resultDtozzt=new ResultDto();
        ResultDto resultDtoxzt=new ResultDto();
        resultDtoszt.setPartName("上中挺");
        resultDtoxzt.setPartName("下中挺");
        resultDtozzt.setPartName("中中挺");
        if(flagzt){
            //10.计算上、下中挺长
            String xztlength="";
            if(caseDto.getMemo1()!=null){
                String sztyuliaochang="";
                double d=(2440/(Double.valueOf(caseDto.getMemo1())+4+5)-((int)(2440/(Double.valueOf(caseDto.getMemo1())+4+5))))* (Double.valueOf(caseDto.getMemo1())+4+5);
                sztyuliaochang=d+"";
                resultDtoxzt.setYuliaoLen(sztyuliaochang);
                resultDtoszt.setYuliaoLen(sztyuliaochang);
                xztlength=caseDto.getMemo1();

            }
            //11.计算上、下中挺宽
            String xztweight="";
            if(caseDto.getXztWeight()!=null){
                String xztyuliaokuan="";
                double c=((1220/(caseDto.getXztWeight().doubleValue()+5))-(int)(1220/(caseDto.getXztWeight().doubleValue()+5)))* (caseDto.getXztWeight().doubleValue()+5);
                xztyuliaokuan=c+"";
                resultDtoszt.setYuliaoWidth(xztyuliaokuan);
                resultDtoxzt.setYuliaoWidth(xztyuliaokuan);
                xztweight=caseDto.getXztWeight().toString();
            }
            //12.计算上、下中挺数量（个）
            String xztnumGe="";
            if(caseDto.getDoornums()!=null){
                xztnumGe=caseDto.getDoornums().toString();
            }
            //13.计算上、下中挺数量（根）
            String xztnumGen="";
            if(caseDto.getDoornums()!=null&&!StringUtils.isEmpty(caseDto.getMemo1())){
                double doornums=caseDto.getDoornums().doubleValue();
                double xzthigh=Double.valueOf(caseDto.getMemo1());
                double e=doornums/((int)(2440/( xzthigh +4+5)));
                xztnumGen=e+"";
            }
            //14.计算上、下中挺数量（张）
            String xztnumZhuang="";
            if(caseDto.getXztWeight()!=null&&!StringUtils.isEmpty(xztnumGen)){
                double xztweights=caseDto.getXztWeight().doubleValue();
                double xztnums=Double.valueOf(xztnumGen);
                double numszhauang=  xztnums/(int)(1220/( xztweights +5));
                xztnumZhuang=numszhauang+"";
            }
            resultDtoxzt.setLength(xztlength);
            resultDtoxzt.setWidth(xztweight);
            resultDtoxzt.setNumbyGe(xztnumGe);
            resultDtoxzt.setNumbyGens(xztnumGen);
            resultDtoxzt.setNumbyZhuang(xztnumZhuang);
            resultDtoszt.setLength(xztlength);
            resultDtoszt.setWidth(xztweight);
            resultDtoszt.setNumbyGe(xztnumGe);
            resultDtoszt.setNumbyGens(xztnumGen);
            resultDtoszt.setNumbyZhuang(xztnumZhuang);


            //7.计算中中挺长//中中挺数量（根）
            String zztnumsGen="";
            String zztlength="";
            String zztnumsZhang="";
            if(caseDto.getDoorhigh()!=null&&caseDto.getSmWeight()!=null&&caseDto.getZdWeight()!=null&&caseDto.getXmWeight()!=null&&caseDto.getDoornums()!=null&&caseDto.getZxWeight()!=null&&!StringUtils.isEmpty(xztlength)){
                Double doorhigh1=caseDto.getDoorhigh().doubleValue();
                Double smweight1=caseDto.getSmWeight().doubleValue();
                Double zdweight1=caseDto.getZdWeight().doubleValue();
                Double xmweight1=caseDto.getXmWeight().doubleValue();
               // Double xxhigh1=caseDto.getXxHigh().doubleValue();
                //Double sxhighs=caseDto.getSxHigh().doubleValue();
                Double zxweights=caseDto.getZxWeight().doubleValue();
                zztlength=doorhigh1-smweight1-xmweight1-2*zdweight1-2*Double.valueOf(xztlength)+6*zxweights+"";
                //13.计算中中挺余料长
                String zztyuliaochang="";
                double d=(2440/(doorhigh1-smweight1-xmweight1-2*zdweight1-2*Double.valueOf(xztlength)+6*zxweights+4+5)-((int)(2440/(doorhigh1-smweight1-xmweight1-2*zdweight1-2*Double.valueOf(xztlength)+6*zxweights+4+5))))* (doorhigh1-smweight1-xmweight1-2*zdweight1-2*Double.valueOf(xztlength)+6*zxweights+4+5);
                zztyuliaochang=d+"";
                resultDtozzt.setYuliaoLen(zztyuliaochang);
                Double doornums=caseDto.getDoornums().doubleValue();
                double c= doornums/((int)(2440/( doorhigh1-smweight1-xmweight1-2*zdweight1-2*Double.valueOf(xztlength)+2*zxweights+4+5)));
                zztnumsGen=String.valueOf(c);
                if(caseDto.getZztWeight()!=null){
                    double zhangs=c/(int)(1220/(caseDto.getZztWeight().doubleValue()+5));
                    zztnumsZhang=String.valueOf(zhangs);
                }
            }
            //8.计算中中挺宽,中中挺数量（张）
            String zztwidth="";
            if(caseDto.getZztWeight()!=null){
                String zztyuliaokuan="";
                double zztweights=caseDto.getZztWeight().doubleValue();
                double c=((1220/(zztweights+5))-(int)(1220/(zztweights+5)))* (zztweights+5);
                zztyuliaokuan=c+"";
                resultDtozzt.setYuliaoWidth(zztyuliaokuan);
                zztwidth=caseDto.getZztWeight().toString();
            }
            //9.中中挺数量（个）
            String zztnumsGe="";
            if(caseDto.getDoornums()!=null){
                zztnumsGe=caseDto.getDoornums().toString();
            }
            resultDtozzt.setLength(zztlength);
            resultDtozzt.setWidth(zztwidth);
            resultDtozzt.setNumbyGe(zztnumsGe);
            resultDtozzt.setNumbyGens(zztnumsGen);
            resultDtozzt.setNumbyZhuang(zztnumsZhang);
        }
        resultDtoList.add(resultDtoszt);
        resultDtoList.add(resultDtoxzt);
        resultDtoList.add(resultDtozzt);
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
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
     * @param caseDto
     * @return
     */
    public Dto<List<ResultDto>>case3(CaseDto caseDto,Numbyser numbyser,List<ResultDto>resultDtoList){
        boolean flagsxb=false;
        if(!StringUtils.isEmpty(numbyser.getSxbnums())){
            flagsxb=true;
        }
        boolean flagxxb=false;
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            flagxxb=true;
        }
        boolean flagzxb=false;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            flagzxb=true;
        }
        boolean flagzt=false;
        String caserizes=caseDto.getCaseires();
        if(caserizes.equals("2")||caserizes.equals("4")||caserizes.equals("6")){
            flagzt=true;
        }
        int doornumes=0;
        if(caseDto.getDoornums()!=null){
            doornumes=caseDto.getDoornums();
        }
        String zzdnums=numbyser.getZzdnums();
        int zdnumsGe= (Integer.valueOf(zzdnums));
        //if(caserizes.)
        String xxlength="";
        //1.计算上中下芯板长
        if(caseDto.getDoorhigh()!=null&&caseDto.getSmWeight()!=null&&caseDto.getZdWeight()!=null&&caseDto.getXmWeight()!=null&&caseDto.getZxWeight()!=null){
            Double doorhigh=caseDto.getDoorhigh().doubleValue();
            Double smweight=caseDto.getSmWeight().doubleValue();
            Double zdweight=caseDto.getZdWeight().doubleValue();
            Double xmweight=caseDto.getXmWeight().doubleValue();
            Double zxweight=caseDto.getZxWeight().doubleValue();
            xxlength=((doorhigh-smweight-xmweight-zdweight*zdnumsGe)/(zdnumsGe+1)+2*zxweight)+"";
        }
        //2.计算上中下芯板宽
        String xxwidth="";
        if(flagzt){
            if(caseDto.getZxWeight()!=null&&caseDto.getDoorweight()!=null&&caseDto.getBkweight()!=null&&caseDto.getZztWeight()!=null){
                double doorweight=caseDto.getDoorweight().doubleValue();
                double bkweight=caseDto.getBkweight().doubleValue();
                double zxweight=caseDto.getZxWeight().doubleValue();
                double ztweight=caseDto.getZztWeight().doubleValue();
                xxwidth=(doorweight-2*bkweight+2*zxweight-ztweight)+"";
            }
        }else {
            if(caseDto.getZxWeight()!=null&&caseDto.getDoorweight()!=null&&caseDto.getBkweight()!=null){
                double doorweight=caseDto.getDoorweight().doubleValue();
                double bkweight=caseDto.getBkweight().doubleValue();
                double zxweight=caseDto.getZxWeight().doubleValue();
                xxwidth=(doorweight-2*bkweight+2*zxweight )+"";
            }

        }
        //3.计算上中下芯板数量（片）
        String xxnumpian="";
        int N=0;
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(15))==0){
            if(flagzt){
                N=2;
            }else{
                N=1;
            }
        }
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(8))==0){
            if(flagzt){
                N=4;
            }else{
                N=2;
            }
        }
        xxnumpian=(caseDto.getDoornums()*N*(zdnumsGe+1))+"";
        ResultDto resultDtosxb=new ResultDto();
        resultDtosxb.setLength(xxlength);
        resultDtosxb.setWidth(xxwidth);
        resultDtosxb.setNumbyZhuang(xxnumpian);
        resultDtosxb.setPartName("上芯板");

        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setLength(xxlength);
        resultDtozxb.setWidth(xxwidth);
        resultDtozxb.setNumbyZhuang(xxnumpian);
        resultDtozxb.setPartName("中芯板");

        ResultDto resultDtoxxb=new ResultDto();
        resultDtoxxb.setLength(xxlength);
        resultDtoxxb.setWidth(xxwidth);
        resultDtoxxb.setNumbyZhuang(xxnumpian);
        resultDtoxxb.setPartName("下芯板");
        if(flagsxb){
            resultDtoList.add(resultDtosxb);
        }
            if(flagxxb){
                resultDtoList.add(resultDtoxxb);
            }
            if(flagzxb){
                resultDtoList.add(resultDtozxb);

            }

        //caseDto.getDoorweight().subtract(new BigDecimal(2).multiply(caseDto.getBkweight())).add(new BigDecimal(2).multiply(caseDto.getZxWeight())).subtract(new BigDecimal(2));
        //6.若有中挺，计算中挺
        ResultDto resultDtoszt=new ResultDto();
        ResultDto resultDtozzt=new ResultDto();
        ResultDto resultDtoxzt=new ResultDto();
        resultDtoszt.setPartName("中挺");
        //resultDtoxzt.setPartName("中挺");
        //resultDtozzt.setPartName("中中挺");
        if(flagzt){
            //7.计算上中下挺长//中中挺数量（根）
            String zztnumsGen="";
            String zztlength=xxlength;
            double zztlengthsou=Double.valueOf(xxlength);
            String zztnumsZhang="";
            Double doornums=caseDto.getDoornums().doubleValue();
                double c= doornums*(zdnumsGe+1)/((int)(2440/(zztlengthsou+4+5)));
                zztnumsGen=String.valueOf(c);
                if(caseDto.getZztWeight()!=null){
                    double zhangs=c/(int)(1220/(caseDto.getZztWeight().doubleValue()+5));
                    zztnumsZhang=String.valueOf(zhangs);
                }

            //8.计算中中挺宽,中中挺数量（张）
            String zztwidth="";
            if(caseDto.getZztWeight()!=null){
                zztwidth=caseDto.getZztWeight().toString();
            }
            //9.中中挺数量（个）
            String zztnumsGe="";
            if(caseDto.getDoornums()!=null){
                zztnumsGe=(doornums*(zdnumsGe+1))+"";
            }
            if(!StringUtils.isEmpty(zztlength)){
                String zztyuliaolenth=caseYuliaoLenth(Double.valueOf(zztlength));
                resultDtoszt.setYuliaoLen(zztyuliaolenth);
            }
            if(!StringUtils.isEmpty(zztwidth)){
                String yuliaowidth=caseYuliaoKuan(Double.valueOf(zztwidth));
                resultDtoszt.setYuliaoWidth(yuliaowidth);
            }
            resultDtozzt.setLength(zztlength);
            resultDtozzt.setWidth(zztwidth);
            resultDtozzt.setNumbyGe(zztnumsGe);
            resultDtozzt.setNumbyGens(zztnumsGen);
            resultDtozzt.setNumbyZhuang(zztnumsZhang);
            resultDtoszt.setLength(zztlength);
            resultDtoszt.setWidth(zztwidth);
            resultDtoszt.setNumbyGe(zztnumsGe);
            resultDtoszt.setNumbyGens(zztnumsGen);
            resultDtoszt.setNumbyZhuang(zztnumsZhang);
            resultDtoxzt.setLength(zztlength);
            resultDtoxzt.setWidth(zztwidth);
            resultDtoxzt.setNumbyGe(zztnumsGe);
            resultDtoxzt.setNumbyGens(zztnumsGen);
            resultDtoxzt.setNumbyZhuang(zztnumsZhang);
            resultDtoList.add(resultDtoszt);
            //resultDtoList.add(resultDtoxzt);
            //resultDtoList.add(resultDtozzt);
        }

        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }
    /**
     * Ⅳ类，此类只含有中芯板/中玻璃，无中档、中挺
     */
    public Dto<List<ResultDto>>case4(CaseDto caseDto,Numbyser numbyser,List<ResultDto>resultDtoList1){


        //增加中心板判断
        boolean flagzxb=false;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
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
            zxbnumspian=(caseDto.getDoornums().doubleValue()*N)+"";
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
     * 新三类，情况说明：此类中、下芯板为固定尺寸（含造型），。此类包含两种情况：
     * 1、部件只含有上、中、下芯板，此时只需计算上、中、下芯板尺寸，不含中挺，含中档。
     */
    public Dto<List<ResultDto>>case5(CaseDto caseDto,Numbyser numbyser,List<ResultDto>resultDtoList){


        //增加中心板判断
        boolean flagzxb=false;
        if(!StringUtils.isEmpty(numbyser.getZxbnums())){
            flagzxb=true;
        }
        //增加中心板判断
        boolean flagsxb=false;
        if(!StringUtils.isEmpty(numbyser.getSxbnums())){
            flagsxb=true;
        }
        //增加中心板判断
        boolean flagxxb=false;
        if(!StringUtils.isEmpty(numbyser.getXxbnums())){
            flagxxb=true;
        }
        //1.计算上芯板长
        String sxblength="";
        if(caseDto.getDoorhigh()!=null&&caseDto.getSmWeight()!=null&&caseDto.getXmWeight()!=null&&caseDto.getZdWeight()!=null&&caseDto.getXxHigh()!=null&&caseDto.getZxHigh()!=null&&caseDto.getZxWeight()!=null){

            Double doorhigh=caseDto.getDoorhigh().doubleValue();
            Double smweight=caseDto.getSmWeight().doubleValue();
            Double xmweight=caseDto.getXmWeight().doubleValue();
            Double zdweight=caseDto.getZdWeight().doubleValue();
            Double xxhigh=caseDto.getXxHigh().doubleValue();
            Double zxHigh=caseDto.getZxHigh().doubleValue();
            Double zxweight=caseDto.getZxWeight().doubleValue();
            sxblength=( doorhigh-smweight-xmweight-2*zdweight-xxhigh-zxHigh+6* zxweight)+"";
        }
        //2.计算上芯板宽
        String sxbwidth="";
        if(caseDto.getDoorweight()!=null&&caseDto.getBkweight()!=null&&caseDto.getZxWeight()!=null){
            Double doorweight=caseDto.getDoorweight().doubleValue();
            Double bkweight=caseDto.getBkweight().doubleValue();
            Double zxweight=caseDto.getZxWeight().doubleValue();
            sxbwidth=(doorweight-2*bkweight+2*zxweight)+"";
        }
        //3.中芯板长
        String zxblength="";
        if(caseDto.getZxHigh()!=null){
           Double zxhigh=caseDto.getZxHigh().doubleValue();
            zxblength=(zxhigh)+"";
        }
        //4.计算中芯板宽
        String zxbwidth="";
        if(caseDto.getZxWeight()!=null&&caseDto.getDoorweight()!=null&&caseDto.getBkweight()!=null){
            double doorWeight=caseDto.getDoorweight().doubleValue();
            double bkWeight=caseDto.getBkweight().doubleValue();
            double zxweight=caseDto.getZxWeight().doubleValue();
            zxbwidth=(doorWeight-2*bkWeight+2*zxweight)+"";
        }
        String zxbnumspian="";
        int N=0;
        if(caseDto.getPlaThick()!=null&&caseDto.getPlaThick().compareTo(new BigDecimal(15))==0){
            N=1;
        }else{
            N=2;
        }
        if(caseDto.getDoornums()!=null){
            zxbnumspian=(caseDto.getDoornums().doubleValue()*N)+"";
        }
        ResultDto resultDtozxb=new ResultDto();
        resultDtozxb.setPartName("中芯板");
        resultDtozxb.setLength(zxblength);
        resultDtozxb.setWidth(zxbwidth);
        resultDtozxb.setNumbyZhuang(zxbnumspian);
        if(flagzxb){
            resultDtoList.add(resultDtozxb);
        }
        //5.计算下芯板长
        String xxblenth="";
        if(caseDto.getXxHigh()!=null){
            xxblenth=caseDto.getXxHigh().toString();
        }
        //6.计算下芯板宽与中芯板一致

        //7.计算芯板数量（片），中芯板计算好

        ResultDto resultDtosxb=new ResultDto();
        resultDtosxb.setPartName("上芯板");
        resultDtosxb.setLength(sxblength);
        resultDtosxb.setWidth(sxbwidth);
        resultDtosxb.setNumbyZhuang(zxbnumspian);


        ResultDto resultDtoxxb=new ResultDto();
        resultDtoxxb.setPartName("下芯板");
        resultDtoxxb.setLength(xxblenth);
        resultDtoxxb.setWidth(zxbwidth);
        resultDtoxxb.setNumbyZhuang(zxbnumspian);

        if(flagsxb){
            resultDtoList.add(resultDtosxb);
        }
        if(flagxxb){
            resultDtoList.add(resultDtoxxb);
        }
        return DtoUtil.returnDataSuccess(resultDtoList,"001");
    }
}
