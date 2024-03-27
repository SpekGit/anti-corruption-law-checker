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
    const [conclusionData, setConclusionData] = React.useState<IConclusionDetails>()

    let conclusionId = Number(useLocation().pathname.replace(/[a-z\/]/g, ''))

    const [sendFinalToCoordinator, setSendFinalToCoordinator] = React.useState<boolean>(false)
    const [sendToTranslator, setSendToTranslator] = React.useState<boolean>(false)
    const [sendToCoordinator, setSendToCoordinator] = React.useState<boolean>(false)
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)
    const [openSuccessRelocate, setOpenSuccessRelocate] = React.useState<string>('')

    const [showModalAi, setShowModalAi] = React.useState<boolean>(false)
    const [conclusionEditData, setConclusionEditData] = React.useState()

    return (
        <Wrapper>
            <ModalAi close={setShowModalAi} open={showModalAi} aiData={conclusionData?.project.law_analysis} />
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} openSuccessRelocate={openSuccessRelocate} />
            <ModalSendFinalToCoordinator close={setSendFinalToCoordinator} open={sendFinalToCoordinator} conclusionData={conclusionEditData} conclusionId={conclusionId} />
            <ModalSendToTranslator close={setSendToTranslator} open={sendToTranslator} conclusionData={conclusionEditData} conclusionId={conclusionId} />
            <ModalSendToCoordinator close={setSendToCoordinator} open={sendToCoordinator} conclusionData={conclusionEditData} conclusionId={conclusionId} />
        </Wrapper>
    );
};

export default ConclusionEdit;