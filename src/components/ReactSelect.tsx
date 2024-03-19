import React, { useTransition } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next';
import Select from "react-select";
import { LocalesName, ReactSelectProps } from '../constants/interfaces';

const ReactSelect = ({ name, control, required, options, clear, isClearable, isMulti, defaultValue, setSelectedValue, title, edited, error, onInput }: ReactSelectProps) => {
    const { t, i18n } = useTranslation("common")
    const selectInputRef = React.useRef<any>();
    const [selectedOptions, setSelectedOptions] = React.useState(() => {
        if (isMulti && defaultValue) return defaultValue.map((item: any) => {
            return { label: item.locales.name[i18n.language as keyof LocalesName], value: item.id }
        })
    });

    React.useEffect(() => {
        if (typeof clear == 'boolean') {
            selectInputRef?.current?.clearValue()
        }
    }, [clear]);
    return (
        <div className={edited ? 'form-item' : 'form-item form-item__read-only'}>
            <p>{t(title)} {required && edited && "*"}</p>
            {!edited ? (Array.isArray(defaultValue) ? <ol>
                {defaultValue.map((item: any, index: number) => <li key={index + "q"}>{item.locales.name[i18n.language as keyof LocalesName]}</li>)}
            </ol> : <input type="text" defaultValue={defaultValue?.locales?.name[i18n.language as keyof LocalesName]} readOnly />) :
                <Controller
                    name={name}
                    control={control}
                    rules={{ required: required }}
                    render={({ field: { onChange, value, ref } }) =>
                        <Select
                            isMulti={isMulti}
                            isClearable={isClearable}
                            value={isMulti ? selectedOptions : options.filter(item => value ? value == item.value : defaultValue?.id == item.value)}
                            ref={required ? ref : selectInputRef}
                            onChange={(val: any) => {
                                setSelectedValue && setSelectedValue(val);
                                if (isMulti) {
                                    setSelectedOptions(val);
                                    onChange(val.map((c: any) => c?.value))
                                } else {
                                    onChange(val?.value)
                                    onInput && onInput()
                                }
                            }}
                            isOptionDisabled={() => isMulti && selectedOptions ? selectedOptions.length >= 5 : false}
                            classNamePrefix="custom-select"
                            placeholder={t("placeholder_select")}
                            options={options}
                        />
                    } />}
            {error && required && <p className='form-item__error'>{t(error[name]?.message)}</p>}
        </div>
    )
}

export default ReactSelect