import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Wrapper from '../components/Wrapper'
import { IUser } from '../constants/interfaces'
import { UserServices } from '../services/UserServices'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import ReactInput, { ReactInputMask, ReactInputPassword } from '../components/ReactInput'
import ReactSelect from '../components/ReactSelect'
import { INewUser, LocalesName } from '../constants/interfaces'
import { AddUser, EditUser } from '../constants/validation'
import i18n from '../i18n'
import { OtherServices } from '../services/Others'
import IconsContent from '../assets/icons/IconsContent'
import { useDispatch, useSelector } from 'react-redux'
import ModalError from '../components/modals/ModalError'
import ModalSuccess from '../components/modals/ModalSuccess'
import { DatePickerInput } from '../components/ReactDatePicker'
import { useTranslation } from 'react-i18next'
import ModalDeleteUserConfirm from '../components/modals/ModalDeleteUserConfirm'

type Props = {
  userData: IUser
}

const UserDetailsComponent: React.FC<Props> = ({ userData }) => {
  const { t, i18n } = useTranslation('common')
  const dispatch = useDispatch()
  const [editPassword, setEditPassword] = React.useState<boolean>(false)
  const [edit, setEdit] = React.useState<boolean>(false)
  const [openError, setOpenError] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<any>()
  const [branchOfLegislation, setBranchOfLegislation] = React.useState([])
  const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
  const [modalDeleteUser, setModalDeleteUser] = React.useState<boolean>(false)
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    mode: 'onBlur', resolver: yupResolver(EditUser), defaultValues: {
      branch_of_legislations: userData.branch_of_legislations.map((item: any) => item.id),
      role: userData.roles[0].slug,
      password: "00000000"
    }
  })

  const onSubmit = (newUserData: any) => {
    if (newUserData.phonenew) newUserData.phone = newUserData.phone.replace(/[^+\d]/g, '')
    !editPassword && delete newUserData?.password
    console.log(newUserData)
    dispatch({ type: "SET_LOADING_TRUE", payload: true });
    UserServices.editUser(userData.id, newUserData)
      .then(response => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setOpenSuccess(true) })
      .catch((err) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setOpenError(true); setErrorMessage(err) })
    reset()
  }
  console.log(errors)
  React.useEffect(() => {
    // UserServices.getUser(userId)
    //   .then(response => setUserData(response.data.data))
    OtherServices.getBranchOfLegislation()
      .then(response => {
        let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
        setBranchOfLegislation(arr)
      });
  }, [])

  return (
    <>
      <h2>{t("user_details")}</h2>
      <div className='container add-item users__details'>
        <div className='users__details--header'>
          <div className='users__details--icon'>
            <span>{IconsContent.Person()}</span>
            <div>
              <h4>{userData?.full_name}</h4>
              <p>{userData?.roles[0].locales.name[i18n.language as keyof LocalesName]}</p>
            </div>
          </div>
          <div className='users__details--control'>
            <button onClick={() => { setEdit(!edit); reset() }}>{IconsContent.Edit()}</button>
            <button onClick={() => setModalDeleteUser(true)} >{IconsContent.Delete()}</button>
          </div>
        </div>
        {userData && <form onSubmit={handleSubmit(onSubmit)}>
          {edit && <h3>Обязательные поля *</h3>}
          <input {...register("role")} className="none" />
          <ReactInput edited={edit} register={register} name={"email"} required={true} error={errors} title={'Email'} defaultValue={userData.email} />

          {userData.roles[0].slug == "expert" && <div className='form-item form-item__status'>
            <p>Статус активности</p>
            <p>
              <button type="button" className={userData?.available == 1 ? "c-btn " : "c-btn c-btn-green"}> Не активен</button>
              <button type="button" className={userData?.available == 1 ? "c-btn c-btn-green" : "c-btn "}>Активен</button>
            </p>
          </div>}
          <div className='form-item__edit-password'>
            {edit && !errors?.password && <span className='form-item__edit-password--btn' onClick={() => { setEditPassword(!editPassword) }}>{IconsContent.Edit()}</span>}
            <ReactInput edited={editPassword} register={register} type={"password"} name={"password"} required={true} error={errors} title={t("password")} defaultValue={'00000000'} />
          </div>
          <ReactInput edited={edit} register={register} name={"full_name"} required={true} error={errors} defaultValue={userData.full_name} title={t("user_full_name")} />
          <ReactInputMask edited={edit} mask="999999999999" register={register} name={"tin"} required={true} error={errors} defaultValue={userData.tin} title={t("iin")} />
          <ReactInput edited={edit} register={register} name={"note"} error={errors} title={t("user_notice")} required={false} defaultValue={userData.note} />
          {userData && userData.roles[0].slug == 'expert' &&
            <>
              {/* <ReactInput edited={edit} register={register} name={"organization_kk"} required={true}  error={errors} title={t("organization_kk")} />
              <ReactInput edited={edit} register={register} name={"organization_ru"} required={true} error={errors} title={t("organization_ru")} /> */}
              <ReactInput edited={edit} register={register} name={"scientific_title_kk"} defaultValue={userData.locales.scientific_title.kk} required={false} error={errors} title={t("scientific_title_kk")} />
              <ReactInput edited={edit} register={register} name={"scientific_title_ru"} defaultValue={userData.locales.scientific_title.kk} required={false} error={errors} title={t("scientific_title_ru")} />
              <ReactInput edited={edit} register={register} name={"academic_degree_kk"} required={false} defaultValue={userData.locales.academic_degree.kk} error={errors} title={t("academic_degree_kk")} />
              <ReactInput edited={edit} register={register} name={"academic_degree_ru"} required={false} defaultValue={userData.locales.academic_degree.ru} error={errors} title={t("academic_degree_ru")} />
              <ReactSelect name={'branch_of_legislations'} isClearable={false} isMulti={true} defaultValue={userData.branch_of_legislations} control={control} error={errors} required={true} edited={edit} options={branchOfLegislation} title={'user_branches_of_legislation'} />
            </>
          }
          {(userData.roles[0].slug == 'coordinator' || userData.roles[0].slug == 'expert') &&
            <>
              <ReactInputMask edited={edit} mask="+7 (799) 999-99-99" register={register} defaultValue={userData.phone} name={"phone"} required={true} error={errors} title={t("phone")} />
              {/* <DatePickerInput required={false} error={errors} name={"birth_date"} control={control} edited={edit} title={t("birth_date")} /> */}
              <ReactInput edited={edit} register={register} name={"job_title_kk"} defaultValue={userData.locales.job_title.kk} required={false} error={errors} title={t("job_title_kk")} />
              <ReactInput edited={edit} register={register} name={"job_title_ru"} defaultValue={userData.locales.job_title.ru} required={false} error={errors} title={t("job_title_ru")} />
            </>
          }
          {edit && <button type="submit" className='c-btn c-btn-green'>{t("apply_changes")}</button>}
        </form>}
        <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
        <ModalSuccess open={openSuccess} close={setOpenSuccess} />
        <ModalDeleteUserConfirm close={setModalDeleteUser} open={modalDeleteUser} userData={userData} />
      </div>
    </>
  )
}



const UserDetails = () => {
  const [userData, setUserData] = React.useState<IUser>()
  let userId = useLocation().pathname.replace(/[a-z\/]/g, '')
  const currentUser = useSelector((state: any) => state.currentUser)
  const dispatch = useDispatch()
  const [openError, setOpenError] = React.useState<boolean>(false)
  const [errorMessage, setErrorMessage] = React.useState<any>()


  React.useEffect(() => {
    UserServices.getUser(userId)
      .then(response => setUserData(response.data.data))
      .catch((err) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setOpenError(true); setErrorMessage(err) })
  }, [])

  return (
    <Wrapper>
      {userData &&
        <UserDetailsComponent userData={userData} />
      }
      <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
    </Wrapper>
  )
}
export default UserDetails