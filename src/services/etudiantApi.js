import Api from "./api";

  export const getEtudiants = () => Api.get('/etudiant').then(res => res.data);
  export const getEtudiantById  = (id) => Api.get('/etudiant/'+ id).then(res => res.data);
  export const getTotalByDepartment  = () => Api.get('/inscription/gettotalbydepartment').then(res => res.data);
  export const getInscrits  = (session,formation) => Api.get('/inscription/bysessionandformation/' + session + '/' + formation).then(res => res.data);
  export const getInscritsBySession  = (session) => Api.get('/inscription/bysession/' + session).then(res => res.data);
  export const getPedagoqueSession = () => Api.get('/session_etudiant').then(res => res.data);

