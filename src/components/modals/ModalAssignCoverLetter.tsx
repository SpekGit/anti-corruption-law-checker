
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Portal } from '.'
import IconsContent from '../../assets/icons/IconsContent';
import { AssignByEDS } from '../../constants/validation';
import { ConclusionsServices } from '../../services/ConclusionsServices';
import { CoverLettersServices } from '../../services/CoverLettersServices';
import { ProjectsServices } from '../../services/ProjectServices';
import ReactInput, { ReactInputFile } from '../ReactInput';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
    coverLetterId: number
};
type FormValues = {
    password: string;
};
const ModalAssignCoverLetter: React.FC<Props> = ({ close, open, coverLetterId }) => {
    const dispatch = useDispatch()
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
    const [submited, setSubmited] = React.useState<boolean>(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ mode: "onBlur", resolver: yupResolver(AssignByEDS) });

    const onSubmit = (comment: any) => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        var formdata = new FormData();
        formdata.append("_method", "put");
        formdata.append("eds[password]", comment.password);
        formdata.append("eds[file]", comment.file3[0])
        CoverLettersServices.assignCoverLetter(coverLetterId, formdata)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
    }
    return (
        <>
            <Portal close={close} open={open}>
                <form onSubmit={handleSubmit(onSubmit)} className='form-item modal__form modal__eds'>
                    <h3>{t("assign_cover_letter_by_eds")}</h3>
                    <ReactInputFile edited={true} fileNotice={"ВЫберите файл RSA для подписи"} submited={submited} register={register} name={"file3"} required={true} error={errors} title={''} accept={".p12"} />
                    <ReactInput type={"password"} edited={true} register={register} name={"password"} required={true} error={errors} title={"input_password"} />
                    <div className='modal__buttons'>
                        <button className='c-btn c-btn-green' onClick={() => { setSubmited(true) }}>{t("confirm")}</button>
                        <button type='submit' className='c-btn c-btn-blue' onClick={() => close(false)}>{t("close_modal")}</button>
                    </div>
                </form>
            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />

        </>
    )
}

export default ModalAssignCoverLetter