import { Pagination } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconsContent from '../assets/icons/IconsContent'
import ExportExcelNPA from '../components/ExportExcellNPA'
import Filter from '../components/Filter'
import ModalEditNPAData from '../components/modals/ModalEditNPAData'
import ModalError from '../components/modals/ModalError'
import { TableFirst } from '../components/TableFirst'
import Wrapper from '../components/Wrapper'
import { INPA, INPAReport, LocalesName } from '../constants/interfaces'
import { OtherServices } from '../services/Others'

const Reports = () => {
    const [page, setPage] = React.useState(1)
    const { t, i18n } = useTranslation('common')
    const [reportsData, setReportsData] = React.useState<INPAReport>()
    const [reportsData2, setReportsData2] = React.useState<INPAReport>()
    const [editNPAData, setEditNPAData] = React.useState<INPA>()
    const dispatch = useDispatch()
    const orderby1 = useSelector((state: any) => state.orderBy1)
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [modalEditNPAData, setModalEditNPAData] = React.useState<boolean>(false)
    const [filteredData, setFilteredData] = React.useState<string>('')
    const [showFilter, setShowFilter] = React.useState<boolean>(false)


    React.useEffect(() => {
        OtherServices.getReports(page, 8, filteredData, orderby1)
            .then(res => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setReportsData(res.data) })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err) })
    }, [filteredData, orderby1])

    React.useEffect(() => {
        OtherServices.getReports(1, 1000, filteredData)
            .then(res => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setReportsData2(res.data) })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err) })
    }, [filteredData])

    return (
        <Wrapper>
            <h2>{t("reports")} </h2>
            <div className='container reports-container'>
                <div className='search-panel'>
                    <button className='c-btn c-btn-secondary' onClick={() => setShowFilter(!showFilter)}>Фильтр {IconsContent.Filter()}</button>
                    <div className='search-panel__input'>
                        <input type="text" placeholder={`${t("search")}`} onChange={(e) => { setTimeout(() => { setFilteredData(`filter[name]=${e.target.value}`) }, 1000) }} />
                        {IconsContent.Search()}
                    </div>
                    {reportsData2 && filteredData && filteredData !== "filter[name]=" && <ExportExcelNPA npaData={reportsData2} fileName={'ExcelNewExport'} />}
                </div>
                <div className='table_wrapper'>
                    <table >
                        <thead>
                            <tr>
                                <TableFirst orderBy={1} />
                                <td style={{ minWidth: "500px" }}>{t("npa_name")}</td>
                                <td style={{ minWidth: "180px" }}>{t("npa_date")}</td>
                                <td style={{ minWidth: "300px" }}>{t("npa_register_number")}</td>
                                <td style={{ minWidth: "300px" }}>{t("experts")}</td>
                                <td style={{ minWidth: "500px" }}>{t("notice_project")}</td>
                                <td style={{ minWidth: "500px" }}>{t("notice_npa")}</td>
                                <td></td>
                                <td className={'last'}></td>
                            </tr>
                        </thead>
                        {reportsData && reportsData.data.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr >
                                        <td>{item.id}</td>
                                        <td >{item?.npa_data.locales[i18n.language as keyof LocalesName]}</td>
                                        <td style={{ textAlign: "center" }}>{item?.npa_data.date_of_adoption.slice(0, 10)}</td>
                                        <td style={{ textAlign: "center" }}>{item?.npa_data.accepted_npa_number}</td>
                                        <td >{item?.experts.map((item: string, index: number) => <span key={index + 27}>{item}</span>)}</td>
                                        <td style={{ textAlign: "center" }}>{item?.project_recommendations}</td>
                                        <td style={{ textAlign: "center" }}>{item?.accepted_recommendations}</td>
                                        <td onClick={() => { setModalEditNPAData(true); setEditNPAData(item) }}>{IconsContent.Edit()}</td>
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table>
                </div >

                <div className="pagination">
                    <p className='pagination__number'>Найдено: {reportsData ? reportsData.meta?.total : "0"}</p>
                    {reportsData && reportsData.meta?.total > reportsData.meta?.per_page ?
                        <Pagination count={Math.ceil(reportsData.meta.total / reportsData.meta?.per_page)} page={page} onChange={(event, value) => { dispatch({ type: "SET_LOADING_TRUE", payload: true }); setPage(value) }} variant="outlined" shape="rounded" /> : null}

                </div>
            </div>
            {editNPAData && <ModalEditNPAData close={setModalEditNPAData} open={modalEditNPAData} editNPAData={editNPAData} />}
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <Filter showFilter={showFilter} setShowFilter={setShowFilter} setPage={setPage} setFilterData={setFilteredData} />
        </Wrapper>

    )
}

export default Reports
