import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerProps, DatePickerRangeProps, } from '../constants/interfaces';
import ru from 'date-fns/locale/ru';
import kk from 'date-fns/locale/kk';
import IconsContent from '../assets/icons/IconsContent';
import moment from 'moment';


export function DatePickerInputRange({ nameFrom, nameTill, control, clear, required, title }: DatePickerRangeProps) {
    const { t, i18n } = useTranslation("common")
    registerLocale(`kk`, kk)
    registerLocale(`ru`, ru)
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();
    const selectInputRef = React.useRef<any>();
    const selectInputRef2 = React.useRef<any>();
    React.useEffect(() => {
        if (typeof clear == 'boolean') {
            selectInputRef.current.clear()
            selectInputRef2.current.clear()
        }
    }, [clear]);
    return (
        <div className='form-item'>
            <p>{title}</p>
            <div className='form-item__date-range'>
                <p>с</p>
                <div className='calendar'>
                    <Controller
                        control={control}
                        name={nameFrom}
                        rules={{ required: required }}
                        render={({ field: { onChange } }) =>
                            <DatePicker
                                ref={selectInputRef}
                                locale={i18n.language}
                                onChange={(date: any) => { setStartDate(date); onChange(moment(date).format("YYYY-MM-DD")) }}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                dateFormat="yyyy-MM-dd"
                                selected={startDate}
                                placeholderText={`${t("placeholder_select")}`}
                            />}
                    />
                    {IconsContent.DatePickerCalendar()}
                </div>
                <p>до</p>
                <div className='calendar'>
                    <Controller
                        control={control}
                        name={nameTill}
                        render={({ field: { onChange } }) =>
                            <DatePicker
                                ref={selectInputRef2}
                                placeholderText={`${t("placeholder_select")}`}
                                onChange={(date: any) => { setEndDate(date); onChange(moment(date).format("YYYY-MM-DD")) }}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                dateFormat="yyyy-MM-dd"
                                selected={endDate}
                            />}
                    />
                    <span>{IconsContent.DatePickerCalendar()}</span>
                </div>
            </div>
        </div>
    )
}
export function DatePickerInput({ name, control, clear, required, title, edited, defaultValue, error }: DatePickerProps) {
    const { t, i18n } = useTranslation("common")
    registerLocale(`kk`, kk)
    registerLocale(`ru`, ru)
    // const [startDate, setStartDate] = React.useState<any>();
    const [startDate, setStartDate] = React.useState<any>(defaultValue && new Date(defaultValue));
    const selectInputRef = React.useRef<any>();

    React.useEffect(() => {
        if (typeof clear == 'boolean') {
            selectInputRef?.current?.clear()
        }
    }, [clear]);
    return (
        <div className={edited ? 'form-item' : 'form-item form-item__read-only'}>
            <p>{t(title)}{required && edited && "*"}</p>
            {!edited && defaultValue ?
                <p className='form-item__read-only--text'>{defaultValue}</p>
                : <div className='calendar'>
                    <Controller
                        control={control}
                        name={name}
                        rules={{ required: required }}
                        render={({ field: { onChange, value, ref } }) =>
                            <DatePicker
                                ref={required ? (elem: any) => { elem && ref(elem.input) } : selectInputRef}
                                locale={i18n.language}
                                onChange={(date: any) => { onChange(moment(date).format("YYYY-MM-DD")); setStartDate(date) }}
                                dateFormat="yyyy-MM-dd"
                                selected={startDate}
                                placeholderText={`${t("placeholder_select")}`}
                            />}
                    />
                    {IconsContent.DatePickerCalendar()}
                </div>}
            {error && required && <p className='form-item__error'>{t(error[name]?.message)}</p>}
        </div>
    )
}
