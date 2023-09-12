import Api from "./api";

export const getPayementByDossier = (id) => Api.get('/payement/dossier/'+ id).then(res => res.data);
export const updatePayement = (id,data) => Api.patch('/payement/' + id, data).then(res => res.data);