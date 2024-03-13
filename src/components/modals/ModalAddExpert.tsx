import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Portal } from '.'
import { IProject, IUser, LocalesName } from '../../constants/interfaces';
import { ProjectsServices } from '../../services/ProjectServices';
import { UserServices } from '../../services/UserServices';
import { DatePickerInput } from '../ReactDatePicker';
import ReactSelect from '../ReactSelect';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
    projectData: IProject
};
const ModalAddExpert: React.FC<Props> = ({ close, open, projectData }) => {
    let project_id = Number(useLocation().pathname.replace(/[a-z\/]/g, ''))
    const dispatch = useDispatch()
    const [clear, setClear] = React.useState<boolean>(false)
    const [experts, setExperts] = React.useState([])
    const [expertRecomend, setExpertRecomend] = React.useState<any>()
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        mode: 'onBlur'
    })

    const [hidden, setHidden] = React.useState(false)
    if (open) {
        setTimeout(() => {
            setHidden(true)
        }, 3000);
    }

    const closeModal = () => {
        UserServices.saveExpertRecomend(expertRecomend?.id);
        reset();
        setHidden(false)
        setExpertRecomend(null)
        close(false)
    }

    const onSubmit = (expertData: any) => {
        const expert = {
            members: [
                {
                    expert_id: expertData.expert_id ? expertData.expert_id : expertRecomend?.expert.id,
                    note: expertData.note ? expertData.note : "",
                    deadline: expertData.deadline,
                }
            ]
        }
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        ProjectsServices.editProject(project_id, expert)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })

    }
    React.useEffect(() => {
        open && UserServices.getExperts(1, '', 100)
            .then((response: any) => {
                let arr = response.data.data.filter((item: { id: number; available: number, branch_of_legislations: any }) =>
                    item.available == 1 &&
                    !projectData?.conclusions.map(dat => dat.expert.id).includes(item.id) &&
                    projectData.branch_of_legislations.some(val => item.branch_of_legislations.map((i: any) => i.id).includes(val.id)))
                    .map((item: { id: number; full_name: string }) => {
                        return { value: item.id, label: item.full_name }
                    });
                setExperts(arr)
            })
            .catch(err => console.log(err))
        open && UserServices.getExpertRecomend(project_id)
            .then((response: any) => { setExpertRecomend(response.data.data) })
            .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
    }, [open, clear])
    console.log(experts)

    return (
        <>
            <Portal close={closeModal} open={open} >
                <p className='modal__heading'>{t("choose_expert")}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-item modal__expert-preloader--wrapper'>
                        <p className='form-item__read-only--title'>{t("choose_expert_from")} {hidden ? expertRecomend ? expertRecomend.count : 0 : ""}</p>
                        <input type="text" className={hidden ? "none" : ""} defaultValue={"Идет подбор экспертов"} />
                        {expertRecomend && <input type="text" className={!hidden ? "none" : ""} defaultValue={expertRecomend?.expert.full_name} />}
                        {!expertRecomend && <input type="text" className={!hidden ? "none" : ""} defaultValue={"Подходящих экспертов не найдено"} />}
                        <div className={hidden ? "none" : "modal__expert-preloader--div"}></div>
                    </div>
                    <ReactSelect name={'expert_id'} defaultValue={hidden && expertRecomend?.expert} clear={clear} required={expertRecomend ? false : "Выберите эксперта"} control={control} edited={true} error={errors} options={experts} title={t("choose_expert_manual")} />
                    <DatePickerInput name={'deadline'} control={control} clear={clear} title={t("deadline")} edited={true} required={"Выберите дату"} error={errors} />
                    <div className='form-item '>
                        <p className='form-item'>{t("coordinator_comment")}</p>
                        <textarea {...register("note")}></textarea>
                    </div>
                    <div className='modal__buttons'>
                        <button className='c-btn c-btn-green'>{t("save")}</button>
                        <button type='button' className='c-btn c-btn-blue' onClick={() => closeModal()}>{t("close_modal")}</button>
                    </div>
                </form>
            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />
        </>
    )
}

export default ModalAddExpert