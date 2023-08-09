/*
 * @Author: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @Date: 2022-07-27 17:12:55
 * @LastEditors: abc088_6kAX_code 86451477+abc-0886kAX-code@users.noreply.github.com
 * @LastEditTime: 2022-07-27 17:18:38
 * @FilePath: \防汛大屏d:\系统默认\桌面\useExportTable.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import FileSaver from "file-saver";
import * as XLSX from 'xlsx';
import { nextTick } from 'vue'

const defualtColumnWidth = [
  {
    wch: 20,
  },
  {
    wch: 30,
  },
  {
    wch: 10,
  },
]

const xlsxParam = { raw: true };

export const exportTable = async (el, columnWidth, fileName) => {
  await nextTick();
  const wb = XLSX.utils.table_to_book(
    document.querySelector(el),
    xlsxParam
  );
  wb.Sheets.Sheet1["!cols"] = columnWidth || defualtColumnWidth;
  // 导出excel文件名
  let Name = fileName + new Date().getTime() + ".xlsx";

  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    // 下载保存文件
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      Name
    );
  } catch (e) {
    if (typeof console !== "undefined") {
      console.log(e, wbout);
    }
  }
  return wbout;
}