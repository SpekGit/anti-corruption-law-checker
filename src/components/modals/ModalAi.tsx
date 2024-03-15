

import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Portal } from '.'
import { OtherServices } from '../../services/Others';
import { ProjectsServices } from '../../services/ProjectServices';
import { UserServices } from '../../services/UserServices';
import { Accordion, AccordionEdit } from '../Accordion';
import { DatePickerInput } from '../ReactDatePicker';
import ReactSelect from '../ReactSelect';
import ModalError from './ModalError';
import ModalSuccess from './ModalSuccess';

type Props = {
    close: Function;
    open: boolean;
    aiData: {
        comments: [
            {
                agree: boolean,
                comment: string,
                id: number,
                reason: string,
                expert_id: string,
                risk_factor_id: {
                    id: number
                }
            }
        ],
        response: [
            {
                clause_text: string,
                final_reason: string,
                tag: string;
                tag_id: number
            }
        ],
        src: string

    }
};
const ModalAi: React.FC<Props> = ({ close, open, aiData }) => {
    const dispatch = useDispatch()
    const [clear, setClear] = React.useState<boolean>(false)
    const [conclusionLang, setConclusionLang] = React.useState(1)
    const [openError, setOpenError] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState<any>()
    const [openSuccess, setOpenSuccess] = React.useState<boolean>(false)

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        mode: 'onBlur'
    })
    const closeAi = () => {
        close(false)
        reset()
    }
    const onSubmit = (aiRespone: any) => {
        dispatch({ type: "SET_LOADING_TRUE", payload: true })
        aiData.comments.map((item, index) => {
            OtherServices.putLowAnalys(aiRespone.id[index], { agree: aiRespone.agree[index] == "true" ? true : false, comment: aiRespone.comment[index] })
                .then(() => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenSuccess(true); close(false) })
                .catch(err => { dispatch({ type: "SET_LOADING_FALSE" }); setOpenError(true); setErrorMessage(err); close(false) })

        })

    }
    return (
        <>
            <Portal close={closeAi} open={open} >
                <p className='modal__heading'>{t("ai_analys")}</p>
                <form onSubmit={handleSubmit(onSubmit)} className={conclusionLang == 1 ? "item-details__content--tab item-details__content--tab-kk" : "item-details__content--tab item-details__content--tab-ru"}>
                    {aiData && aiData?.comments.map((item: any, index: any) =>
                        <div key={item?.id}>
                            <Accordion title={`Фактор риска № ${item?.risk_factor_id?.id}: ${item?.risk_factor_id?.locales?.name?.ru} `} conclusionLang={conclusionLang} >
                                <div className='modal__ai'>
                                    <input type="text" {...register(`id[${index}`)} style={{ display: "none" }} value={item?.id} />
                                    <h3 className='modal__ai--header'>Статья</h3>
                                    <p className='modal__ai--content'>{item.clause_text}</p>
                                    <h3 className='modal__ai--header'> Причина: </h3>
                                    <p className='modal__ai--content'>{item.reason}</p>
                                    <h3 className='modal__ai--header'>Комментарии</h3>
                                    <textarea  {...register(`comment[${index}]`)}></textarea>
                                    <div className='modal__ai--voiting'>
                                        <p>
                                            <input type="radio" id="contactChoice1" {...register(`agree[${index}]`)} value={'true'} checked />
                                            <label htmlFor="contactChoice1">Согласен</label>
                                        </p>
                                        <p>
                                            <input type="radio" id="contactChoice2"  {...register(`agree[${index}]`)} value={'false'} />
                                            <label htmlFor="contactChoice2">Не согласен</label>
                                        </p>
                                    </div>
                                </div >
                            </Accordion>
                        </div >)}
                    <div className='modal__buttons'>
                        <button type='submit' className='c-btn c-btn-green'>{t("save")}</button>
                        <button type='button' className='c-btn c-btn-blue' onClick={() => closeAi()}>{t("close_modal")}</button>
                    </div>
                </form>

            </Portal>
            <ModalError open={openError} close={setOpenError} errorMessage={errorMessage} />
            <ModalSuccess open={openSuccess} close={setOpenSuccess} />
        </>
    )
}

export default ModalAi