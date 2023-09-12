import { ActionIcon, Title } from '@mantine/core'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import { useSessionStore } from '../store/session';
import { shallow } from 'zustand/shallow';
import { useNavigate, useParams } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { FaEye } from 'react-icons/fa';

const filterFormations = (list,id) => list.filter(v => v.formation.departement === id);

function FormationList() {
    const navigate = useNavigate();
    const {iddep} = useParams();
    const {
    effectifFormations,
     session
    } = useSessionStore(
      (state) => ({
        effectifFormations: filterFormations(state.effectifFormations,iddep),
        session:state.session
      }),
      shallow
    );
  
    const [filters, setFilters] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState("");
  
    const onGlobalFilterChange = (e) => {
      const value = e.target.value;
      let _filters = { ...filters };
      _filters["global"].value = value;
  
      setFilters(_filters);
      setGlobalFilterValue(value);
    };
  
    const renderHeader = () => {
      return (
        <div className="flex justify-between items-center">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Rechercher ..."
            />
          </span>
        </div>
      );
    };
    const header = renderHeader();
    const  actionTemplate = (rowData) => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <ActionIcon
                        color="orange"
                        size="lg"
                        onClick={() => viewInscrits(rowData)}
                      >
                        <FaEye size={26} />
                      </ActionIcon>
        </div>
      );
    };
  
    const viewInscrits = (p) => navigate(`${p.formation._id}`);

    const getTotalLits = () => effectifFormations.reduce((acc,cur) => acc + cur.nb_lit,0);
    const getTotalEtudiants = () => effectifFormations.reduce((acc,cur) => acc + cur.total ,0);
  
    const footer = <div className="text-xl text-sky-700 font-bold"> Total Etudiants = {getTotalEtudiants()}, Total Lits = {getTotalLits()} </div>;

  return (
    <>
    <div className="my-2 mx-4"><Title order={5}>CODIFICATION PEDAGOGIQUE POUR LA SESSION {session?.nom}</Title></div>
    
    <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>EFFECTIFS PAR FORMATION </Title>
          <div className="w-full">
            <DataTable
              value={effectifFormations}
              paginator
              header={header}
              filters={filters}
              rows={10}
              size="small"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="formation.nom"
              rowHover
              filterDisplay="menu"
              responsiveLayout="scroll"
              globalFilterFields={["formatiom.nom"]}
              emptyMessage="Aucun Formation trouvé"
              currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Fomations"
            footer={footer}
            >
              <Column
                field="formation.nom"
                header="NOM"
                sortable
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="total"
                header="EFFECTIF"
                sortable
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="percent"
                header="POURCENTAGE %"
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="nb_lit"
                header="NOMBRE DE LIT"
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="nb_lit_g"
                header="NOMBRE DE LIT POUR HOMME"
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="nb_lit_f"
                header="NOMBRE DE LIT POUR FEMME"
                style={{ minWidth: "2rem" }}
              />
              <Column
                headerStyle={{ width: "4rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
                body={actionTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormationList