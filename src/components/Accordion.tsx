import React, { FC, ReactNode } from 'react'
import { LocalesName } from '../constants/interfaces';
import ReactWysiwyg from './ReactWysivyg';
import IconsContent from '../assets/icons/IconsContent';
import Select from "react-select"
import { Controller } from 'react-hook-form'
import { useHeightAnimation } from '../utils/helpers';
import { ConclusionsServices } from '../services/ConclusionsServices';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


type Accordion = {
    title: string;
    children: ReactNode;
    conclusionLang: number;
    number?: number;
    id?: number;
    conclusionId?: number;
    amount?: number;
    refreshData?: boolean
    setRefreshData?: Function
}
type AccordionItem = {
    conclusionLang: number;
    content: LocalesName;
    label: string;
    content_data?: any
}
type AccordionEdit = {
    name: string
    conclusionLang: number;
    defaultValue: any;
    label: string;
    control?: any;
    isMulti?: boolean;
    options?: any;
    noEdit?: boolean;
    defaultValueID?: number;
    register?: Function

}
export const AccordionItem: React.FC<AccordionItem> = ({ conclusionLang, content, label, content_data }) => {
    const { t, i18n } = useTranslation('common')
    return (
        <>
            {conclusionLang == 1 ?
                <div className="accordion_wrapper">
                    <p >{t(`${label}_kk`)}</p>
                    <div className="textarea" dangerouslySetInnerHTML={{ __html: content.kk }} />
                </div>
                : null}
            {conclusionLang == 2 ?
                <div className="accordion_wrapper">
                    <p >{t(`${label}_ru`)} </p>
                    <div className="textarea" dangerouslySetInnerHTML={{ __html: content.ru }} />
                </div>
                : null}
            {conclusionLang == 0 ?
                <div className="accordion_wrapper">
                    <p >{t(`${label}`)} </p>
                    <div className="textarea"  >
                        {Array.isArray(content_data) ?
                            <ol>
                                {content_data.map((val) => <li>{val[0][i18n.language as keyof LocalesName]}</li>)}
                            </ol> :
                            <p>{content_data}</p>}
                    </div>
                </div>
                : null}
        </>
    )
}

export const AccordionEdit: React.FC<AccordionEdit> = ({ conclusionLang, defaultValue, defaultValueID, control, label, name, isMulti, options, noEdit, register }) => {
    const { t, i18n } = useTranslation('common')
    return (
        <>
            {conclusionLang == 1 ?
                <div className="accordion_wrapper">
                    <p >{t(`${label}_kk`)}</p>
                    {noEdit ? <textarea defaultValue={defaultValue.kk} {...register && register(`${name}_kk`)} /> :
                        <ReactWysiwyg name={`${name}_kk`} control={control} defaultValue={defaultValue.kk} />}
                </div>
                : null}
            {conclusionLang == 2 ?
                <div className="accordion_wrapper">
                    <p >{t(`${label}_ru`)} </p>
                    {noEdit ? <textarea defaultValue={defaultValue.ru} {...register && register(`${name}_ru`)} /> :
                        <ReactWysiwyg name={`${name}_ru`} control={control} defaultValue={defaultValue.ru} />}
                </div>
                : null}
            {conclusionLang == 0 ?
                <div className="accordion_wrapper">
                    <p >{t(`${label}`)} </p>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field: { onChange, value, ref } }) =>
                            <Select
                                ref={ref}
                                isMulti={isMulti}
                                isClearable={false}
                                value={isMulti ? options.filter((item: { value: any; label: any; }) => value ? value.includes(item.value) : defaultValue.find((val: any) => val[0].ru == item.label)) :
                                    options.filter((item: { value: any; }) => value ? value == item.value : defaultValueID == item.value)}
                                onChange={(val: any) => {
                                    if (isMulti) {

                                        onChange(val.map((c: any) => c?.value))
                                    } else {
                                        onChange(val?.value)
                                    }
                                }}
                                classNamePrefix="custom-select"
                                placeholder={t("placeholder_select")}
                                options={options}
                            />
                        } />
                </div>
                : null}
        </>
    )

}

export const Accordion: React.FC<Accordion> = ({ title, children, conclusionLang, number, id, conclusionId, amount, setRefreshData, refreshData }) => {
    const dispatch = useDispatch()
    const duration = 350;
    const { t, i18n } = useTranslation('common')
    const { height, handleClick, contentRef } = useHeightAnimation(false, duration);
    return (
        <>
            <div className={conclusionLang == 1 ? 'c-btn c-btn-blue c-btn-accordion' : 'c-btn c-btn-greenLight c-btn-accordion'}
                onClick={handleClick}>
                <span> {t(title)} {number && `№ ${number}`}</span>
                <p className='c-btn-accordion__controll'>
                    {conclusionId && number && amount && (number == amount) && <button type='button' className='c-btn c-btn-green' onClick={(e: any) => {
                        dispatch({ type: "SET_LOADING_TRUE", payload: true })
                        e.stopPropagation();
                        ConclusionsServices.editConclusion(conclusionId, { detailed_analysis_of_risk_factors: [''] }).then(() => { setRefreshData && setRefreshData(!refreshData) })
                    }}>Добавить</button>}
                    {id && number && number > 1 && <button type='button' className='c-btn c-btn-red' onClick={(e: any) => {
                        dispatch({ type: "SET_LOADING_TRUE", payload: true })
                        e.stopPropagation();
                        ConclusionsServices.deleteDetailedFactor(id).then(() => { setRefreshData && setRefreshData(!refreshData) })
                    }}>Удалить</button>}
                    <span className={!height ? 'c-btn' : 'c-btn c-btn-accordion__arrow-rotate'}>{IconsContent.ArrowDown()}</span>
                </p>
            </div>
            <div style={{
                height: height, overflow: height === 'auto' ? 'visible' : 'hidden',
                transition: `height ${duration}ms cubic-bezier(0.4, 0, 1, 1)`,
            }} >
                <div className={"open"} ref={contentRef}>
                    {children}
                </div>
            </div>
        </>
    )
}

