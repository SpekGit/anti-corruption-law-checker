import React from 'react';
import Wrapper from '../components/Wrapper';
import { useTranslation } from 'react-i18next';
import IconsContent from '../assets/icons/IconsContent';
import { useDispatch, useSelector } from 'react-redux';
import { TableFirst } from '../components/TableFirst';
import Pagination from '@mui/material/Pagination';

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
    
    return (
        <Wrapper>
            <h2>{t("catalogs")}</h2>
            <div className='container'>
                <div className='project-content'>
                    <aside>
                        <ul>
                            <li className="aside-active">{IconsContent.Folder()}{t("document_type")} <span>{documentTypes?.meta?.total}</span></li>
                        </ul>
                    </aside>
                    <section>
                        <div className='search-panel'>
                            <div className='search-panel__input'>
                                <input type="text" placeholder={`${t("search")}`} />
                                {IconsContent.Search()}
                            </div>
                        </div>
                        <table>
                            {/* Table layout simplified for brevity */}
                        </table>
                        <div className="pagination">
                            {/* Pagination simplified for brevity */}
                            <Pagination count={10} page={page} onChange={(event, value) => setPage(value)} variant="outlined" shape="rounded" />
                        </div>
                    </section>
                </div>
            </div>
        </Wrapper>
    );
};

export default Catalogs;