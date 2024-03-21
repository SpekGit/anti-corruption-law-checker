import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Portal } from '.'
import { ICatalogItem } from '../../constants/interfaces';
import { CatalogItem } from '../../constants/validation';
import { OtherServices } from '../../services/Others';
import ReactInput from '../ReactInput';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
    catalogData: ICatalogItem,
    asideItem: number,
    clearData?: Function
};
const ModalEditCatalog: React.FC<Props> = ({ close, open, catalogData, clearData, asideItem }) => {
    const dispatch = useDispatch()
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        mode: 'onBlur', resolver: yupResolver(CatalogItem)
    })

    console.log(catalogData)
    const onSubmit = (catalogDataEdited: any) => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        asideItem == 1 && OtherServices.editDocumentTypes(catalogData.id, catalogDataEdited)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
        asideItem == 2 && OtherServices.editAuthorityDevelopers(catalogData.id, catalogDataEdited)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
        asideItem == 3 && OtherServices.editBranchOfLegislation(catalogData.id, catalogDataEdited)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
        asideItem == 4 && OtherServices.editCatos(catalogData.id, catalogDataEdited)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
        asideItem == 5 && OtherServices.editRiskFactors(catalogData.id, catalogDataEdited)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
        asideItem == 6 && OtherServices.editCorruptionRisks(catalogData.id, catalogDataEdited)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
    }
    let title = asideItem == 1 ? t("edit_document_types") : asideItem == 2 ? t("edit_authority_development") : asideItem == 3 ? t("edit_branch_of_legislation") : asideItem == 4 ? t("edit_catos") : asideItem == 5 ? t("edit_risk_factors") : t("edit_corruption_risks")
    return (
        <>
            <Portal close={close} open={open} clearData={clearData}>
                <p className='modal__heading'>{title}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReactInput register={register} required={true} edited={true} title={'name_element_kk'} name={'name_kk'} error={errors} defaultValue={catalogData?.locales?.name?.kk} />
                    <ReactInput register={register} required={true} edited={true} title={'name_element_ru'} name={'name_ru'} error={errors} defaultValue={catalogData?.locales?.name?.ru} />
                    {asideItem == 1 && <ReactInput register={register} required={true} edited={true} title={'groupNPA_kk'} name={'group_kk'} error={errors} defaultValue={catalogData?.locales?.group?.kk} />}
                    {asideItem == 1 && <ReactInput register={register} required={true} edited={true} title={'groupNPA_ru'} name={'group_ru'} error={errors} defaultValue={catalogData?.locales?.group?.ru} />}
                    {asideItem == 1 && <ReactInput register={register} required={true} edited={true} title={'base_index'} name={'base_cost'} error={errors} defaultValue={catalogData?.base_cost} />}
                    {asideItem == 1 && <ReactInput register={register} required={true} edited={true} title={'remark_cost'} name={'remark_cost'} error={errors} defaultValue={catalogData?.remark_cost} />}
                    {asideItem == 1 && <ReactInput register={register} required={true} edited={true} title={'coordinator_cost'} name={'coordinator_cost'} error={errors} defaultValue={catalogData?.locales.coordinator_cost} />}
                    <div className='modal__buttons'>
                        <button className='c-btn c-btn-green'>{t("save")}</button>
                        <button type='button' className='c-btn c-btn-blue' onClick={() => { close(false); clearData && clearData(null) }}>{t("close_modal")}</button>
                    </div>
                </form>
            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} clearData={clearData} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />
        </>
    )
}

export default ModalEditCatalog