import Api from "./api";

export const createPavillon = (data) => Api.post('/pavillon', data).then(res => res.data);
export const getPavillons = () => Api.get('/pavillon').then(res => res.data);
export const getPavillonsByResidence = (id) => Api.get('/pavillon/byresidence/' + id).then(res => res.data);
export const getPavillon = (id) => Api.get('/pavillon', id).then(res => res.data);
export const updatePavillon = (id,data) => Api.patch('/pavillon/' + id, data).then(res => res.data);
export const removePavillon = (id) => Api.delete('/pavillon/'+id).then(res => res.data);