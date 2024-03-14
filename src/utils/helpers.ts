import React from "react";
import { IFormData } from "../constants/interfaces";

const buildFormData = (formData:IFormData, data:any, parentKey:any) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
    } else {
        const value = data == null ? '' : data;
        formData.append(parentKey, value);
    }
}
export const convertObjectToFormData = (data:object) => {
    const formData = new FormData();
    buildFormData(formData, data, '');
    return formData;
}

export const convertObjectToFormDataPUT = (data:Object) => {
    const formData = new FormData();
    formData.append("_method", "put");
    buildFormData(formData, data, '');
    return formData;
}

export function useHeightAnimation(isOpen = false, duration = 350) {
    const contentRef = React.useRef<any>(null);
    const [height, setHeight] = React.useState(isOpen ? 'auto' : 0);
    const handleClick = () => {
        const contentRect = contentRef.current?.getBoundingClientRect();
        setHeight(`${contentRect.height}px`);
        setTimeout(() => setHeight(height === 0 ? `${contentRect.height}px` : 0));
        setTimeout(() => {
                if (height === 0) setHeight('auto'); 
            },
            duration,
            height,
        );
    };
    return { height, handleClick, contentRef };
}
