import { LoadingOverlay, Table, Title } from '@mantine/core'
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSessionStore } from '../store/session';
import { shallow } from "zustand/shallow";
import { useQuery } from 'react-query';
import { getSessionResults } from '../services/sessionservice';
import { FaBed, FaFemale, FaMale } from 'react-icons/fa';

function SessionV2() {

  const { id } = useParams();
  const key = ["get_Results", id];
  const {
    pavillons,
    setPavillons,
    calculs,
    setTotalByDepartments,
    setCalculs,
    setSession,
    setEffectifFormations,
    session,
    setInscrits
  } = useSessionStore(
    (state) => ({
      pavillons: state.pavillons,
      setPavillons: state.setPavillons,
      setCalculs: state.setCalculs,
      calculs: state.calculs,
      setEffectifFormations: state.setEffectifFormations,
      setTotalByDepartments: state.setTotalByDepartments,
      setInscrits: state.setInscrits,
      setSession: state.setSession,
      session: state.session
    }),
    shallow
  );
  const { isLoading } = useQuery(key, () => getSessionResults(id), {
    onSuccess: (_) => {
      setPavillons(_.pavillons);
      setCalculs(_.calculs);
      setSession(_.session);
      setInscrits(_.inscrits);
      setEffectifFormations(_.effectifFormation);
      setTotalByDepartments(_.totalParDepartement);
    },
  });

  return (
    <div className="mx-4">
    <LoadingOverlay
      visible={isLoading}
        overlayBlur={2}
      />
     <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>CAPACITE DES PAVILLONS POUR LA SESSION {session?.nom} </Title>
          <Table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>TYPE</th>
                <th>NOMBRE DE LIT</th>
              </tr>
            </thead>
            <tbody>
              {pavillons?.map((p) => (
                <tr key={p._id}>
                  <td>{p.nom}</td>
                  <td>{p.type}</td>
                  <td>{p.nb_lit}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>TOTAL : {calculs.totalLits} LITS</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2 flex-col md:flex-row md:space-y-2 my-10">
      <div className="card w-96 bg-sky-700 text-primary-content">
     <div className="card-body">
    <h2 className="card-title">CODIFICATION PEDAGOGIQUE</h2>
    <h3 className="font-bold text-sm">SESSION : {session?.nom}</h3>
    <h3 className="font-bold text-md">TOTAL LITS : {calculs?.absoluPedagogique} <FaBed className="h-6 w-6 inline-block"/></h3>
    <h3 className="font-bold text-md">{calculs?.absoluPedGarcon} <FaMale className="h-6 w-6 inline-block"/></h3>
    <h3 className="font-bold text-md">{calculs?.absoluPedFille} <FaFemale className="h-6 w-6 inline-block"/></h3>
    <div className="card-actions justify-end">
      <Link to={`codification-pedagogique`} className="btn">CODIFIER</Link>
    </div>
  </div>
</div>

<div className="card w-96  bg-slate-700 text-primary-content">
  <div className="card-body">
    <h2 className="card-title">CODIFICATION SOCIALE</h2>
    <h3 className="font-bold text-sm">SESSION : {session?.nom}</h3>
    <h3 className="font-bold text-md">TOTAL LITS : {calculs?.absoluSociale} <FaBed className="h-6 w-6 inline-block"/></h3>
    <h3 className="font-bold text-md">{calculs?.absoluSocGarcon} <FaMale className="h-6 w-6 inline-block"/></h3>
    <h3 className="font-bold text-md">{calculs?.absoluSocFille} <FaFemale className="h-6 w-6 inline-block"/></h3>
    <div className="card-actions justify-end">
      <Link to="codification-sociale" className="btn">CODIFIER</Link>
    </div>
  </div>
</div>
      </div>
      <div className="flex items-center justify-center space-x-2 flex-col md:flex-row md:space-y-2 my-10">
      <div className="card w-96  bg-orange-700 text-primary-content">
  <div className="card-body">
    <h2 className="card-title">IMPRESSION DES FICHES</h2>
    <p>SESION {session?.nom}</p>
    <div className="card-actions justify-end">
      <Link to="impression-doc" className="btn">IMPRIMER</Link>
    </div>
  </div>
</div>

<div className="card w-96  bg-green-700 text-primary-content">
  <div className="card-body">
    <h2 className="card-title">RESIDENTS DE LA SESSION</h2>
    <p>SESION {session?.nom}</p>
    <div className="card-actions justify-end">
      <Link to="residents" className="btn">VOIR LES RESIDENTS</Link>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}

export default SessionV2