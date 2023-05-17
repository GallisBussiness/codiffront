import axios from "axios";
const Api = axios.create({
    baseURL: import.meta.env.VITE_ETUDIANT_SERVICE,
  })

  Api.interceptors.request.use(config => {
    const token = "b5909d77-6712-4982-9641-40acb07bfeb4";
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  })


  export const getEtudiants = () => Api.get('/etudiant').then(res => res.data);
  export const getEtudiantById  = (id) => Api.get('/etudiant/'+ id).then(res => res.data);
  export const getTotalByDepartment  = () => Api.get('/inscription/gettotalbydepartment').then(res => res.data);
  export const getInscrits  = (session,formation) => Api.get('/inscription/bysessionandformation/' + session + '/' + formation).then(res => res.data);
  export const getInscritsBySession  = (session) => Api.get('/inscription/bysession/' + session).then(res => res.data);
  export const getPedagoqueSession = () => Api.get('/session').then(res => res.data);

