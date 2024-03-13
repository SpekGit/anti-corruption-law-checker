import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
    asideItem: number,
    clearData?: Function
};
const ModalAddCatalog: React.FC<Props> = ({ close, open, clearData, asideItem }) => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation('common')
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        mode: 'onBlur', resolver: yupResolver(CatalogItem)
    })

    const onSubmit = (catalogData: any) => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.addAuthorityDevelopers(catalogData)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })

    }
    return (
        <>
            <Portal close={close} open={open} clearData={clearData}>
                <p className='modal__heading'>{t("add_authority_development")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReactInput register={register} required={true} edited={true} title={'name_element_kk'} name={'name_kk'} error={errors} />
                    <ReactInput register={register} required={true} edited={true} title={'name_element_ru'} name={'name_ru'} error={errors} />
                    <div className='modal__buttons'>
                        <button className='c-btn c-btn-green'>{t("save")}</button>
                        <button type='button' className='c-btn c-btn-blue' onClick={() => { close(false); clearData && clearData(null) }}>{t("close_modal")}</button>
                    </div>
                </form>
            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />
        </>
    )
}

export default ModalAddCatalog