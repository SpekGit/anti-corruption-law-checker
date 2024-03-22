import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Portal } from '.'
import { AddOpinion } from '../../constants/validation';
import { OtherServices } from '../../services/Others';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
};
const ModalAddOpinion: React.FC<Props> = ({ close, open }) => {
    let project_id = Number(useLocation().pathname.replace(/[a-z\/]/g, ''))
    const dispatch = useDispatch()
    const [clear, setClear] = React.useState<boolean>(false)
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        mode: 'onBlur', resolver: yupResolver(AddOpinion)
    })

    const onSubmit = (opinionData: any) => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        OtherServices.addOpinion(project_id, opinionData)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
    }

    return (
        <>
            <Portal close={close} open={open} >
                <p className='modal__heading'>{t("add_opinion")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-item'>
                        <p className='form-item__read-only--title'>{t('add_opinion_kk')}</p>
                        <textarea {...register('dissenting_opinion_of_the_coordinator_kk')}/>

             
                        {errors.dissenting_opinion_of_the_coordinator_kk && <p className='form-item__error'> <>{errors?.dissenting_opinion_of_the_coordinator_kk.message}</></p>}
                    </div>
                    <div className='form-item'>
                        <p className='form-item__read-only--title'>{t('add_opinion_ru')}</p>
                        <textarea {...register('dissenting_opinion_of_the_coordinator_ru')}/>
                        {errors.dissenting_opinion_of_the_coordinator_ru && <p className='form-item__error'> <>{errors?.dissenting_opinion_of_the_coordinator_ru.message}</></p>}
                    </div>
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

export default ModalAddOpinion