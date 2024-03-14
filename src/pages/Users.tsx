import React from 'react'
import Wrapper from '../components/Wrapper'
import { useTranslation } from 'react-i18next'
import IconsContent from '../assets/icons/IconsContent'
import { useDispatch, useSelector } from 'react-redux'
import { TableFirst } from '../components/TableFirst'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import { UserServices } from '../services/UserServices'
import { useForm } from 'react-hook-form'
import ReactInput from '../components/ReactInput'

const Projects = () => {
  const { t, i18n } = useTranslation('common')
  const currentUser = useSelector((state: any) => state.currentUser)
  const dispatch = useDispatch()
  const [filterDataAll, setFilterDataAll] = React.useState<string>('')
  const [filterDataCoordinators, setFilterDataCoordinators] = React.useState<string>('')
  const [filterDataExperts, setFilterDataExperts] = React.useState<string>('')
  const [filterDataCorrectors, setFilterDataCorrectors] = React.useState<string>('')
  const [filterDataTranslators, setFilterDataTranslators] = React.useState<string>('')
  const [filterDataClerks, setFilterDataClerks] = React.useState<string>('')

  const storeUsers = useSelector((state: any) => state)
  const [asideItem, setAsideItem] = React.useState<number>(1)

  const [pageAll, setPageAll] = React.useState<number>(1)
  const [pageCoordinators, setPageCoordinators] = React.useState<number>(1)
  const [pageExperts, setPageExperts] = React.useState<number>(1)
  const [pageCorrectors, setPageCorrectors] = React.useState<number>(1)
  const [pageTranslators, setPageTranslators] = React.useState<number>(1)
  const [pageClerks, setPageClerks] = React.useState<number>(1)

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({ mode: 'onBlur' })

  React.useEffect(() => {
    UserServices.getUsers(pageAll, filterDataAll)
      .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); dispatch({ type: "ADD_ALL_USERS", payload: response.data }) })
      .catch(err => console.log(err))
  }, [pageAll, filterDataAll])

  React.useEffect(() => {
    UserServices.getCoordinators(pageCoordinators, filterDataCoordinators)
      .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); dispatch({ type: "ADD_COORDINATORS", payload: response.data }) })
      .catch(err => console.log(err))
  }, [pageCoordinators, filterDataCoordinators])

  React.useEffect(() => {
    let ExpertsProjectsFilter = `filter[status_id]=2&${filterDataExperts}`
    UserServices.getExperts(pageExperts, ExpertsProjectsFilter)
      .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); dispatch({ type: "ADD_EXPERTS", payload: response.data }) })
      .catch(err => console.log(err))
  }, [pageExperts, filterDataExperts])

  React.useEffect(() => {
    UserServices.getCorrectors(pageCorrectors, filterDataCorrectors)
      .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); dispatch({ type: "ADD_CORRECTORS", payload: response.data }) })
      .catch(err => console.log(err))
  }, [pageCorrectors, filterDataCorrectors])

  React.useEffect(() => {
    UserServices.getTranslators(pageTranslators, filterDataTranslators)
      .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); dispatch({ type: "ADD_TRANSLATORS", payload: response.data }) })
      .catch(err => console.log(err))
  }, [pageTranslators, filterDataTranslators])

  React.useEffect(() => {
    UserServices.getClerks(pageClerks, filterDataClerks)
      .then((response: any) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); dispatch({ type: "ADD_CLERKS", payload: response.data }) })
      .catch(err => console.log(err))
  }, [pageClerks, filterDataClerks])

  let renderUsers = asideItem == 1 ? storeUsers.allUsers : asideItem == 2 ? storeUsers.coordinators : asideItem == 3 ? storeUsers.experts : asideItem == 4 ? storeUsers.correctors : asideItem == 5 ? storeUsers.translators : storeUsers.clerks
  let page = asideItem == 1 ? pageAll : asideItem == 2 ? pageCoordinators : asideItem == 3 ? pageExperts : asideItem == 4 ? pageCorrectors : asideItem == 5 ? pageTranslators : pageClerks
  let setPage = asideItem == 1 ? setPageAll : asideItem == 2 ? setPageCoordinators : asideItem == 3 ? setPageExperts : asideItem == 4 ? setPageCorrectors : asideItem == 5 ? setPageTranslators : setPageClerks
  let setFilterData = asideItem == 1 ? setFilterDataAll : asideItem == 2 ? setFilterDataCoordinators : asideItem == 3 ? setFilterDataExperts : asideItem == 4 ? setFilterDataCorrectors : asideItem == 5 ? setFilterDataTranslators : setFilterDataClerks

  const onSubmit = (filteredData: any) => {
    let arrFilterItems = Object.keys(filteredData).map((item, index) => {
      if (Object.values(filteredData)[index] !== '' && Object.values(filteredData)[index] !== undefined && Object.values(filteredData)[index] !== "Invalid date") {
        return `filter[${item}]=${Object.values(filteredData)[index]}`
      }
    }).filter(item => item !== undefined)
    let newArr = arrFilterItems.map((item, index) => index == arrFilterItems.length - 1 ? `${item}` : `${item}&`)
    setPage(1)
    setFilterData(newArr.toString().replace(/[,]/gi, ''))
  }

  return (
    <Wrapper>
      <h2>{t("users")}  <Link to={'/users/add'}><span>{t("add_user")} {IconsContent.Person()}</span></Link></h2>
      <div className='container'>
        <div className='project-content'>
          <aside>
            <ul>
              <li onClick={() => setAsideItem(1)} className={asideItem == 1 ? "aside-active" : ""}>{IconsContent.Folder()}{t("all_users")} <span>{storeUsers.allUsers.meta.total}</span> </li>
              <li onClick={() => setAsideItem(2)} className={asideItem == 2 ? "aside-active" : ""}>{IconsContent.FolderAccepted()}{t("coordinator")} <span>{storeUsers.coordinators.meta.total}</span> </li>
              <li onClick={() => setAsideItem(3)} className={asideItem == 3 ? "aside-active" : ""}>{IconsContent.FolderPending()}{t("expert")}<span>{storeUsers.experts.meta.total}</span> </li>
              <li onClick={() => setAsideItem(4)} className={asideItem == 4 ? "aside-active" : ""}>{IconsContent.FolderCompleted()}{t("corrector")} <span>{storeUsers.correctors.meta.total}</span> </li>
              <li onClick={() => setAsideItem(5)} className={asideItem == 5 ? "aside-active" : ""}>{IconsContent.FolderCompleted()}{t("translator")} <span>{storeUsers.translators.meta.total}</span> </li>
              <li onClick={() => setAsideItem(6)} className={asideItem == 6 ? "aside-active" : ""}>{IconsContent.FolderCompleted()}{t("clerk")} <span>{storeUsers.clerks.meta.total}</span> </li>
            </ul>
          </aside>
          <section>
            <form className='home__filter users__filter' >
              <ReactInput edited={true} register={register} name={"full_name"} error={errors} title={t("full_name")} required={false} onInput={handleSubmit(onSubmit)} />
              <ReactInput edited={true} register={register} name={"email"} error={errors} title={"EMAIL"} required={false} onInput={handleSubmit(onSubmit)} />
              <ReactInput edited={true} register={register} name={"tin"} error={errors} title={t("iin")} required={false} onInput={handleSubmit(onSubmit)} />

              {/* <button type='button' className='c-btn c-btn-red' onClick={() => { reset()}}>Сбросить</button> */}
            </form>
            <table>
              <thead>
                <tr>
                  <TableFirst />
                  <td>{t("full_name")}</td>
                  <td>EMAIL</td>
                  <td>{t("iin")}</td>
                  <td className={'table-last'}></td>
                </tr>
              </thead>
              <tbody>
                {renderUsers.data.map((item: any, index: number) =>
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.full_name}</td>
                    <td>{item.email}</td>
                    <td>{item.tin}</td>
                    <td><Link to={`/users/${item.id}`} state={item}>{IconsContent.EyeView()}</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="pagination">
              <p className='pagination__number'>Найдено: {renderUsers.meta?.total}</p>
              {renderUsers.meta?.total > renderUsers.meta?.per_page ?
                <Pagination count={Math.ceil(renderUsers.meta.total / renderUsers.meta?.per_page)} page={page} onChange={(event, value) => { dispatch({ type: "SET_LOADING_TRUE", payload: true }); setPage(value) }} variant="outlined" shape="rounded" /> : null}
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

export default Projects
