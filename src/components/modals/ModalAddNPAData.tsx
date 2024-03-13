import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Portal } from '.'
import { AddNPAData } from '../../constants/validation';
import { OtherServices } from '../../services/Others';
import { ProjectsServices } from '../../services/ProjectServices';
import { UserServices } from '../../services/UserServices';
import { DatePickerInput } from '../ReactDatePicker';
import ReactInput from '../ReactInput';
import ReactSelect from '../ReactSelect';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
};
const ModalAddNPAData: React.FC<Props> = ({ close, open }) => {
    let project_id = Number(useLocation().pathname.replace(/[a-z\/]/g, ''))
    const dispatch = useDispatch()
    const [clear, setClear] = React.useState<boolean>(false)
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        mode: 'onBlur', resolver: yupResolver(AddNPAData)
    })

    const onSubmit = (npaData: any) => {
        npaData = { ...npaData, project_id: project_id }
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.addNPAData(npaData)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
    }

    return (
        <>
            <Portal close={close} open={open} >
                <p className='modal__heading'>{t("npa_heading")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReactInput edited={true} register={register} name={"npa_link"} required={true} error={errors} title={'npa_link'} />
                    <ReactInput edited={true} register={register} name={"accepted_npa_number"} required={true} error={errors} title={'npa_number'} />
                    <ReactInput edited={true} register={register} name={"accepted_npa_name_kk"} required={true} error={errors} title={'npa_name_kk'} />
                    <ReactInput edited={true} register={register} name={"accepted_npa_name_ru"} required={true} error={errors} title={'npa_name_ru'} />
                    <DatePickerInput name={'date_of_adoption'} control={control} clear={clear} title={t("npa_accepted_date")} edited={true} required={true} error={errors} />
                    <ReactInput edited={true} max={2} register={register} name={"accepted_recommendations"} required={true} error={errors} title={'notice_npa'} />
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

export default ModalAddNPAData