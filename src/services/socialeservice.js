import Api from "./api";

export const createSociale = (data) => Api.post('/sociale', data).then(res => res.data);
export const getSociales = () => Api.get('/sociale').then(res => res.data);
export const getSociale = (id) => Api.get('/sociale/'+ id).then(res => res.data);
export const getSocialeBySession = (session) => Api.get(`/sociale/bysession/${session}`).then(res => res.data);
export const updateSociale = (id,data) => Api.patch('/sociale/' + id, data).then(res => res.data);
export const removeSociale = (id) => Api.delete('/sociale/'+id).then(res => res.data);