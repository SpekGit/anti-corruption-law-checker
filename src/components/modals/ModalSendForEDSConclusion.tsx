import { t } from 'i18next';
import React from 'react'
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
const ModalAssignConclusion: React.FC<Props> = ({ close, open, conclusionId }) => {
    const dispatch = useDispatch()
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
    const assignConclusion = () => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        ConclusionsServices.changeConclusion(conclusionId, { status_id: 14 })
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
    }
    return (
        <>
            <Portal close={close} open={open}>
                <p className='modal__icon'>{IconsContent.Ask()}</p>
                <p className='modal__ask'>{t("send_to_expert_for_eds")}</p>
                <div className='modal__buttons'>
                    <button className='c-btn c-btn-green' onClick={() => assignConclusion()}>{t("confirm")}</button>
                    <button className='c-btn c-btn-blue' onClick={() => close(false)}>{t("close_modal")}</button>
                </div>
            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />

        </>
    )
}

export default ModalAssignConclusion