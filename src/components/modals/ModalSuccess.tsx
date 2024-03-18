import { t } from 'i18next';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Portal } from '.'
import IconsContent from '../../assets/icons/IconsContent'

type Props ={
    open:boolean;
    close:Function;
    openSuccessRelocate?:string
}

const ModalSuccess: React.FC<Props> = ({ close, open, openSuccessRelocate }) => {
    const navigate = useNavigate()
  return (
      <Portal close={close} open={open}>
          <p className='modal__icon'>{IconsContent.Success()}</p>
          <p className='modal__ask'>{t("success")}</p>
          <div className='modal__buttons'>
              <button className='c-btn c-btn-blue' onClick={() => { close(false); openSuccessRelocate&&openSuccessRelocate!==""? navigate(openSuccessRelocate):window.location.reload() }}>{t("close_modal")}</button>
          </div>
      </Portal>
  )
}

export default ModalSuccess
