import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import { title } from 'process';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Portal } from '.'
import { AddCorrector} from '../../constants/validation';
import { OtherServices } from '../../services/Others';
import { ProjectsServices } from '../../services/ProjectServices';
import { UserServices } from '../../services/UserServices';
import ReactSelect from '../ReactSelect';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
};
const ModalAddCorrector: React.FC<Props> = ({ close, open }) => {
    let project_id = Number(useLocation().pathname.replace(/[a-z\/]/g, ''))
    const dispatch = useDispatch()
    const [correctors, setCorrectors] = React.useState([])
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        mode: 'onBlur', resolver: yupResolver(AddCorrector)
    })


    const onSubmit = (correctorData: any) => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        ProjectsServices.editProject(project_id, correctorData)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })

    }
    React.useEffect(() => {
        open && UserServices.getCorrectors(1, '', 100)
            .then((response: any) => {
                let arr = response.data.data.map((item: { id: number; full_name: string }) => { return { value: item.id, label: item.full_name } });
                setCorrectors(arr)
            })
            .catch(err => console.log(err))
    }, [open])
    return (
        <>
            <Portal close={close} open={open} isOverFlow clearData={reset}>
                <p className='modal__heading'>{t("choose_corrector")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <ReactSelect name={'corrector_id'} required={true} control={control} edited={true} error={errors} options={correctors} title={t("full_name")} />
                    <div className='modal__buttons'>
                        <button className='c-btn c-btn-green'>{t("save")}</button>
                        <button type='button' className='c-btn c-btn-blue' onClick={() => { reset(); close(false) }}>{t("close_modal")}</button>
                    </div>
                </form>
            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />
        </>
    )
}

export default ModalAddCorrector