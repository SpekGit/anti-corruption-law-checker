import React from 'react';
import Wrapper from '../components/Wrapper';
import { useTranslation } from 'react-i18next';
import IconsContent from '../assets/icons/IconsContent';
import { useDispatch, useSelector } from 'react-redux';
import { TableFirst } from '../components/TableFirst';
import Pagination from '@mui/material/Pagination';

const Catalogs = () => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const documentTypes = useSelector((state) => state.documentTypes);
    const [page, setPage] = React.useState<number>(1);
    const perPage = 8;

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