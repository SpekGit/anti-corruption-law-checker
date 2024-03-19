import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import IconsContent from '../assets/icons/IconsContent'
import { Props } from '../constants/interfaces'
import { UserServices } from '../services/UserServices'


const Wrapper: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const currentUser = useSelector((state: any) => state.currentUser)
  const [popoverUser, setPopoverUser] = useState(false)
  const [popoverReports, setPopoverReports] = useState(false)
  const { t, i18n } = useTranslation('common')
  const roleFinder = (role?: string | null) => {
    if (role == 'coordinator') return t("coordinator")
    if (role == 'corrector') return t("corrector")
    if (role == 'expert') return t("expert")
    if (role == 'clerk') return t("clerk")
    if (role == 'translator') return t("translator")
    if (role == 'administrator') return 'Админимстратор'
    if (role == 'economist') return 'Экономист'
  }

  return (
    <div className='wrapper' onClick={() => { setPopoverUser(false); setPopoverReports(false) }}>
      <header className='header'>
        <Link to='/'><img src="/assets/images/PageLogo.png" alt="" /></Link>
        <div className='header__main'>
          <div className='header__main header__main--left'>
            {/* {currentUser && <p className='header__notification'>
              <span>{IconsContent.BellRing()}</span>
              <span className='header__notification--number'>80</span>
            </p>} */}
            <p className='lang lang__wrapper'>
              <span className={i18n.language == 'ru' ? 'lang__active' : ''} onClick={() => { i18n.changeLanguage('ru'); document.cookie = 'lang=ru' }}>РУС</span>
              <span className={i18n.language == 'kk' ? 'lang__active' : ''} onClick={() => { i18n.changeLanguage('kk'); document.cookie = 'lang=kk' }}>ҚАЗ</span>
            </p>
          </div>
          {currentUser.user ? <div className='header__profile' onClick={(e) => e.stopPropagation()}>

            <div className='c-btn c-btn-user '>
              <span>{IconsContent.Person()}</span>
              <div >
                <p className='c-btn-user__name'>{currentUser.full_name}</p>
                <p className='c-btn-user__role'>{roleFinder(currentUser.role)}</p>
              </div>
              <span onClick={(e) => { setPopoverUser(!popoverUser) }} className={popoverUser ? 'arrow-down' : ''}>{IconsContent.ArrowDown()}</span>
            </div>
            <div className={popoverUser ? 'header__popover header__popover--active' : 'header__popover '}>
              <Link to={'/profile'}><p>Профиль</p></Link>
              <Link to={'/login'}><p onClick={() => {
                dispatch({
                  type: "ADD_CURRENT_USER", payload: {
                    full_name: "",
                    user: null,
                    role: ""
                  }
                })
                localStorage.removeItem('.AuthToken');
              }}>Выход</p></Link>
            </div>
          </div> : <Link to={'/login'}><button className='c-btn c-btn-green'>Войти</button></Link >}

        </div>

      </header>
      <nav className='navbar'>
        {currentUser.user == null ? <ul className='navbar__list'>
          <NavLink to='/'>
            <li>
              Научные антикоррупционные экспертизы
            </li>
          </NavLink>
        </ul> :
          <ul className='navbar__list'>
            {currentUser.role == 'economist' ? <NavLink to='/projects-economist'><li>{IconsContent.Projects()}{t('project')}</li></NavLink> : null}
            {currentUser.role !== 'economist' ? <NavLink to='/projects'><li>{IconsContent.Projects()}{t('project')}</li></NavLink> : null}
            {(currentUser.role == 'coordinator' || currentUser.role == 'administrator') && (<NavLink to='/cover-letters'><li>{IconsContent.CoverLetters()}{t('transmittal_letters')}</li></NavLink>)}
            {currentUser.role !== 'economist' && <NavLink to='/conclusions'><li>{IconsContent.Conclusions()}{t('conclusions')}</li></NavLink>}
            {currentUser.role == 'administrator' && <NavLink to='/users'><li>{IconsContent.Persons()}{t("users")}</li></NavLink>}
            {currentUser.role == 'coordinator' &&
              <li className='navbar__popup' onClick={(e) => e.stopPropagation()}>
                <div className={location.includes('reports') ? 'navbar__popup--link navbar__popup--link-active' : 'navbar__popup--link'}>
                  <Link to='/reports'>{IconsContent.Reports()}{t("reports")}</Link>
                  <span onClick={(e) => { setPopoverReports(!popoverReports) }} className={popoverReports ? 'arrow-down' : ''}>{IconsContent.ArrowDown()}</span>
                </div >
                <div className={popoverReports ? 'navbar__popover navbar__popover--active' : 'navbar__popover '} onClick={(e) => { setPopoverReports(!popoverReports) }}>
                  <Link to='/reports/priced'>{t("reports_priced")}</Link>
                  {/* <Link to='/reports/experts'>{t("reports_experts")}</Link> */}
                </div>
              </li>
            }
            <NavLink to='/catalogs'><li>{IconsContent.Catalogs()}{t("catalogs")}</li></NavLink>
          </ul>}

      </nav>
      <main>{children}</main>
      <footer>
        <p>© 2022 - 2023 Antikorr v.1.0.8</p>
      </footer>
    </div>
  )
}

export default Wrapper
