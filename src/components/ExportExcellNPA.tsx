// import * as FileSaver from 'file-saver';
import FileSaver from 'file-saver';
import React from 'react';
import { useDispatch } from 'react-redux';
import XLSX from 'sheetjs-style'
import { INpa, LocalesName } from '../constants/interfaces';
import i18n from '../i18n';

type Props = {
    fileName: string,
    npaData: any
}

const ExportExcelNPA: React.FC<Props> = ({ npaData, fileName}) => {

    const excelData = npaData && npaData.data.map((item: any) => {
        const data = {
            'id': item.id,
            'Наименование принятого НПА': item?.npa_data.locales[i18n.language as keyof LocalesName],
            'Дата принятия': item?.npa_data.date_of_adoption.slice(0, 10),
            'Регистрационный номер': item?.npa_data.accepted_npa_number,
        };
        item.experts.map((ite: string, index: number) => {
            console.log(ite)
            return (
                data['Эксперт ' + (index + 1) as keyof typeof data] = ite
            )
        })
        data['Общее колличество рекомендаций представленных в заключении НПА' as keyof typeof data] = item?.project_recommendations
        data['Общее колличество рекомендаций внесенных в принятый НПА по итогам НАЭ' as keyof typeof data] = item?.accepted_recommendations
        return data
    })
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8';
    const fileExtension = '.xlsx'


    const exportToExcel = async (fileName: string) => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        ws['!cols'] = [...Array(Object.keys(excelData[0]).length)].map((_, index) => {
            if (index == 0) { return { wpx: 50 } }
            if (index == 1) { return { wpx: 300 } }
            if (index == 2) { return { wpx: 150 } }
            if (index == 3) { return { wpx: 200 } }
            if (index == 4) { return { wpx: 200 } }
            else { return { wpx: 450 } }
        })
        ws['!rows'] = [...Array(excelData.length + 1)].map((_, index) => {
            if (index == 0) { return { hpx: 30 } }
            else { return { hpx: 20 } }
        });
        for (let i in ws) {
            if (typeof (ws[i]) != "object") continue;
            let cell = XLSX.utils.decode_cell(i);
            if (cell.c == 0 || cell.c >= 1) { // first column
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

export default ExportExcelNPA