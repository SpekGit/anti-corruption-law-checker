import { yupResolver } from '@hookform/resolvers/yup';
import { title } from 'process';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Portal } from '.'
import { ICatalogItem } from '../../constants/interfaces';
import { AddCoordinator, CatalogItem } from '../../constants/validation';
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
const ModalAddCoordinator: React.FC<Props> = ({ close, open }) => {
    let project_id = Number(useLocation().pathname.replace(/[a-z\/]/g, ''))
    const { t, i18n } = useTranslation('common')
    const dispatch = useDispatch()
    const [coordinators, setCoordinators] = React.useState([])
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        mode: 'onBlur', resolver: yupResolver(AddCoordinator)
    })


    const onSubmit = (coordinatorData: any) => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        ProjectsServices.editProject(project_id, coordinatorData)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })

    }
    React.useEffect(() => {
        open && UserServices.getCoordinators(1, '', 100)
            .then((response: any) => {
                let arr = response.data.data.map((item: { id: number; full_name: string }) => { return { value: item.id, label: item.full_name } });
                setCoordinators(arr)
            })
            .catch(err => console.log(err))
    }, [open])
    return (
        <>
            <Portal close={close} open={open} isOverFlow clearData={reset}>
                <p className='modal__heading'>{t("choose_coordinator")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <ReactSelect name={'coordinator_id'} required={true} control={control} edited={true} error={errors} options={coordinators} title={t("full_name")} />
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

export default ModalAddCoordinator