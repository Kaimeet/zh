/**
 * 报价归档 - Excel导出
 * @param processCode
 * @param quoteDetailCode
 */
function outputExcel(processCode, quoteDetailCode, quotationDetailNumber, projectName) {
    let aoa = new Array;
    aoa.push(['序号', '产品类型', '款式/型号', '产品大类', '颜色', '油漆', '长(mm)', '宽(mm)',
        '厚(mm)', '墙体厚度(mm)', '插口长度(mm)', '单位', '生产单备注', '有效材料成本', '正常损耗成本',
        '异常材料损耗', '人工成本', '社保福利费', '正常电费', '可变成本', '总成本']);
    $.ajax({
        url: "../BomBatchController/outputExcel",
        method: "GET",
        data: {
            quoteDetailCode: quoteDetailCode,
        },
        // dataType: "json",
        success: function (result) {
            for (let i in result.rows) {
                let temp = new Array;
                temp.push(result.rows[i].rowIndex);
                temp.push(result.rows[i].typeNameC);
                temp.push(result.rows[i].bomStyle);
                temp.push(result.rows[i].typeCodeC);
                temp.push(result.rows[i].color);
                temp.push(result.rows[i].paint);
                temp.push(result.rows[i].quoteLong);
                temp.push(result.rows[i].quoteWidth);
                temp.push(result.rows[i].quoteThick);
                if (result.rows[i].wallThickness != 0) {
                    temp.push(result.rows[i].wallThickness);
                } else {
                    temp.push(null);
                }
                if (result.rows[i].socketLength != 0) {
                    temp.push(result.rows[i].socketLength);
                } else {
                    temp.push(null);
                }
                temp.push(result.rows[i].unit);
                temp.push(result.rows[i].memo);
                temp.push(result.rows[i].effectiveMaterialCost);
                temp.push(result.rows[i].normalProcessLoss);
                temp.push(result.rows[i].abnormalMaterialLoss);
                temp.push(result.rows[i].unitPrice);
                temp.push(result.rows[i].socialSecurityBenefits);
                temp.push(result.rows[i].normalElectricityBill);
                temp.push(result.rows[i].totalVariableCosts);
                temp.push(result.rows[i].totalCost);

                //将数组存入表格
                aoa.push(temp);
                // console.log(aoa);
            }
            let cols = [
                {wch: 10}, // 序号
                {wch: 10}, // 产品类型
                {wch: 10}, // 款式/型号
                {wch: 10}, // 产品大类
                {wch: 10}, // 颜色
                {wch: 10}, // 油漆
                {wch: 10}, // 长(mm)
                {wch: 10}, // 宽(mm)
                {wch: 10}, // 厚(mm)
                {wch: 12}, // 墙体厚度(mm)
                {wch: 12}, // 插口长度(mm)
                {wch: 12}, // 单位
                {wch: 12}, // 生产单备注
                {wch: 12},
                {wch: 12},
                {wch: 12},
                {wch: 12},
                {wch: 12},
                {wch: 12},
                {wch: 12},
                {wch: 12},
            ]
            let sheet = XLSX.utils.aoa_to_sheet(aoa);
            openDownloadDialog(sheet2blob(sheet, cols), quotationDetailNumber + "_" + projectName + '.xlsx');
        }
    })
}

/**
 * 业务员报价阶段 - Excel导出
 */
function outExcel() {
    let quotationNumber = document.getElementById("quotationNumber").innerText;
    let listCode = document.getElementById("listCode").value;
    console.log(listCode);
    let tempStrsss = new Array();
    tempStrsss = listCode.split("|");
    tempStrsss = tempStrsss[1].split(";")
    console.log(tempStrsss);
    outputExcel(tempStrsss[0], tempStrsss[0], quotationNumber, quotationNumber);
    //通过quotationNumber获取processCode
    // $.ajax({
    //     url: "../BomBatchController/getProcessCode",
    //     method: "GET",
    //     data: {
    //         quotationNumber: quotationNumber,
    //     },
    //     success : function(result) {
    //         //
    //         outputExcel(result, result);
    //     }
    // })
}

/**
 * PVC颜色对照表 - Excel导出
 * @constructor
 */
