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


