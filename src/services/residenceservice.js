import Api from "./api";

export const createResidence = (data) => Api.post('/residence', data).then(res => res.data);
export const getResidences = () => Api.get('/residence').then(res => res.data);
export const getResidence = (id) => Api.get('/residence/' + id).then(res => res.data);
export const updateResidence = (id,data) => Api.patch('/residence/' + id, data).then(res => res.data);
export const removeResidence = (id) => Api.delete('/residence/'+id).then(res => res.data);