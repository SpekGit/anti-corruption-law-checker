
import React from 'react'
import IconsContent from '../assets/icons/IconsContent'
import { IInput } from '../constants/interfaces'
import InputMask from 'react-input-mask'
import { useTranslation } from 'react-i18next'

const ReactInput = ({ register, type, required, edited, title, name, defaultValue, error, max, onInput, }: IInput) => {
  const [viewPassword, setViewPassword] = React.useState<boolean>(false)
  const { t, i18n } = useTranslation('common')
  const handleInput = (e: any) => {
    console.log(Number(e.target.value))
    if (max) {
      e.target.value = (Number.isNaN(Number(e.target.value)) || e.target.value == 0 ? null : Math.trunc(e.target.value))
      setTimeout(() => {
        Number(e.target.value) > -1 && onInput && onInput()
      }, 1000)
    } else {
      setTimeout(() => {
        onInput && onInput()
      }, 1000)
    }

  }

  return (
    <>
      <div className={edited ? 'form-item' : 'form-item form-item__read-only'}>
        <p className='form-item__read-only--title'>{t(title)}{required && edited && "*"} </p>
        {edited ?
          (max ?
            <input type={"text"} maxLength={max} {...register(name, { onChange: (e: any) => handleInput(e) })} defaultValue={defaultValue} /> :
            type == "password" ?
              <p className='input_icons form-item__password'>
                <input type={viewPassword ? "text" : "password"} {...register("password")} />
                <span>{IconsContent.Password()}</span>

                <span className="span_password" onClick={() => setViewPassword(!viewPassword)}>{viewPassword ? IconsContent.EyeClosed() : IconsContent.EyeView()}</span>
              </p> :
              <input type={type ? type : "text"}  {...register(name, { onChange: (e: any) => handleInput(e) })} defaultValue={defaultValue} />) :
          <p className='form-item__read-only--text'>{type == "password" ? "********" : defaultValue}</p>}
        {error && required && edited && <p className='form-item__error'>{t(error[name]?.message)}</p>}
      </div>

    </>
  )
}
export default ReactInput

export function ReactInputFile({ register, required, edited, title, name, error, accept, multiple, submited, fileNotice }: IInput) {
  const [fileName, setFileName] = React.useState<any>();
  const { t, i18n } = useTranslation('common')
  return (
    <div className={edited ? 'form-item form-item__file' : 'none'}>
      {title && <p >{t(title)}{required && edited && "*"}</p>}
      <div>
        <label htmlFor={name} className='c-btn c-btn-blue'>{t("choose_file")}{IconsContent.PaperClip()}</label>
        <p>
          {fileName ? Object.keys(fileName).map((val: any) => <span >{fileName[val]?.name}</span>) : fileNotice}
        </p>
      </div>
      <input type="file" id={name} accept={accept} multiple={multiple} {...register(name, { onChange: (e: any) => setFileName(e.target.files) })} />
      {error && required && submited && <p className='form-item__error'>{t(error[name]?.message)}</p>}
    </div>
  )
}
export const ReactInputMask = ({ register, required, edited, title, name, error, defaultValue, mask }: IInput) => {
  const { t, i18n } = useTranslation('common')
  return (
    <>
      <div className={edited ? 'form-item' : 'form-item form-item__read-only'}>
        <p className='form-item__read-only--title'>{t(title)}{required && edited && "*"}</p>
        {edited ? <InputMask {...register(name)} mask={mask} defaultValue={defaultValue} /> : <p className='form-item__read-only--text'>{defaultValue}</p>}
        {error && required && edited && <p className='form-item__error'>{t(error[name]?.message)}</p>}
      </div>

    </>
  )
}

export const ReactInputPassword = ({ edited, required, type, error, register, title }: IInput) => {
  const [viewPassword, setViewPassword] = React.useState<boolean>(false)
  const { t, i18n } = useTranslation('common')
  return (
    <>
      <div className={edited ? 'form-item' : 'form-item form-item__read-only'}>
        <p className='form-item__read-only--title'>{t(title)}{required && edited && "*"} </p>
        {edited ?
          <p className='input_icons form-item__password'>
            <input type={viewPassword ? "text" : "password"} {...register("password", {
              required: "Заполните обязательное поле",
              pattern: {
                value: /^([A-Za-z0-9.-\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                message: "Пароль должен содержать только латинские буквы"
              }
            })} />
            <span>{IconsContent.Password()}</span>
            <span className="span_password" onClick={() => setViewPassword(!viewPassword)}>{viewPassword ? IconsContent.EyeClosed() : IconsContent.EyeView()}</span>
          </p> :
          <p className='form-item__read-only--text'>{type == "password" && "*********"}</p>}
        {error && required && edited && <p className='form-item__error'>{t(error.password?.message)}</p>}
      </div>
    </>
  )
}
