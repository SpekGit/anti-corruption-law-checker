import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ModalAddUserConfirm from '../components/modals/ModalAddUserConfirm'
import { DatePickerInput } from '../components/ReactDatePicker'
import ReactInput, { ReactInputMask } from '../components/ReactInput'
import ReactSelect from '../components/ReactSelect'
import Wrapper from '../components/Wrapper'
import { INewUser, LocalesName } from '../constants/interfaces'
import { AddUser } from '../constants/validation'
import i18n from '../i18n'
import { OtherServices } from '../services/Others'

const UserAdd = () => {
  const { t, i18n } = useTranslation('common')
  const [newUserData, setNewUserData] = React.useState<INewUser>()
  const [selectedValue, setSelectedValue] = React.useState({ value: "", label: "" })
  const [branchOfLegislation, setBranchOfLegislation] = React.useState([])
  const [open, setOpen] = React.useState<boolean>(false)
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<INewUser>({ mode: 'onBlur', resolver: yupResolver(AddUser) })
  const role = [
    { value: "corrector", label: t("corrector") },
    { value: "coordinator", label: t("coordinator") },
    { value: "expert", label: t("expert") },
    { value: "translator", label: t("translator") },
    { value: "clerk", label: t("clerk") },
    { value: "economist", label: t("economist") },
  ]
  console.log(errors)
  const onSubmit = (addUserData: any) => {
    if ((selectedValue.value == 'coordinator' || selectedValue.value == 'expert')) {
      addUserData.phone = addUserData.phone.replace(/[^+\d]/g, '')
    }
    console.log(addUserData)
    setNewUserData(addUserData)
    setOpen(true)
  }
  React.useEffect(() => {
    OtherServices.getBranchOfLegislation()
      .then(response => {
        let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
        setBranchOfLegislation(arr)
      });

  }, [])
  return (
    <Wrapper>
      <h2>{t("add_new_user")}</h2>
      <div className='container add-item'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Обязательные поля *</h3>
          <ReactSelect required={true} error={errors} setSelectedValue={setSelectedValue} name={"role"} control={control} edited={true} options={role} title={t("role")} />
          <ReactInput edited={true} register={register} name={"email"} required={true} error={errors} title={'Email'} />
          <ReactInput edited={true} register={register} name={"password"} required={true} error={errors} title={t("password")} />
          <ReactInput edited={true} register={register} name={"full_name"} required={true} error={errors} title={t("user_full_name")} />
          <ReactInputMask edited={true} mask="999999999999" register={register} name={"tin"} required={true} error={errors} title={t("iin")} />
          <ReactInput edited={true} register={register} name={"note"} error={errors} title={t("user_notice")} required={false} />
          {selectedValue?.value == 'expert' &&
            <>
              <ReactInput edited={true} register={register} name={"scientific_title_kk"} required={true} error={errors} title={t("scientific_title_kk")} />
              <ReactInput edited={true} register={register} name={"scientific_title_ru"} required={true} error={errors} title={t("scientific_title_ru")} />
              <ReactInput edited={true} register={register} name={"academic_degree_kk"} required={true} error={errors} title={t("academic_degree_kk")} />
              <ReactInput edited={true} register={register} name={"academic_degree_ru"} required={true} error={errors} title={t("academic_degree_ru")} />
              <ReactSelect name={'branch_of_legislations'} isClearable={false} isMulti={true} control={control} error={errors} required={true} edited={true} options={branchOfLegislation} title={'user_branches_of_legislation'} />
            </>
          }
          {(selectedValue.value == 'coordinator' || selectedValue.value == 'expert') &&
            <>
              <ReactInput edited={true} register={register} name={"organization_kk"} required={true} error={errors} title={t("organization_kk")} />
              <ReactInput edited={true} register={register} name={"organization_ru"} required={true} error={errors} title={t("organization_ru")} />
              <ReactInputMask edited={true} mask="+7 (799) 999-99-99" register={register} name={"phone"} required={true} error={errors} title={t("phone")} />
              <DatePickerInput required={true} error={errors} name={"birth_date"} control={control} edited={true} title={t("birth_date")} />
              <ReactInput edited={true} register={register} name={"job_title_kk"} required={true} error={errors} title={t("job_title_kk")} />
              <ReactInput edited={true} register={register} name={"job_title_ru"} required={true} error={errors} title={t("job_title_ru")} />
            </>
          }
          <button type="submit" className='c-btn c-btn-green'>{t("add_user")}</button>
        </form>
      </div>
      <ModalAddUserConfirm close={setOpen} open={open} userData={newUserData} />
    </Wrapper >
  )
}

export default UserAdd