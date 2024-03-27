import { useSelector } from "react-redux";
import https from "./https";


const getCoverLetters = (page: number, filterData?: string, orderby?:boolean) => {
    return https.get(`cover-letters${orderby ? '?orderby[id]=desc&' : '?'}per_page=8&page=${page}&${filterData}`, { headers: { "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}` } })
}
const assignCoverLetter = (coverLetter_id:number, data:any) => {
    return https.post(`cover-letters\\${coverLetter_id}`, data, { headers: { 'Content-Type': 'multipart/form-data', "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}` } })
}
const addCoverLetter = (coverLetter_id: number,coverLetterData:any) => {
    return https.put(`cover-letters\\${coverLetter_id}`,coverLetterData, { headers: { "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}` } })
}

export const CoverLettersServices ={
    getCoverLetters,
    assignCoverLetter,
    addCoverLetter
}