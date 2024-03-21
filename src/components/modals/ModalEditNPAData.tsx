import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Portal } from '.'
import { INPA, INPAReport } from '../../constants/interfaces';
import { AddNPAData } from '../../constants/validation';
import { OtherServices } from '../../services/Others';
import { DatePickerInput } from '../ReactDatePicker';
import ReactInput from '../ReactInput';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
    editNPAData: INPA
};
const ModalEditNPAData: React.FC<Props> = ({ close, open, editNPAData }) => {
    const dispatch = useDispatch()
    const [clear, setClear] = React.useState<boolean>(false)
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        mode: 'onBlur', defaultValues: { date_of_adoption: editNPAData.npa_data.date_of_adoption }, resolver: yupResolver(AddNPAData)
    })

    const onSubmit = (npaData: any) => {
        npaData = { ...npaData, project_id: editNPAData.id }
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.editNPAData(editNPAData.id, npaData)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
    }

    return (
        <>
            <Portal close={close} open={open} >
                <p className='modal__heading'>{t("npa_heading_edit")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReactInput edited={true} register={register} name={"npa_link"} required={true} error={errors} title={'npa_link'} defaultValue={editNPAData?.npa_data.npa_link} />
                    <ReactInput edited={true} register={register} name={"accepted_npa_number"} required={true} error={errors} title={'npa_number'} defaultValue={editNPAData?.npa_data.accepted_npa_number} />
                    <ReactInput edited={true} register={register} name={"accepted_npa_name_kk"} required={true} error={errors} title={'npa_name_kk'} defaultValue={editNPAData?.npa_data.locales.kk} />
                    <ReactInput edited={true} register={register} name={"accepted_npa_name_ru"} required={true} error={errors} title={'npa_name_ru'} defaultValue={editNPAData?.npa_data.locales.ru} />
                    <ReactInput edited={true} max={2} register={register} name={"accepted_recommendations"} required={true} error={errors} title={'notice_npa'} defaultValue={editNPAData?.accepted_recommendations} />
                    <DatePickerInput name={'date_of_adoption'} control={control} clear={clear} title={t("npa_accepted_date")} edited={true} required={true} error={errors} defaultValue={editNPAData.npa_data.date_of_adoption} />
                    <div className='modal__buttons'>
                        <button className='c-btn c-btn-green'>{t("save")}</button>
                        <button type='button' className='c-btn c-btn-blue' onClick={() => close()}>{t("close_modal")}</button>
                    </div>
                </form>
            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />
        </>
    )
}

export default ModalEditNPAData