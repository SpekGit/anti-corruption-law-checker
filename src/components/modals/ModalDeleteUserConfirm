import { t } from 'i18next';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Portal } from '.'
import IconsContent from '../../assets/icons/IconsContent';
import { UserServices } from '../../services/UserServices';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
    userData: any
};
const ModalDeleteUserConfirm: React.FC<Props> = ({ close, open, userData }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
    const deleteUser = () => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        UserServices.deleteUser(userData.id)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); navigate('/users'); close(false) })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })
    }
    return (
        <>
            <Portal close={close} open={open}>
                <p className='modal__icon'>{IconsContent.Ask()}</p>
                <p className='modal__ask'>{t("confirm_delete_user")}</p>
                <div className='modal__buttons'>
                    <button className='c-btn c-btn-green' onClick={() => deleteUser()}>{t("confirm")}</button>
                    <button className='c-btn c-btn-blue' onClick={() => close(false)}>{t("close_modal")}</button>
                </div>
            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />

        </>
    )
}

export default ModalDeleteUserConfirm
