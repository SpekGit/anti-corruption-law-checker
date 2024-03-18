import { t } from 'i18next';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Portal } from '.'
import IconsContent from '../../assets/icons/IconsContent';
import { ConclusionsServices } from '../../services/ConclusionsServices';
import { ProjectsServices } from '../../services/ProjectServices';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
    conclusionId: number
};
type FormValues = {
    comment: string;
};
const ModalReviseConclusion: React.FC<Props> = ({ close, open, conclusionId }) => {
    const dispatch = useDispatch()
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: "onBlur" });
    
    const onSubmit = (comment:any) => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        ConclusionsServices.changeConclusion(conclusionId, { ...comment, status_id: 10})
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
    }
    return (
        <>
            <Portal close={close} open={open} clearData={reset}>
                <p className='modal__icon'>{IconsContent.Ask()}</p>
                <form onSubmit={handleSubmit(onSubmit)} className='form-item modal__form'>
                    <p className='modal__ask'>{t("reasons_of_revision")}</p>
                    <textarea {...register("comment", { required: "Заполните обязательное поле"})}></textarea>
                    {errors?.comment && <p className='form-item__error'>{errors.comment.message}</p>}
                    <div className='modal__buttons'>
                        <button className='c-btn c-btn-green'>{t("confirm")}</button>
                        <button type='submit' className='c-btn c-btn-blue' onClick={() => {close(false);reset()}}>{t("close_modal")}</button>
                    </div>
                </form>
            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />

        </>
    )
}

export default ModalReviseConclusion
