// import * as FileSaver from 'file-saver';
import FileSaver from 'file-saver';
import React from 'react';
import { useDispatch } from 'react-redux';
import XLSX from 'sheetjs-style'
import { INpa, LocalesName } from '../constants/interfaces';
import i18n from '../i18n';
import { OtherServices } from '../services/Others';

type Props = {

    fileName: string,
    filteredData: string,
    npaData: any
}

const ExportExcel: React.FC<Props> = ({ npaData, fileName, filteredData }) => {
    console.log(npaData)
    let expertsMax = [0, 1]

    npaData && npaData.data.map((item: { experts: string | any[]; }) => {
        expertsMax.push(item.experts.length)
    })

    const excelData = npaData && npaData.data.map((item: any) => {
        const data = {
            'id': item.id,
            'Наименование НПА': item.name[i18n.language as keyof LocalesName],
            'Орган разработчик': item.authority_developer_name[i18n.language as keyof LocalesName],
            'Вид НПА': item.document_type_name[i18n.language as keyof LocalesName],
            'Группа НПА': item.document_type_group[i18n.language as keyof LocalesName],
        };

        [...Array(Math.max.apply(null, expertsMax))].map((ite, index) => {
            return (
                data['Эксперт ' + (index + 1) as keyof typeof data] = item.experts[index] ? item.experts[index].full_name : 'нет данных',
                data['Кол-во замечаний эксперт ' + (index + 1) as keyof typeof data] = item.experts[index] ? item.experts[index].remark_count : 0,
                data['Сумма за замечания ' + (index + 1) as keyof typeof data] = item.experts[index] ? item.experts[index].remark_count * item.remark_cost : 0,
                data['БП эксперт ' + (index + 1) as keyof typeof data] = item.experts[index] ? Math.round(item.base_cost / item.expert_count) : 0,
                data['Экспертная часть ' + (index + 1) as keyof typeof data] = item.experts[index] ? Math.round(item.remark_cost * item.experts[index].remark_count + item.base_cost / item.expert_count) : 0
            )
        })
        data['Базовый показатель общий' as keyof typeof data] = item.base_cost
        data['Экспертная часть общая' as keyof typeof data] = item.base_cost + item.experts.map((val: { remark_count: number }) => val.remark_count * item.remark_cost).reduce((acc: any, num: any) => acc + num, 0)
        data['БП координатор' as keyof typeof data] = item.coordinator_cost
        data['Стоимость НПА без НДС' as keyof typeof data] = item.experts.length > 0 ? item.base_cost + item.coordinator_cost + item.experts.map((val: { remark_count: number }) => val.remark_count * item.remark_cost).reduce((acc: any, num: any) => acc + num, 0) : 0
        data['Стоимость НПА с НДС' as keyof typeof data] = item.experts.length > 0 ? Math.round((item.base_cost + item.coordinator_cost + item.experts.map((val: { remark_count: number }) => val.remark_count * item.remark_cost).reduce((acc: any, num: any) => acc + num, 0)) * 1.12) : 0
        return data
    })
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8';
    const fileExtension = '.xlsx'


    const exportToExcel = async (fileName: string) => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        ws['!cols'] = [...Array(Object.keys(excelData[0]).length)].map((_, index) => {
            if (index == 0) { return { wpx: 50 } }
            if (index < 4) { return { wpx: 200 } }
            else { return { wpx: 150 } }
        })
        ws['!rows'] = [...Array(excelData.length + 1)].map((_, index) => {
            if (index == 0) { return { hpx: 30 } }
            else { return { hpx: 20 } }
        });
        for (let i in ws) {
            if (typeof (ws[i]) != "object") continue;
            let cell = XLSX.utils.decode_cell(i);
            if (cell.c == 0 || cell.c >= 4) { // first column
                ws[i].s = { // bottom border
                    alignment: {
                        horizontal: "center",
                        vertical: "center"
                    }
                };
            }

            if (cell.r == 0) { // first row
                ws[i].s = { // bottom border
                    alignment: {
                        horizontal: "center",
                        vertical: "center"
                    },
                    font: {
                        color: { rgb: "ef6262" },
                        bold: true
                    }
                };
            }
            if (cell.r % 2) { // every other row

            }
        }
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (
        <button className='c-btn c-btn-blue' onClick={e => exportToExcel(fileName)} >Экспорт в Excel</button>
    )
}

export default ExportExcel