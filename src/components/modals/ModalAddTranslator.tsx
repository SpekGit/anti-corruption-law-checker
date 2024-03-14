import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import { title } from 'process';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Portal } from '.'
import { AddTranslator } from '../../constants/validation';
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
const ModalAddTranslator: React.FC<Props> = ({ close, open }) => {
  let project_id = Number(useLocation().pathname.replace(/[a-z\/]/g, ''))
  const dispatch = useDispatch()
  const [translators, setTranslators] = React.useState([])
  const [openError, setOpenError] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<any>()
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    mode: 'onBlur', resolver: yupResolver(AddTranslator)
  })


  const onSubmit = (translatorData: any) => {
    dispatch({ type: "SET_LOADING_TRUE", payload: true })
    ProjectsServices.editProject(project_id, translatorData)
      .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
      .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })

  }
  React.useEffect(() => {
    open && UserServices.getTranslators(1, '', 100)
      .then((response: any) => {
        let arr = response.data.data.map((item: { id: number; full_name: string }) => { return { value: item.id, label: item.full_name } });
        setTranslators(arr)
      })
      .catch(err => console.log(err))
  }, [open])
  return (
    <>
      <Portal close={close} open={open} isOverFlow clearData={reset}>
        <p className='modal__heading'>{t("choose_translator")}</p>
        <form onSubmit={handleSubmit(onSubmit)}>

          <ReactSelect name={'translator_id'} required={true} control={control} edited={true} error={errors} options={translators} title={t("full_name")} />
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

export default ModalAddTranslator