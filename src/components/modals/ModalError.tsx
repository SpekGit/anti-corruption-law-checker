import { t } from 'i18next';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Portal } from '.';
import IconsContent from '../../assets/icons/IconsContent';

type Props = {
  close: Function;
  open: boolean;
  errorMessage?: any;
  clearData?: Function
}

const ModalError: React.FC<Props> = ({ close, open, errorMessage, clearData }) => {

  return (
    <Portal close={close} open={open} clearData={clearData}>
      <p className='modal__icon'>{IconsContent.Error()}</p>
      <p className='modal__ask'>{t("error")}</p>
      <p className='modal__error-message'>{errorMessage && errorMessage.message}</p>
      {/* <p className='modal__error-message--details'>{errorMessage&&errorMessage.response.data.errors[0].map((item: any)=>item)}</p> */}
      <div className='modal__buttons'>
        <button className='c-btn c-btn-blue' onClick={() => { close(false); clearData && clearData(null) }}>{t("close_modal")}</button>
      </div>
    </Portal>
  )
}

export default ModalError
