import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Accordion, AccordionEdit } from '../components/Accordion'
import ModalAi from '../components/modals/ModalAi'
import ModalError from '../components/modals/ModalError'
import ModalSendToTranslator from '../components/modals/ModalSendToTranslator'
import ModalSuccess from '../components/modals/ModalSuccess'
import Wrapper from '../components/Wrapper'
import { IConclusionDetails, LocalesName } from '../constants/interfaces'
import { ConclusionsServices } from '../services/ConclusionsServices'
import { OtherServices } from '../services/Others'
import ModalSendFinalToCoordinator from '../components/modals/ModalSendFinalToCoordinator'
import ModalSendToCoordinator from '../components/modals/ModalSendToCoordinator'
import { useTranslation } from 'react-i18next'

const ConclusionEdit = () => {
    const { t, i18n } = useTranslation('common')
    const navigate = useNavigate()
    const currentUser = useSelector((state: any) => state.currentUser)
    const [conclusionData, setConclusionData] = React.useState<IConclusionDetails>()

    const dispatch = useDispatch()
    const [conclusionLang, setConclusionLang] = React.useState(1)
    let conclusionId = Number(useLocation().pathname.replace(/[a-z\/]/g, ''))

    const [sendFinalToCoordinator, setSendFinalToCoordinator] = React.useState<boolean>(false)
    const [sendToTranslator, setSendToTranslator] = React.useState<boolean>(false)
    const [sendToCoordinator, setSendToCoordinator] = React.useState<boolean>(false)

    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
    const [openSuccessRelocate, setOpenSuccessRelocate] = React.useState<string>('')

    const [riskFactors, setRiskFactors] = React.useState()
    const [corruptionRisks, setCorruptionRisks] = React.useState()
    const [refreshData, setRefreshData] = React.useState<boolean>(false)
    const [toDraft, setToDraft] = React.useState<boolean>(false)
    const [showModalAi, setShowModalAi] = React.useState<boolean>(false)
    const [conclusionEditData, setConclusionEditData] = React.useState()

    const { handleSubmit, register, control, reset, formState: { errors } } = useForm({ mode: 'onBlur' })

    const onSubmit = (conclusionEditData: any) => {
        if (conclusionData) {
            if (conclusionEditData.detailed_analysis_of_risk_factors.length > conclusionData.detailed_analysis_of_risk_factors.length) {
                conclusionEditData = {
                    ...conclusionEditData,
                    detailed_analysis_of_risk_factors: conclusionEditData.detailed_analysis_of_risk_factors.filter((item: any) => conclusionData.detailed_analysis_of_risk_factors.some((val: any) => val.id === item.id))
                }
            }
        }

        if (!toDraft) { //если сохранить в черновиках то отправка без указания статуса
            if ((conclusionData?.status.id == 2 || conclusionData?.status.id == 10) && (conclusionData?.locales.corrector_document_src.kk == null && conclusionData?.locales.corrector_document_src.ru == null && conclusionData?.locales.translater_document_src.kk == null && conclusionData?.locales.translater_document_src.ru == null)) { //from "Принят экспертом" or "Отправлен эксперту на доработку" to "Отправлен координатору"
                conclusionEditData = { ...conclusionEditData, status_id: 4 }
                setConclusionEditData(conclusionEditData)
                setSendToCoordinator(true)

            } else if (conclusionData?.status.id == 12) { //from "На корректировке у эксперта" to "Отправлен переводчику"
                conclusionEditData = { ...conclusionEditData, status_id: 7 }
                setConclusionEditData(conclusionEditData)
                setSendToTranslator(true)

            } else if ((conclusionData?.status.id == 10 || conclusionData?.status.id == 13) && ((conclusionData?.locales.corrector_document_src.kk !== null || conclusionData?.locales.corrector_document_src.ru !== null) && (conclusionData?.locales.translater_document_src.kk !== null || conclusionData?.locales.translater_document_src.ru !== null))) {
                conclusionEditData = { ...conclusionEditData, status_id: 8 }
                setConclusionEditData(conclusionEditData)
                setSendFinalToCoordinator(true)

            };
        } else {//отправка без указания статуса в черновиках
            dispatch({ type: "SET_LOADING_TRUE", payload: true })
            ConclusionsServices.editConclusion(conclusionId, conclusionEditData)
                .then(response => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setOpenSuccess(true); setOpenSuccessRelocate('/conclusions') })
                .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err) })
        }


    }

    React.useEffect(() => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        ConclusionsServices.getConclusion(conclusionId)
            .then(response => {
                if ((response.data.data.status.id == 2 || response.data.data.status.id == 10 || response.data.data.status.id == 12 || response.data.data.status.id == 13) && response.data.data.expert.id == currentUser.user) {
                    setConclusionData(response.data.data); dispatch({ type: "SET_LOADING_FALSE", payload: false })
                } else {
                    dispatch({ type: "SET_LOADING_FALSE", payload: false })
                    navigate('/conclusions')
                }

            })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setOpenError(true); setErrorMessage(err) })
    }, [refreshData])

    React.useEffect(() => {
        OtherServices.getRiskFactors()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; locales: { name: { [x: string]: any } } }) => { return { value: item.id, label: item.locales.name[i18n.language] } })
                setRiskFactors(arr)
            })
            .catch((err) => { setOpenError(true); setErrorMessage(err) })
        OtherServices.getCorruptionRisks()
            .then(response => {
                let arr = response.data.data.map((item: { id: any; name: any }) => { return { value: item.id, label: item.name } })
                setCorruptionRisks(arr)
            })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE", payload: false }); setOpenError(true); setErrorMessage(err) })
    }, [])
    // console.log(conclusionData)
    return (
        <Wrapper>
            <div className='item-details'>

                <div className='item-details__header item-details__ai'>
                    <p>{t("expertise_form")}</p>
                    <div className="item-details__ai-content">
                        <p >{t("ai_conclusion")}</p>
                        {conclusionData?.project?.law_analysis?.comments?.length > 0 ?
                            <div className="item-details__ai-btns" >
                                <a className="c-btn c-btn-green" href={conclusionData?.project?.law_analysis.src}>{t("ai_download")}</a>
                                <button className="c-btn c-btn-purple" onClick={() => setShowModalAi(true)}>{t("ai_preview")}</button>
                            </div > : <p className="item-details__ai-no-content">Результатов не найдено</p>
                        }
                    </div>
                </div>

                {conclusionData && riskFactors && corruptionRisks &&
                    <div className='item-details__edit-conclusion'>
                        <div className={conclusionLang == 1 ? 'item-details__content--kk' : 'item-details__content--ru'}>
                            <p>
                                <button className={conclusionLang == 1 ? 'c-btn c-btn-left c-btn-lightBlue' : 'c-btn c-btn-left'} onClick={() => setConclusionLang(1)}>
                                    {t("expertise_form_kk")}
                                </button>
                                <button className={conclusionLang == 2 ? 'c-btn c-btn-right c-btn-green' : 'c-btn c-btn-right'} onClick={() => setConclusionLang(2)}>
                                    {t("expertise_form_ru")}
                                </button>
                            </p>
                            <p></p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className={conclusionLang == 1 ? "item-details__content--tab item-details__content--tab-kk" : "item-details__content--tab item-details__content--tab-ru"}>
                            <Accordion title={'conclusion_form_first_part'} conclusionLang={conclusionLang} >
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"availability_of_competence_of_the_developers_authority"} defaultValue={conclusionData.locales.availability_of_competence_of_the_developers_authority} label={'availability_of_competence_of_the_developers_authority'} />
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"compliance_with_the_requirements"} defaultValue={conclusionData.locales.compliance_with_the_requirements} label={'compliance_with_the_requirements'} />
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"the_stated_and_real_purpose_of_the_project"} defaultValue={conclusionData.locales.the_stated_and_real_purpose_of_the_project} label={'the_stated_and_real_purpose_of_the_project'} />
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"public_interest_and_private_interests"} defaultValue={conclusionData.locales.public_interest_and_private_interests} label={'public_interest_and_private_interests'} />
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"sufficiency_of_argumentation"} defaultValue={conclusionData.locales.sufficiency_of_argumentation} label={'sufficiency_of_argumentation'} />
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"financial_and_economic_justification"} defaultValue={conclusionData.locales.financial_and_economic_justification} label={'financial_and_economic_justification'} />
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"conducting_regulatory_impact_analysis"} defaultValue={conclusionData.locales.conducting_regulatory_impact_analysis} label={'conducting_regulatory_impact_analysis'} />
                            </Accordion>
                            <Accordion title={'conclusion_form_scond_part'} conclusionLang={conclusionLang}  >
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"the_language_of_the_npa_project"} defaultValue={conclusionData.locales.the_language_of_the_npa_project} label={'project_language'} />
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"legislative_consistency_of_the_project"} defaultValue={conclusionData.locales.legislative_consistency_of_the_project} label={'legislative_consistency_of_the_project'} />
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"competence"} defaultValue={conclusionData.locales.competence} label={'competence'} />
                            </Accordion>
                            {conclusionData.detailed_analysis_of_risk_factors.map((item, index) =>
                                <Accordion title={'detailed_analysis'} conclusionLang={conclusionLang} key={item.id} number={index + 1} id={item.id} conclusionId={conclusionId} amount={conclusionData.detailed_analysis_of_risk_factors.length} setRefreshData={setRefreshData} refreshData={refreshData}>
                                    <input type="text" style={{ display: "none" }} defaultValue={conclusionData.detailed_analysis_of_risk_factors[index]?.id} {...register(`detailed_analysis_of_risk_factors[${index}].id`)} />
                                    <AccordionEdit conclusionLang={conclusionLang} name={`detailed_analysis_of_risk_factors[${index}].article`} control={control} defaultValue={item.locales.article} label={'article'} noEdit={true} register={register} />
                                    <AccordionEdit conclusionLang={conclusionLang} name={`detailed_analysis_of_risk_factors[${index}].part`} control={control} defaultValue={item.locales.part} label={'part'} noEdit={true} register={register} />
                                    <AccordionEdit conclusionLang={conclusionLang} name={`detailed_analysis_of_risk_factors[${index}].point`} control={control} defaultValue={item.locales.point} label={'point'} />
                                    <AccordionEdit conclusionLang={conclusionLang} name={`detailed_analysis_of_risk_factors[${index}].sub_paragraph`} control={control} defaultValue={item.locales.sub_paragraph} label={'sub_paragraph'} />
                                    <AccordionEdit conclusionLang={conclusionLang} name={`detailed_analysis_of_risk_factors[${index}].the_text_of_the_problematic_norm`} control={control} defaultValue={item.locales.the_text_of_the_problematic_norm} label={'the_text_of_the_problematic_norm'} />
                                    <AccordionEdit conclusionLang={conclusionLang} name={`detailed_analysis_of_risk_factors[${index}].remark`} control={control} defaultValue={item.locales.remark} label={'remark'} />
                                    <AccordionEdit conclusionLang={conclusionLang} name={`detailed_analysis_of_risk_factors[${index}].recommendations`} control={control} defaultValue={item.locales.recommendations} label={'recommendations'} />
                                    <AccordionEdit conclusionLang={0} control={control} name={`detailed_analysis_of_risk_factors[${index}].risk_factor_id`} defaultValue={item.locales.risk_factor_name} defaultValueID={item.locales.risk_factor_id} label={'risk_factors'} options={riskFactors} />
                                    <AccordionEdit conclusionLang={0} control={control} name={`detailed_analysis_of_risk_factors[${index}].corruption_risks`} defaultValue={item.locales.corruption_risks} label={'corruption_risks'} options={corruptionRisks} isMulti={true} />
                                </Accordion>
                            )}
                            <Accordion title={'cocnlusion_forth_part'} conclusionLang={conclusionLang}  >
                                <AccordionEdit conclusionLang={conclusionLang} control={control} name={"output_text"} defaultValue={conclusionData.locales.output_text} label={'output_text'} />
                            </Accordion>
                            <div className='buttons'>
                                <button className='c-btn c-btn-primary' onClick={() => setToDraft(true)}>{t("save_to_draft")}</button>

                                {conclusionData.status.id == 13 || (conclusionData.status.id == 10 && ((conclusionData.locales.corrector_document_src.kk !== null || conclusionData.locales.corrector_document_src.ru !== null) && (conclusionData.locales.translater_document_src.kk !== null || conclusionData.locales.translater_document_src.ru !== null))) ?
                                    <button className='c-btn c-btn-orange'>{t("send_final_conclusion")}</button> :
                                    conclusionData.status.id == 12 ? <button className='c-btn c-btn-red'>{t("send_to_translator")}</button> :
                                        <button className='c-btn c-btn-purple'>{t("send_to_coordinator")}</button>}
                            </div>
                        </form>
                    </div>
                }
            </div>
            <ModalAi close={setShowModalAi} open={showModalAi} aiData={conclusionData?.project.law_analysis} />
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} openSuccessRelocate={openSuccessRelocate} />
            <ModalSendFinalToCoordinator close={setSendFinalToCoordinator} open={sendFinalToCoordinator} conclusionData={conclusionEditData} conclusionId={conclusionId} />
            <ModalSendToTranslator close={setSendToTranslator} open={sendToTranslator} conclusionData={conclusionEditData} conclusionId={conclusionId} />
            <ModalSendToCoordinator close={setSendToCoordinator} open={sendToCoordinator} conclusionData={conclusionEditData} conclusionId={conclusionId} />
        </Wrapper>
    )
}

export default ConclusionEdit;