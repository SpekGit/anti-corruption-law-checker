
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import IconsContent from '../assets/icons/IconsContent'
import { FilterProps, LocalesName } from '../constants/interfaces'
import { OtherServices } from '../services/Others'
import { UserServices } from '../services/UserServices'
import { DatePickerInput, DatePickerInputRange } from './ReactDatePicker'
import ReactInput from './ReactInput'
import ReactSelect from './ReactSelect'

const Filter = ({ showFilter, setShowFilter, setFilterData, setPage }: FilterProps) => {
    const location = useLocation().pathname
    // const role = localStorage.getItem(".UserLocation")
    const role = useSelector((state: any) => state.currentUser.role)
    const [experts, setExperts] = React.useState([])
    const { t, i18n } = useTranslation('common')
    const dispatch = useDispatch()
    const [clear, setClear] = React.useState<boolean>(false)
    const [coordinators, setCoordinators] = React.useState([])
    const [catos, setCatos] = React.useState([])
    const [branchOfLegislation, setBranchOfLegislation] = React.useState([])
    const [documentTypes, setDocumentTypes] = React.useState([])
    const [authorityDevelopers, setAuthorityDevelopers] = React.useState([])
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({ mode: 'onBlur' })

    React.useEffect(() => {
        showFilter && UserServices.getExperts(1, '', 100)
            .then((response: any) => {
                let arr = response.data.data.map((item: { id: number; full_name: string }) => { return { value: item.id, label: item.full_name } });
                setExperts(arr)
            })
            .catch(err => console.log(err))

        showFilter && OtherServices.getCatos()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
                console.log(arr)
                setCatos(arr);
            });
        showFilter && OtherServices.getBranchOfLegislation()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
                setBranchOfLegislation(arr)
            });
        showFilter && OtherServices.getDocumentTypes()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
                setDocumentTypes(arr);
            });
        showFilter && OtherServices.getAuthorityDevelopers()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
                setAuthorityDevelopers(arr)
            });
        showFilter && UserServices.getCoordinators(1, '', 100)
            .then((response: any) => {
                let arr = response.data.data.map((item: { id: number; full_name: string }) => { return { value: item.id, label: item.full_name } });
                setCoordinators(arr)
            })
            .catch(err => console.log(err))
    }, [showFilter])


    const onSubmit = (filteredData: any) => {
        // dispatch({ type: "SET_LOADING_TRUE", payload: true })
        console.log("filteredData")
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
        <div className={`filter ${showFilter ? 'filter__active' : ''}`}>
            <div className={`filter__content`}>
                <div className="filter__content--header">
                    <p>Фильтр{IconsContent.Filter()}</p>
                    <span onClick={() => { setShowFilter(false) }}>{IconsContent.Close()}</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReactInput edited={true} register={register} name={"id"} max={5} error={errors} title={t("id")} required={false} />
                    <ReactSelect name={'expert_id'} control={control} edited={true} options={experts} clear={clear} title={t("expert")} />
                    {role == "coordinator" && location == "/projects" && <ReactSelect name={'coordinator_id'} control={control} edited={true} options={coordinators} clear={clear} title={t("coordinator")} />}
                    <ReactSelect name={'document_type_id'} control={control} edited={true} options={documentTypes} clear={clear} title={t("document_type")} />
                    <ReactSelect name={'authority_developer_id'} control={control} edited={true} options={authorityDevelopers} clear={clear} title={t("authority_developer")} />
                    {role == "coordinator" && location == "/projects" && <ReactSelect name={'branch_of_legislation_id'} control={control} edited={true} options={branchOfLegislation} clear={clear} title={t("branch_of_legiclation")} />}
                    {/* {role == "coordinator" && location == "/projects" && <ReactSelect name={'cato_id'} control={control} options={catos} edited={true} clear={clear} title={t("catos")} />} */}
                    {role == "coordinator" && location == "/projects" && <DatePickerInput name={'deadline'} control={control} clear={clear} title={t("deadline")} edited={true} />}
                    {(role == "coordinator" && (location == "/projects" || location.includes("reports")) || role == "economist") &&
                        <>
                            <DatePickerInputRange nameFrom={'filtered_expert_date_from'} control={control} clear={clear} nameTill={'filtered_expert_date_till'} title={t("filter_period_eds")} />
                            <DatePickerInputRange nameFrom={'filtered_publication_date_from'} nameTill={'filtered_publication_date_till'} control={control} clear={clear} title={t("filter_period_published")} />
                        </>
                    }
                    {role == "coordinator" && location == "/projects" && <ReactSelect name={'published'} edited={true} control={control} options={[{ value: 'true', label: "Да" }, { value: 'false', label: "Нет" }]} clear={clear} title={t("published")} />}
                    <div className="filter__btn">
                        <button type="submit" className='c-btn c-btn-green'>Применить</button>
                        <button type="button" onClick={(e) => { setClear(!clear); reset(); setFilterData('') }} className='c-btn c-btn-primary'>Сбросить</button>
                    </div>
                </form>

            </div>
            <div className="filter__cover" onClick={() => { setShowFilter(false) }} />
        </div>
    )
}

export default Filter


