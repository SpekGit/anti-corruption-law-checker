import https from "./https";

const getConclusions = (page: number, filterData: string, orderby?: boolean )=>{
    return https.get(`conclusions${orderby?'?orderby[id]=desc&':'?'}per_page=8&page=${page}&${filterData}`, { headers: { "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}`}})
}
const getConclusion = (conclusionID:number,)=>{
    return https.get(`conclusions/${conclusionID}`, { headers: { "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}`}})
}
const editConclusion = (conclusionId: number, conclusionEditData: any, )=>{
    return https.put(`conclusions/${conclusionId}`, conclusionEditData, { headers: { "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}` } })
}
const changeConclusion = (conclusionId: number, conclusionStatus: any) => {
    return https.put(`conclusions\\${conclusionId}`, conclusionStatus, { headers: { "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}` } })
}
const assignConclusion = (conclusionId: number, assignData: any) => {
    return https.post(`conclusions\\${conclusionId}`, assignData, { headers: { 'Content-Type': 'multipart/form-data', "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}` } })
}
const deleteDetailedFactor = (id:number) => {
    return https.delete(`detailed_factors\\${id}`, { headers: { 'Content-Type': 'multipart/form-data', "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}` } })
}
const addDetailedFactor = () => {
    return https.post(`detailed_factors`,{}, { headers: { "Authorization": `Bearer ${localStorage.getItem('.AuthToken')}` } })
}
const uploadConclusion = (conclusion_id:number, data:any) => {
    return https.post(`conclusions\\${conclusion_id}`, data, {headers:{'Content-Type': 'multipart/form-data',"Authorization": `Bearer ${localStorage.getItem('.AuthToken')}`}})
}

export const ConclusionsServices = {
    changeConclusion,
    getConclusions,
    getConclusion,
    editConclusion,
    assignConclusion,
    deleteDetailedFactor,
    addDetailedFactor,
    uploadConclusion
}