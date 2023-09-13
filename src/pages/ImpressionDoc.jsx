import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import PedagogiquePrint from './PedagogiquePrint'
import SocialePrint from './SocialePrint'
import { getSelectionneBySession } from '../services/selectionneService';
import { LoadingOverlay } from '@mantine/core';
import { useQuery } from 'react-query';
import { useSessionStore } from '../store/session';
import { shallow } from 'zustand/shallow';
import { uniqBy } from 'lodash';

const getSelectionnePedagogiques = (selectionnes) => selectionnes?.filter(s => s.typeCodif === "PEDAGOGIQUE");

const getSelectionneSociales = (selectionnes) => selectionnes?.filter(s => s.typeCodif === "SOCIALE");

const getSelectionnePedagogiqueByDepartement = (deps,selectionnes) => {
  const fd = deps?.map(d => {
    const selectionneByFormation = getSelectionnePedagogiques(selectionnes)?.filter(s => s.inscription.formation.departement === d._id);
    const form = selectionneByFormation?.map(s => ({nom: s.inscription.formation.nom, selectionnes: selectionnes.filter(se => se.formation === s.inscription.formation._id)}))
    const uform = uniqBy(form,(v) => v.nom);
    return {nom:d.departement.nom,id:d._id,formations: uform};
  });
  return fd || [];
}

const getSelectionneSocialeByDepartement = (deps,selectionnes) => {
  const fd = deps?.map(d => {
    const selectionneByFormation = getSelectionneSociales(selectionnes)?.filter(s => s.inscription.formation.departement === d._id);
    const form = selectionneByFormation?.map(s => ({nom: s.inscription.formation.nom, selectionnes: selectionnes.filter(se => se.formation === s.inscription.formation._id)}))
    const uform = uniqBy(form,(v) => v.nom);
    return {nom:d.departement.nom,id:d._id,formations: uform};
  });
  return fd || [];
}

function ImpressionDoc() {
  const {
    totalByDepartments,
    session,
  } = useSessionStore(
    (state) => ({
      totalByDepartments: state.totalByDepartments,
      session: state.session
    }),
    shallow
  );
  const keys = ["get_Selectionne"];

  const {data,isLoading} = useQuery(keys,() => getSelectionneBySession(session?._id));
// console.log(getSelectionneByDepartement(totalByDepartments,data))
  return (
    <>
    <LoadingOverlay visible={isLoading} overlayBlur={2} />
    <div className="flex items-center space-x-5 my-10 mx-10">
    <PDFViewer width={800} height={800}>
       <PedagogiquePrint selectionne={getSelectionnePedagogiqueByDepartement(totalByDepartments,data)} session={session.annee}/>
    </PDFViewer>
    <PDFViewer width={800} height={800}>
       <SocialePrint selectionne={getSelectionneSocialeByDepartement(totalByDepartments,data)} session={session.annee}/>
    </PDFViewer>
    </div>
    </>
  )
}

export default ImpressionDoc