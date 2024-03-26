import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ChangeProject from '../components/ChangeProject'
import Wrapper from '../components/Wrapper'
import { ConclusionsServices } from '../services/ConclusionsServices'
import { useDispatch, useSelector } from 'react-redux';
import { IConclusionDetails, LocalesName } from '../constants/interfaces'
import IconsContent from '../assets/icons/IconsContent'
import ModalAcceptConclusion from '../components/modals/ModalAcceptConclusion'
import ModalDenyConclusion from '../components/modals/ModalDenyConclusion'
import ModalReviseConclusion from '../components/modals/ModalReviseConclusion'
import ModalSentToCorrectorConclusion from '../components/modals/ModalSentToCorrectorConclusion'
import ModalAssignConclusion from '../components/modals/ModalAssignConclusion'
import ModalSendForEDSConclusion from '../components/modals/ModalSendForEDSConclusion'
import { Accordion, AccordionItem } from '../components/Accordion'
import ModalError from '../components/modals/ModalError'
import AddFileTranslator from '../components/AddFileTranslator'
import AddFileCorrector from '../components/AddFileCorrector'





const ConclusionEdit = () => {
    const { t, i18n } = useTranslation('common')
    let conclusionId = Number(useLocation().pathname.replace(/[a-z\/]/g, ''))
    const currentUser = useSelector((state: any) => state.currentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [conclusionData, setConclusionData] = React.useState<IConclusionDetails>()
    const [openModalConclusionAccept, setOpenModalConclusionAccept] = React.useState<boolean>(false)
    const [openModalConclusionDeny, setOpenModalConclusionDeny] = React.useState<boolean>(false)
    const [openModalConclusionAssign, setOpenModalConclusionAssign] = React.useState<boolean>(false)
    const [openModalConclusionRevise, setOpenModalConclusionRevise] = React.useState<boolean>(false)
    const [openModalConclusionCorrector, setOpenModalConclusionCorrector] = React.useState<boolean>(false)
    const [openModalConclusionSendForEDS, setOpenModalConclusionSendForEDS] = React.useState<boolean>(false)

    const conclusionFormLang = [1, 2]
    const [conclusionLang, setConclusionLang] = React.useState(1)

    React.useEffect(() => {

        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        ConclusionsServices.getConclusion(conclusionId)
            .then(response => {
                if (currentUser.role == 'expert') {
                    if (response.data.data.expert.id == currentUser.user) {
                        dispatch({ type: "SET_LOADING_FALSE", payload: false }); setConclusionData(response.data.data)
                    } else {
                        navigate('/conclusions')
                    }
                } else if (currentUser.role == 'corrector') {
                    if (response.data.data.project.corrector?.id == currentUser.user) {
                        dispatch({ type: "SET_LOADING_FALSE", payload: false }); setConclusionData(response.data.data)
                    } else {
                        navigate('/conclusions')
                    }
                } else if (currentUser.role == 'translator') {
                    if (response.data.data.project.transaltor.id == currentUser.user) {
                        dispatch({ type: "SET_LOADING_FALSE", payload: false }); setConclusionData(response.data.data)
                    } else {
                        navigate('/conclusions')
                    }
                } else {
                    dispatch({ type: "SET_LOADING_FALSE", payload: false }); setConclusionData(response.data.data)
                }

            })
            .catch((err) => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err) })
    }, [currentUser.role])

    return (
        <Wrapper>
            {conclusionData && <div className='item-details'>

                <div className='item-details__header'>
                    <p>{t("conclusion_view_form")}</p>
                    {currentUser.role == 'expert' && conclusionData?.status.id == 1 ?
                        <p >
                            <button className="c-btn c-btn-green" onClick={() => setOpenModalConclusionAccept(true)} >{t("accept")}</button>
                            <button className="c-btn c-btn-blue" onClick={() => navigate(`/projects/${conclusionData.project.id}`)}>{t("review_project")}</button>
                            <button className="c-btn c-btn-red" onClick={() => setOpenModalConclusionDeny(true)}>{t("deny")}</button>
                        </p>
                        : null}
                    {currentUser.role == 'expert' && conclusionData.status.id == 14 ?
                        <p>
                            <button className="c-btn c-btn-red" style={{ marginRight: "100px" }} onClick={() => { setOpenModalConclusionAssign(true); }}>{IconsContent.Persons()} {t("assign_by_eds")}</button>
                        </p>
                        : null}
                    {conclusionData.status.id == 9 ?
                        <p>
                            <button className="c-btn c-btn-assigned">{IconsContent.Success()}{t("assigned_by_expert")}</button>
                        </p>
                        : null}
                    {currentUser.role == 'coordinator' && conclusionData.status.id == 4 ?
                        <p>
                            <button className='c-btn c-btn-lightBlue' onClick={() => setOpenModalConclusionRevise(true)}>{t("send_to_revise")}{IconsContent.Recycle()}</button>
                            <button className='c-btn c-btn-secondary' onClick={() => setOpenModalConclusionCorrector(true)}>{t("send_to_corrector")}{IconsContent.Person()}</button>
                        </p> : null}
                    {currentUser.role == 'expert' && conclusionData.status.id == 2 || currentUser.role == 'expert' && conclusionData.status.id == 10 || currentUser.role == 'expert' && conclusionData.status.id == 12 || currentUser.role == 'expert' && conclusionData.status.id == 13 ?
                        <p >
                            <button className='c-btn c-btn-secondary' style={{ marginRight: "100px" }} onClick={() => navigate(`/conclusions/edit/${conclusionData.id}`)} >{t("back_to_conclusion_edit")}</button>
                        </p>
                        : null}
                    {currentUser.role == 'coordinator' && conclusionData.status.id == 8 ?
                        <p>
                            <button className='c-btn c-btn-blue' onClick={() => setOpenModalConclusionSendForEDS(true)}>{t("accept_conclusion")} {IconsContent.Success()}</button>
                            <button className='c-btn c-btn-red' onClick={() => setOpenModalConclusionRevise(true)}>{t("send_to_revise")}{IconsContent.Recycle()}</button>
                        </p>
                        : null}
                </div>
                <div className='item-details__content'>
                    <div className='item-details__content--left'>

                        {currentUser.role == 'translator' && conclusionData?.status.id == 7 && <AddFileTranslator conclusionId={conclusionId} />}
                        {currentUser.role == 'corrector' && conclusionData?.status.id == 11 && <AddFileCorrector conclusionId={conclusionId} />}

                        <div className={conclusionLang == 1 ? 'item-details__content--kk' : 'item-details__content--ru'}>
                            <p>
                                <button className={conclusionLang == 1 ? 'c-btn c-btn-left c-btn-lightBlue' : 'c-btn c-btn-left'} onClick={() => setConclusionLang(1)}>
                                    {t("conclusion_form_kk")}
                                </button>
                                <button className={conclusionLang == 2 ? 'c-btn c-btn-right c-btn-green' : 'c-btn c-btn-right'} onClick={() => setConclusionLang(2)}>
                                    {t("conclusion_form_ru")}
                                </button>
                            </p>
                        </div>
                        <div className={conclusionLang == 1 ? "item-details__content--tab item-details__content--tab-kk" : "item-details__content--tab item-details__content--tab-ru"}>
                            <Accordion title={'conclusion_form_first_part'} conclusionLang={conclusionLang} >
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.availability_of_competence_of_the_developers_authority} label={'availability_of_competence_of_the_developers_authority'} />
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.compliance_with_the_requirements} label={'compliance_with_the_requirements'} />
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.the_stated_and_real_purpose_of_the_project} label={'the_stated_and_real_purpose_of_the_project'} />
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.public_interest_and_private_interests} label={'public_interest_and_private_interests'} />
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.sufficiency_of_argumentation} label={'sufficiency_of_argumentation'} />
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.financial_and_economic_justification} label={'financial_and_economic_justification'} />
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.conducting_regulatory_impact_analysis} label={'conducting_regulatory_impact_analysis'} />
                            </Accordion>
                            <Accordion title={'conclusion_form_scond_part'} conclusionLang={conclusionLang}  >
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.the_language_of_the_npa_project} label={'project_language'} />
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.legislative_consistency_of_the_project} label={'legislative_consistency_of_the_project'} />
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.competence} label={'competence'} />
                            </Accordion>
                            {conclusionData.detailed_analysis_of_risk_factors.map((item, index) =>
                                <Accordion title={'detailed_analysis'} conclusionLang={conclusionLang} key={item.id} number={index + 1}>
                                    <AccordionItem conclusionLang={conclusionLang} content={item.locales.article} label={'article'} />
                                    <AccordionItem conclusionLang={conclusionLang} content={item.locales.part} label={'part'} />
                                    <AccordionItem conclusionLang={conclusionLang} content={item.locales.point} label={'point'} />
                                    <AccordionItem conclusionLang={conclusionLang} content={item.locales.sub_paragraph} label={'sub_paragraph'} />
                                    <AccordionItem conclusionLang={conclusionLang} content={item.locales.the_text_of_the_problematic_norm} label={'the_text_of_the_problematic_norm'} />
                                    <AccordionItem conclusionLang={conclusionLang} content={item.locales.remark} label={'remark'} />
                                    <AccordionItem conclusionLang={conclusionLang} content={item.locales.recommendations} label={'recommendations'} />
                                    <AccordionItem conclusionLang={0} content={{ kk: "", ru: "" }} content_data={item.locales.risk_factor_name[i18n.language as keyof LocalesName]} label={'risk_factor'} />
                                    <AccordionItem conclusionLang={0} content={{ kk: "", ru: "" }} content_data={item.locales.corruption_risks} label={'corruption_risks'} />
                                </Accordion>
                            )}
                            <Accordion title={'cocnlusion_forth_part'} conclusionLang={conclusionLang}  >
                                <AccordionItem conclusionLang={conclusionLang} content={conclusionData.locales.output_text} label={'output_text'} />
                            </Accordion>
                        </div>

                        <div className='item-details__content--project-details'>
                            {conclusionData && <ChangeProject projectData={conclusionData.project} editProject={false} />}
                        </div>
                    </div>

                    <div className='item-details__content--right'>
                        <div className='item-details__content--conclusions-wrapper'>
                            <h3>{t("expertise_data")}</h3>
                            <div className='item-details__content--conclusions-details'>
                                <p><span>{t("expert")}</span> : {conclusionData?.expert?.full_name}</p>
                                <p><span>{t("conclusions_id")}</span> : {conclusionData.id} <Link to={`/projects/${conclusionData.project.id}`}><button className='c-btn c-btn-orange'>{t("goback_to_project")}</button></Link></p>
                                <p><span>{t("responsible_corrector")}</span> : {conclusionData.project.corrector.full_name}</p>
                                <p><span>{t("responsible_translator")}</span> : {conclusionData.project.translator.full_name}</p>
                                <p><span>{t("deadline")}</span> : {conclusionData.deadline}</p>
                                {conclusionData.locales.expert_document_src.kk && <p><span>{t("conclusion_files_kk")}</span>:  <a href={conclusionData.locales.expert_document_src.kk} className="c-btn c-btn-green">{t("download")}{IconsContent.DownLoad()}</a></p>}
                                {conclusionData.locales.expert_document_src.ru && <p><span>{t("conclusion_files_ru")}</span>: <a href={conclusionData.locales.expert_document_src.ru} className="c-btn c-btn-green">{t("download")}{IconsContent.DownLoad()}</a></p>}
                                {conclusionData.locales.translater_document_src.kk && <p><span>{t("translator_files_kk")}</span>:  <a href={conclusionData.locales.translater_document_src.kk} className="c-btn c-btn-green">{t("download")}{IconsContent.DownLoad()}</a></p>}
                                {conclusionData.locales.translater_document_src.ru && <p><span>{t("translator_files_ru")}</span>: <a href={conclusionData.locales.translater_document_src.ru} className="c-btn c-btn-green">{t("download")}{IconsContent.DownLoad()}</a></p>}
                                {conclusionData.locales.corrector_document_src.kk && <p><span>{t("corrector_files_kk")}</span>:  <a href={conclusionData.locales.corrector_document_src.kk} className="c-btn c-btn-green">{t("download")}{IconsContent.DownLoad()}</a></p>}
                                {conclusionData.locales.corrector_document_src.ru && <p><span>{t("corrector_files_ru")}</span>: <a href={conclusionData.locales.corrector_document_src.ru} className="c-btn c-btn-green">{t("download")}{IconsContent.DownLoad()}</a></p>}
                                <p><span>Статус</span> : {conclusionData.status.locales.name[i18n.language as keyof LocalesName]}</p>
                            </div>
                        </div>
                        <div className='item-details__content--extra-details'>
                            <p>{t("coordinator_comment")}</p>
                            <p>{conclusionData.note}</p>
                        </div>
                        <div className='item-details__content--extra-details'>
                            <p>{t("coordinator_note")}</p>
                            <ol>{conclusionData.comments.map(item =>
                                <li>{item.text}</li>
                            )}</ol>
                        </div>
                    </div>

                </div>

            </div>}
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalAcceptConclusion close={setOpenModalConclusionAccept} open={openModalConclusionAccept} conclusionId={conclusionId} />
            <ModalDenyConclusion close={setOpenModalConclusionDeny} open={openModalConclusionDeny} conclusionId={conclusionId} />
            <ModalReviseConclusion close={setOpenModalConclusionRevise} open={openModalConclusionRevise} conclusionId={conclusionId} />
            <ModalAssignConclusion close={setOpenModalConclusionAssign} open={openModalConclusionAssign} conclusionId={conclusionId} />
            <ModalSendForEDSConclusion close={setOpenModalConclusionSendForEDS} open={openModalConclusionSendForEDS} conclusionId={conclusionId} />
            <ModalSentToCorrectorConclusion close={setOpenModalConclusionCorrector} open={openModalConclusionCorrector} conclusionId={conclusionId} />
        </Wrapper>
    )
}

export default ConclusionEdit



