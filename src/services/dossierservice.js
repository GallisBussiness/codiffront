import Api from "./api";

export const createDossier = (data) => Api.post('/dossier', data).then(res => res.data);
export const getDossiers = () => Api.get('/dossier').then(res => res.data);
export const getDossier = (id) => Api.get('/dossier/'+ id).then(res => res.data);
export const getDossierByInscription = (id) => Api.get('/dossier/byinscription/'+ id).then(res => res.data);
export const updateDossier = (id,data) => Api.patch('/dossier/' + id, data).then(res => res.data);
export const removeDossier = (id) => Api.delete('/dossier/'+id).then(res => res.data);