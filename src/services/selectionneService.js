import Api from "./api";

export const createSelectionne = (data) => Api.post('/selectionne', data).then(res => res.data);
export const getSelectionnes = () => Api.get('/selectionne').then(res => res.data);
export const getSelectionne = (id) => Api.get('/selectionne/'+ id).then(res => res.data);
export const getSelectionneBySessionAndFormation = (session,formation) => Api.get(`/selectionne/bysessionandformation/${session}/${formation}`).then(res => res.data);
export const getSelectionneByDepartement = (departement) => Api.get(`/selectionne/bydepartement/${departement}`).then(res => res.data);
export const updateSelectionne = (id,data) => Api.patch('/selectionne/' + id, data).then(res => res.data);
export const removeSelectionne = (id) => Api.delete('/selectionne/'+id).then(res => res.data);