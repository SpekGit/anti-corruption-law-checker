import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { AddCorrectorFile } from '../constants/validation'
import { ConclusionsServices } from '../services/ConclusionsServices'
import ModalError from './modals/ModalError'
import ModalSuccess from './modals/ModalSuccess'
import { ReactInputFile } from './ReactInput'


type PropsForm = {
  conclusionId: number;
  name:string
};

const AddFileCorrectorForm:React.FC<PropsForm> = ({conclusionId, name}) => {
  const { t, i18n } = useTranslation('common')
  const dispatch = useDispatch()
  const [submited, setSubmited] = React.useState<boolean>(false)
  const [openError, setOpenError] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<any>()
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({ mode: 'onBlur', resolver: yupResolver(AddCorrectorFile) })

  const onSubmit = (files: any) => {
    dispatch({ type: "SET_LOADING_TRUE" })
    console.log(files)
    const formData = new FormData()
    formData.append(name, files.uploads[0])
    formData.append(`status_id`, '12')
    formData.append("_method", "put");
    ConclusionsServices.uploadConclusion(conclusionId, formData)
      .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true) })
      .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err) })
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        <ReactInputFile edited={true} submited={submited} register={register} name={"uploads"} required={true} error={errors} title={""} accept={".docx"} /> 
        <button type="submit" className='c-btn c-btn-green' onClick={() => { setSubmited(true) }}>Добавить файл в заключение</button>
      </form>
      <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
      <ModalSuccess open={openSuccess} close={setOpenSuccess} />
    </>
  )
}


type Props= {
  conclusionId: number;
};
const AddFileCorrector: React.FC<Props> = ({ conclusionId }) => {
  const { t, i18n } = useTranslation('common')
  const [conclusionLang, setConclusionLang] = React.useState(1)
  return (
    <>
      <div className={conclusionLang == 1 ? 'item-details__content--kk' : 'item-details__content--ru'}>
        <p>
          <button className={conclusionLang == 1 ? 'c-btn c-btn-left c-btn-lightBlue' : 'c-btn c-btn-left'} onClick={() => setConclusionLang(1)}>
            {t("corrector_files_kk")}
          </button>
          <button className={conclusionLang == 2 ? 'c-btn c-btn-right c-btn-green' : 'c-btn c-btn-right'} onClick={() => setConclusionLang(2)}>
            {t("corrector_files_ru")}
          </button>
        </p>
      </div>
      <div className={conclusionLang == 1 ? "item-details__content--tab item-details__uploads-kk" : "item-details__content--tab item-details__uploads-ru"}>
        {conclusionLang == 1 ? <AddFileCorrectorForm name={"corrector_document_src_kk"} conclusionId={conclusionId}/> : null}
        {conclusionLang == 2 ? <AddFileCorrectorForm name={"corrector_document_src_ru"} conclusionId={conclusionId} /> : null}
      </div>
    </>
  )
}

export default AddFileCorrector