import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import ReactInput, { ReactInputFile } from '../components/ReactInput';
import { IChangeProject, LocalesName } from '../constants/interfaces';
import { EditProject } from '../constants/validation';
import i18n from '../i18n';
import { OtherServices } from '../services/Others';
import { ProjectsServices } from '../services/ProjectServices';
import { convertObjectToFormDataPUT } from '../utils/helpers';
import ModalError from './modals/ModalError';
import ModalSuccess from './modals/ModalSuccess';
import { DatePickerInput } from './ReactDatePicker';
import ReactSelect from './ReactSelect';
type FormValues = {
    incoming_letter_number: string;
    outgoing_letter_number: string;
    date_of_receipt_of_the_draft_regulatory_legal_act: string;
    outgoing_mail_date: string;
    document_type_id: number;
    authority_developer_id: number;
    branch_of_legislations: number[];
    name_kk: string;
    name_ru: string;
    uploads_kk: any;
    uploads_ru: any
};

const ChangeProject: React.FC<IChangeProject> = ({ projectData, editProject }) => {
    const { t, i18n } = useTranslation('common')
    const [branchOfLegislation, setBranchOfLegislation] = React.useState([])
    const [documentTypes, setDocumentTypes] = React.useState([])
    const [authorityDevelopers, setAuthorityDevelopers] = React.useState([])
    const dispatch = useDispatch()
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
    const { register, control, handleSubmit, setFocus, formState: { errors } } = useForm<FormValues>({
        mode: 'onBlur', resolver: yupResolver(EditProject), defaultValues: {

            date_of_receipt_of_the_draft_regulatory_legal_act: projectData.date_of_receipt_of_the_draft_regulatory_legal_act,
            outgoing_mail_date: projectData.outgoing_mail_date,
            document_type_id: projectData.document_type.id,
            authority_developer_id: projectData.authority_developer.id,
            branch_of_legislations: projectData.branch_of_legislations ? projectData.branch_of_legislations.map(item => item.id) : projectData.branch_of_legislation.map(item => item.id)
        }
    })
    const onSubmit = (editProjectData: any) => {
        editProjectData = {
            ...editProjectData,
            uploads_ru: editProjectData.uploads_ru,
            uploads_kk: editProjectData.uploads_kk,
        };
        dispatch({ type: "SET_LOADING_TRUE" })
        const formData = convertObjectToFormDataPUT(editProjectData);

        ProjectsServices.editProjectFormData(projectData.id, formData)
            .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true) })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err) })
    }
    React.useEffect(() => {
        OtherServices.getBranchOfLegislation()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
                setBranchOfLegislation(arr)
            });
        OtherServices.getDocumentTypes()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
                setDocumentTypes(arr);
            });
        OtherServices.getBranchOfLegislation()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
                setBranchOfLegislation(arr);
            });
        OtherServices.getAuthorityDevelopers()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; locales: { name: LocalesName } }) => { return { value: item.id, label: item.locales.name[i18n.language as keyof LocalesName] } })
                setAuthorityDevelopers(arr);
            });
    }, [])
    React.useEffect(() => {
        setFocus("incoming_letter_number");
    }, [editProject]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ReactInput type={"text"} edited={editProject} register={register} name={"incoming_letter_number"} required={editProject} error={errors} title={'incoming_letter_number'} defaultValue={projectData.incoming_letter_number} />
                <ReactInput type={"text"} edited={editProject} register={register} name={"outgoing_letter_number"} required={editProject} error={errors} title={'outgoing_letter_number'} defaultValue={projectData.outgoing_letter_number} />
                <DatePickerInput edited={editProject} control={control} name={"outgoing_mail_date"} required={editProject} error={errors} title={'outgoing_mail_date'} defaultValue={projectData.outgoing_mail_date} />
                <DatePickerInput edited={editProject} control={control} name={"date_of_receipt_of_the_draft_regulatory_legal_act"} required={editProject} error={errors} title={'date_of_receipt_of_the_draft_regulatory_legal_act'} defaultValue={projectData.date_of_receipt_of_the_draft_regulatory_legal_act} />
                <ReactSelect control={control} options={documentTypes} edited={editProject} name={"document_type_id"} title={t("document_type")} defaultValue={projectData.document_type} />
                <ReactSelect control={control} options={authorityDevelopers} edited={editProject} name={"authority_developer_id"} title={t("authority_developer")} defaultValue={projectData.authority_developer} />
                <ReactInput type={"text"} edited={editProject} register={register} name={"name_kk"} required={editProject} error={errors} title={'name_kk'} defaultValue={projectData.locales.name.kk} />
                <ReactInput type={"text"} edited={editProject} register={register} name={"name_ru"} required={editProject} error={errors} title={'name_ru'} defaultValue={projectData.locales.name.ru} />
                {editProject && <ReactInputFile edited={true} register={register} name={"uploads_kk"} required={false} error={errors} title={t("project_files_kk")} accept={"all"} multiple={true} />}
                {editProject && <ReactInputFile edited={true} register={register} name={"uploads_ru"} required={false} error={errors} title={t("project_files_ru")} accept={"all"} multiple={true} />}
                <ReactSelect control={control} options={branchOfLegislation} edited={editProject} required={editProject} error={errors} name={"branch_of_legislations"} title={t("branch_of_legiclation")} defaultValue={projectData.branch_of_legislations ? projectData.branch_of_legislations : projectData.branch_of_legislation} isMulti={true} isClearable={false} />
                {editProject && <button className='c-btn c-btn-red'>{t("apply_changes")}</button>}
            </form>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />
        </>
    )
}

export default ChangeProject