function PVCOutputExcel() {
    let aoa = new Array;
    aoa.push(['序号', '颜色名称', '颜色代码', '存货名称', '存货编码', '规格', '单位']);
    $.ajax({
        url: "../BomBatchController/PvcOutputExcel",
        method: "GET",
        success: function (result) {
            let j = 1;
            for (let i in result.rows) {
                let temp = new Array;
                temp.push(j);
                j++;
                temp.push(result.rows[i].colorsname);
                temp.push(result.rows[i].colorscode);
                temp.push(result.rows[i].name);
                temp.push(result.rows[i].code);
                temp.push(result.rows[i].spec);
                temp.push(result.rows[i].unit);
                aoa.push(temp);
            }
            let cols = [
                {wch: 5}, // 第一列
                {wch: 30}, // 第二列
            ]
            let sheet = XLSX.utils.aoa_to_sheet(aoa);
            openDownloadDialog(sheet2blob(sheet, cols), 'PVC颜色对照表导出.xlsx');
        }
    })
}

/**
 * 批量bom参数维护 - excel导入 - 模板下载
 */
function excelLeadTemplate() {
    window.open("../BomBatchController/downloadExcel");
}

/**
 * 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
 * cols - 列宽
 * @param sheet
 * @param cols
 * @param sheetName
 * @returns {Blob}
 */
function sheet2blob(sheet, cols, sheetName) {
    sheetName = sheetName || 'sheet1';
    let workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    // workbook.Sheets[sheetName] = sheet;
    workbook.Sheets[sheetName] = Object.assign({}, sheet, {
        // 设置 excel 单元格列的宽度
        '!cols': cols,
        // // excel 表格渲染范围
        // '!ref': ref,
        // // 合并 excel 单元格
        // '!merges': [{
        //     s: { // s开始
        //         c: 0, // 开始列
        //         r: 1  // 开始取值范围
        //     },
        //     e: { // e结束
        //         c: 0, // 结束列
        //         r: 3   // 结束范围
        //     }
        // }]
    })
    // 生成excel的配置项
    let wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    let wbout = XLSX.write(workbook, wopts);
    let blob = new Blob([s2ab(wbout)], {type: "application/octet-stream"});

    // 字符串转ArrayBuffer
    function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

    return blob;
}


/**
 * 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
 * cols - 列宽
 * @param sheet
 * @param cols
 * @param sheetName
 * @returns {Blob}s
 */
function sheets2blob(sheet1, sheet2,sheet3, sheet4, cols1, cols2,cols3, cols4, sheetName1, sheetName2, sheetName3, sheetName4) {
    let workbook = {
        SheetNames: [sheetName1, sheetName2,sheetName3,sheetName4],
        Sheets: {}
    };
    workbook.Sheets[sheetName1] = Object.assign({}, sheet1, {
        // 设置 excel 单元格列的宽度
        '!cols': cols1,
        // // excel 表格渲染范围
        // '!ref': ref,
        // // 合并 excel 单元格
        // '!merges': [{
        //     s: { // s开始
        //         c: 0, // 开始列
        //         r: 1  // 开始取值范围
        //     },
        //     e: { // e结束
        //         c: 0, // 结束列
        //         r: 3   // 结束范围
        //     }
        // }]
    })
    workbook.Sheets[sheetName2] = Object.assign({}, sheet2, {
        // 设置 excel 单元格列的宽度
        '!cols': cols2,
        // // excel 表格渲染范围
        // '!ref': ref,
        // // 合并 excel 单元格
        // '!merges': [{
        //     s: { // s开始
        //         c: 0, // 开始列
        //         r: 1  // 开始取值范围
        //     },
        //     e: { // e结束
        //         c: 0, // 结束列
        //         r: 3   // 结束范围
        //     }
        // }]
    })
    workbook.Sheets[sheetName3] = Object.assign({}, sheet3, {
        // 设置 excel 单元格列的宽度
        '!cols': cols3,
        // // excel 表格渲染范围
        // '!ref': ref,
        // // 合并 excel 单元格
        // '!merges': [{
        //     s: { // s开始
        //         c: 0, // 开始列
        //         r: 1  // 开始取值范围
        //     },
        //     e: { // e结束
        //         c: 0, // 结束列
        //         r: 3   // 结束范围
        //     }
        // }]
    })
    workbook.Sheets[sheetName4] = Object.assign({}, sheet4, {
        // 设置 excel 单元格列的宽度
        '!cols': cols4,
        // // excel 表格渲染范围
        // '!ref': ref,
        // // 合并 excel 单元格
        // '!merges': [{
        //     s: { // s开始
        //         c: 0, // 开始列
        //         r: 1  // 开始取值范围
        //     },
        //     e: { // e结束
        //         c: 0, // 结束列
        //         r: 3   // 结束范围
        //     }
        // }]
    })
    // 生成excel的配置项
    let wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    let wbout = XLSX.write(workbook, wopts);
    let blob = new Blob([s2ab(wbout)], {type: "application/octet-stream"});

    // 字符串转ArrayBuffer
    function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

    return blob;
}

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    let aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}