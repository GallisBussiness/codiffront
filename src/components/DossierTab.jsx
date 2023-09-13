import { Button, LoadingOverlay } from '@mantine/core'
import React from 'react'
import UpdateFicheModal from '../crud/UpdateFicheModal';
import { useMutation, useQueryClient } from 'react-query';
import { updateDossier } from '../services/dossierservice';
import { showNotification } from '@mantine/notifications';
import UpdatePayementModal from '../crud/UpdatePayementModal';

function DossierTab({dossier}) {
  const  qc = useQueryClient();
  const key = ["getDossier", dossier?.selectionne._id];
  const {mutate,isLoading} = useMutation((data) => updateDossier(dossier?._id,data),{
    onSuccess:(_) => {
      showNotification({
        title: 'Modification dossier Réussi',
        message: 'Le Dossier a ete bien modifie !!',
        color:'green',
      });
      qc.invalidateQueries(key)
    },
    onError:(err) => {
      showNotification({
        title: 'Modification dossier Echoue',
        message: 'La modification du Dossier a echoue !!',
        color:'red',
      })
    }
  })

  const updateFiche = () => {
    UpdateFicheModal({fiche:dossier}).then(mutate);
  }

  const UpdatePayement = () => {
    UpdatePayementModal({dossier:dossier._id});
  }

  return (
    <div className="mx-10">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <div className="flex items-center justify-between space-x-2 border-2 p-2">
        <div className="flex items-center space-x-2 mx-10 my-5">
        <Button className="bg-sky-600" onClick={updateFiche}>MODIFIER LE DOSSIER </Button><Button className="bg-green-600" onClick={UpdatePayement}>GESTION DES PAIEMENTS</Button>
      </div>
       <div>
        <div className="flex items-center justify-center py-5 bg-sky-600 px-10 text-white font-bold">
          PROPRIETAIRE DU DOSSIER
        </div>
        <div className="flex flex-col">
          <h3>PRENOM : {dossier?.selectionne.inscription.etudiant.prenom}</h3>
          <h3>NOM : {dossier?.selectionne.inscription.etudiant.nom}</h3>
          <h3>NCE : {dossier?.selectionne.inscription.etudiant.nce}</h3>
          <h3>email : {dossier?.selectionne.inscription.etudiant.email}</h3>
          <h3>TEL : {dossier?.selectionne.inscription.etudiant.telephone}</h3>
        </div>
       </div>
      </div>
    
    
<div className="flex flex-col justify-between w-full  my-10 lg:flex-row">
<div className="overflow-x-auto">
<div className="p-10 w-full bg-sky-700 rounded-box place-items-center text-white my-5">
    MOBILIER appartenant à la cité
  </div>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>DESIGNATION</th>
        <th>QUANTITE</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Sommier de 90 ou lit en bois</td>
        <td>{dossier?.mobilier_cite.cite_sommierOuLit}</td>
      </tr>
      <tr>
        <td>Matelas de 90</td>
        <td>{dossier?.mobilier_cite.cite_matelas90}</td>
      </tr>
      <tr>
        <td>Draps</td>
        <td>{dossier?.mobilier_cite.cite_draps}</td>
      </tr>
      <tr>
        <td>Couvertures</td>
        <td>{dossier?.mobilier_cite.cite_couverture}</td>
      </tr>
      <tr>
        <td>Rideau Fenetre</td>
        <td>{dossier?.mobilier_cite.cite_rideau_fenetre}</td>
      </tr>
      <tr>
        <td>Table de travail</td>
        <td>{dossier?.mobilier_cite.cite_tableDeTravail}</td>
      </tr>
      <tr>
        <td>Chaises</td>
        <td>{dossier?.mobilier_cite.cite_chaises}</td>
      </tr>
      <tr>
        <td>Etagere</td>
        <td>{dossier?.mobilier_cite.cite_etagere}</td>
      </tr>
      <tr>
        <td>Lampe de Chevet</td>
        <td>{dossier?.mobilier_cite.cite_lampeDeChevet}</td>
      </tr>
      <tr>
        <td>Seau</td>
        <td>{dossier?.mobilier_cite.cite_seau}</td>
      </tr>
      <tr>
        <td>Corbeille a Papiers</td>
        <td>{dossier?.mobilier_cite.cite_corbeilleAPapiers}</td>
      </tr>
      <tr>
        <td>Taie d'Oreiller</td>
        <td>{dossier?.mobilier_cite.cite_tableOreiller}</td>
      </tr>
      <tr>
        <td>Oreiller</td>
        <td>{dossier?.mobilier_cite.cite_oreiller}</td>
      </tr>
    </tbody>
  </table>
</div>

<div className="overflow-x-auto">
<div className="p-10 w-full bg-green-700 rounded-box  text-white my-5">MOBILIER appartenant aux résidents</div>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>DESIGNATION</th>
        <th>QUANTITE</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Matelas</td>
        <td>{dossier?.mobilier_resident.resident_matelas}</td>
      </tr>
      <tr>
        <td>Draps</td>
        <td>{dossier?.mobilier_resident.resident_drap}</td>
      </tr>
      <tr>
        <td>Couvertures</td>
        <td>{dossier?.mobilier_resident.resident_couverture}</td>
      </tr>
    </tbody>
  </table>
</div>
</div>
    </div>
  )
}

export default DossierTab