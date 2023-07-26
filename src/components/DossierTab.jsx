import React from 'react'

function DossierTab({dossier}) {
    console.log(dossier)
  return (
    <>
    <div className="flex flex-col w-full lg:flex-row">
  <div className="grid flex-grow h-32 card bg-sky-700 rounded-box place-items-center text-white">
    MOBILIER appartenant à la cité
  </div> 
  <div className="divider lg:divider-horizontal">ET</div> 
  <div className="grid flex-grow h-32 card bg-sky-700 rounded-box place-items-center text-white">MOBILIER appartenant aux résidents</div>
</div>
<div className="flex flex-col justify-between w-8/12 mx-auto my-10 lg:flex-row ">
<div className="overflow-x-auto">
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
    </>
  )
}

export default DossierTab