import React from 'react'
import Wrapper from '../components/Wrapper'
import { useTranslation } from 'react-i18next'
import IconsContent from '../assets/icons/IconsContent'
import { ProjectsServices } from '../services/ProjectServices'
import { useDispatch, useSelector } from 'react-redux'
import { TableFirst } from '../components/TableFirst'
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import Filter from '../components/Filter'
import { OtherServices } from '../services/Others'
import { ICatalogItem, ICatalogs, LocalesName } from '../constants/interfaces'
import ModalEditCatalog from '../components/modals/ModalEditCatalog'
import ModalAddCatalog from '../components/modals/ModalAddCatalog'

const Catalogs = () => {
    const { t, i18n } = useTranslation('common')
    const currentUser = useSelector((state: any) => state.currentUser)
    const dispatch = useDispatch()
    const perPage = 8
    const [catalogData, setCatalogData] = React.useState<ICatalogItem | null>()

    const [documentTypes, setDocumentTypes] = React.useState<ICatalogs>()
    const [branchesOfLegislations, setBranchesOfLegislations] = React.useState<ICatalogs>()
    const [authoritiesDevelopers, setAuthoritiesDevelopers] = React.useState<ICatalogs>()
    const [catos, setCatos] = React.useState<ICatalogs>()
    const [riskFactors, setRiskFactors] = React.useState<ICatalogs>()
    const [corruptionRisks, setCorruptionRisks] = React.useState<ICatalogs>()

    const [filterDataDC, setFilterDataDC] = React.useState<string>('')
    const [filterDataAD, setFilterDataAD] = React.useState<string>('')
    const [filterDataBOL, setFilterDataBOL] = React.useState<string>('')
    const [filterDataCT, setFilterDataCT] = React.useState<string>('')
    const [filterDataRF, setFilterDataRF] = React.useState<string>('')
    const [filterDataCR, setFilterDataCR] = React.useState<string>('')

    const [asideItem, setAsideItem] = React.useState<number>(1)

    const [pageDC, setPageDC] = React.useState<number>(1)
    const [pageAD, setPageAD] = React.useState<number>(1)
    const [pageBOL, setPageBOL] = React.useState<number>(1)
    const [pageCT, setPageCT] = React.useState<number>(1)
    const [pageRF, setPageRF] = React.useState<number>(1)
    const [pageCR, setPageCR] = React.useState<number>(1)

    const orderby1 = useSelector((state: any) => state.orderBy1)
    const orderby2 = useSelector((state: any) => state.orderBy2)
    const orderby3 = useSelector((state: any) => state.orderBy3)
    const orderby4 = useSelector((state: any) => state.orderBy4)
    const orderby5 = useSelector((state: any) => state.orderBy5)
    const orderby6 = useSelector((state: any) => state.orderBy6)

    const [open, setOpen] = React.useState<boolean>(false)
    const [openAddCatalog, setOpenAddCatalog] = React.useState(false)

    React.useEffect(() => {
        // dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.getDocumentTypes(pageDC, perPage, filterDataDC, orderby1)
            .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setDocumentTypes(response.data); })
            .catch(err => console.log(err))
    }, [pageDC, filterDataDC, orderby1])

    React.useEffect(() => {
        // dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.getAuthorityDevelopers(pageAD, perPage, filterDataAD, orderby2)
            .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setAuthoritiesDevelopers(response.data) })
            .catch(err => console.log(err))
    }, [pageAD, filterDataAD, orderby2])

    React.useEffect(() => {
        // dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.getBranchOfLegislation(pageBOL, perPage, filterDataBOL, orderby3)
            .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setBranchesOfLegislations(response.data) })
            .catch(err => console.log(err))
    }, [pageBOL, filterDataBOL, orderby3])

    React.useEffect(() => {
        // dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.getCatos(pageCT, perPage, filterDataCT, orderby4)
            .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setCatos(response.data) })
            .catch(err => console.log(err))
    }, [pageCT, filterDataCT, orderby4])

    React.useEffect(() => {
        // dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.getRiskFactors(pageRF, perPage, filterDataRF, orderby5)
            .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); console.log(response); setRiskFactors(response.data) })
            .catch(err => console.log(err))
    }, [pageRF, filterDataRF, orderby5])

    React.useEffect(() => {
        // dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.getCorruptionRisks(pageCR, perPage, filterDataCR, orderby6)
            .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); console.log(response); setCorruptionRisks(response.data) })
            .catch(err => console.log(err))
    }, [pageCR, filterDataCR, orderby6])


    let renderCatalog = asideItem == 1 ? documentTypes : asideItem == 2 ? authoritiesDevelopers : asideItem == 3 ? branchesOfLegislations : asideItem == 4 ? catos : asideItem == 5 ? riskFactors : corruptionRisks
    let page = asideItem == 1 ? pageDC : asideItem == 2 ? pageAD : asideItem == 3 ? pageBOL : asideItem == 4 ? pageCT : asideItem == 5 ? pageRF : pageCR
    let setPage = asideItem == 1 ? setPageDC : asideItem == 2 ? setPageAD : asideItem == 3 ? setPageBOL : asideItem == 4 ? setPageCT : asideItem == 5 ? setPageRF : setPageCR
    let asideItemName = asideItem == 1 ? t("document_type") : asideItem == 2 ? t("authority_developer") : asideItem == 3 ? t("branch_of_legiclation") : asideItem == 4 ? t("catos") : asideItem == 5 ? t("risk_factors") : t("corruption_risks")
    let setFilterData = asideItem == 1 ? setFilterDataDC : asideItem == 2 ? setFilterDataAD : asideItem == 3 ? setFilterDataBOL : asideItem == 4 ? setFilterDataCT : asideItem == 5 ? setFilterDataRF : setFilterDataCR

    return (
        <Wrapper>
            <h2>{t("catalogs")}</h2>
            <div className='container'>
                <div className='project-content'>
                    <aside>
                        <ul>
                            <li onClick={() => setAsideItem(1)} className={asideItem == 1 ? "aside-active" : ""}>{IconsContent.Folder()}{t("document_type")} <span>{documentTypes?.meta?.total}</span> </li>
                            <li onClick={() => setAsideItem(2)} className={asideItem == 2 ? "aside-active" : ""}>{IconsContent.FolderAccepted()}{t("authority_developer")} <span>{authoritiesDevelopers?.meta?.total}</span> </li>
                            <li onClick={() => setAsideItem(3)} className={asideItem == 3 ? "aside-active" : ""}>{IconsContent.FolderPending()}{t("branch_of_legiclation")} <span>{branchesOfLegislations?.meta?.total}</span> </li>
                            <li onClick={() => setAsideItem(4)} className={asideItem == 4 ? "aside-active" : ""}>{IconsContent.FolderCompleted()}{t("catos")} <span>{catos?.meta?.total}</span> </li>
                            <li onClick={() => setAsideItem(5)} className={asideItem == 5 ? "aside-active" : ""}>{IconsContent.FolderCompleted()}{t("risk_factors")} <span>{riskFactors?.meta?.total}</span> </li>
                            <li onClick={() => setAsideItem(6)} className={asideItem == 6 ? "aside-active" : ""}>{IconsContent.FolderCompleted()}{t("corruption_risks")} <span>{corruptionRisks?.meta?.total}</span> </li>
                        </ul>
                    </aside>
                    <section>
                        <div className='search-panel'>
                            <div className='search-panel__input'>
                                <input type="text" placeholder={`${t("search")}`} onChange={(e) => { setTimeout(() => { setFilterData(`filter[name]=${e.target.value}`) }, 1000) }} />
                                {IconsContent.Search()}
                            </div>
                            {currentUser.role == "administrator" && asideItem == 2 && <button className='c-btn c-btn-red' onClick={() => setOpenAddCatalog(true)}>{t("add_catalog")}</button>}
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <TableFirst orderBy={asideItem} />
                                    <td >{asideItemName}</td>
                                    {asideItem == 1 && <td className='catalog-dc'>{t("base_index")}</td>}
                                    {asideItem == 1 && <td className='catalog-dc'>{t("remark_cost")}</td>}
                                    {asideItem == 1 && <td className='catalog-dc'>{t("groupNPA")}</td>}
                                    {asideItem == 1 && <td className='catalog-dc'>{t("coordinator_cost")}</td>}
                                    <td className={'table-last'}></td>
                                </tr>
                            </thead>
                            <tbody>
                                {renderCatalog && renderCatalog.data.map((item: ICatalogItem, index: number) =>
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.locales.name[i18n.language as keyof LocalesName]}</td>
                                        {asideItem == 1 && <td className='catalog-dc'>{item.base_cost}</td>}
                                        {asideItem == 1 && <td className='catalog-dc'>{item.remark_cost}</td>}
                                        {asideItem == 1 && <td className='catalog-dc'>{item.locales?.group[i18n.language as keyof LocalesName]}</td>}
                                        {asideItem == 1 && <td className='catalog-dc'>{item.locales.coordinator_cost}</td>}
                                        <td>
                                            {(currentUser.role == "administrator" || (currentUser.role == "economist" && asideItem == 1)) && <span onClick={() => { setCatalogData(item); setOpen(true) }}>{IconsContent.Edit()}</span>}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="pagination">
                            <p className='pagination__number'>Найдено: {renderCatalog?.meta?.total}</p>
                            {renderCatalog && renderCatalog?.meta?.total > renderCatalog?.meta?.per_page ?
                                <Pagination count={Math.ceil(renderCatalog?.meta.total / renderCatalog?.meta?.per_page)} page={page} onChange={(event, value) => { dispatch({ type: "SET_LOADING_TRUE", payload: true }); setPage(value) }} variant="outlined" shape="rounded" /> : null}
                        </div>
                    </section>
                </div>
            </div>
            {catalogData && <ModalEditCatalog catalogData={catalogData} close={setOpen} clearData={setCatalogData} open={open} asideItem={asideItem} />}
            <ModalAddCatalog close={setOpenAddCatalog} open={openAddCatalog} asideItem={3} />
        </Wrapper>
    )
}

export default Catalogs


