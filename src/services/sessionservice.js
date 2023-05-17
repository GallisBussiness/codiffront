import Api from "./api";

export const createSession = (data) => Api.post('/session', data).then(res => res.data);
export const getSessions = () => Api.get('/session').then(res => res.data);
export const getSession = (id) => Api.get('/session/'+ id).then(res => res.data);
export const getSessionResults = (id) => Api.get('/session/results/'+ id).then(res => res.data);
export const updateSession = (id,data) => Api.patch('/session/' + id, data).then(res => res.data);
export const removeSession = (id) => Api.delete('/session/'+id).then(res => res.data);