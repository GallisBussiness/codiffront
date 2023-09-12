import { ActionIcon, Title } from '@mantine/core'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import { useSessionStore } from '../store/session';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { FaEye } from 'react-icons/fa';

function CodificationPedagogique() {
  const navigate = useNavigate();
  const {
   totalByDepartments,
   session
  } = useSessionStore(
    (state) => ({
      totalByDepartments: state.totalByDepartments,
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
                      onClick={() => voirFormation(rowData)}
                    >
                      <FaEye size={26} />
                    </ActionIcon>
      </div>
    );
  };

  const voirFormation = (p) =>
  navigate(`${p._id}/formations`);

  const getTotalLits = () => totalByDepartments.reduce((acc,cur) => acc + cur.nb_lit ,0);
  const getTotalEtudiants = () => totalByDepartments.reduce((acc,cur) => acc + cur.total ,0);

  const paginatorLeft = <div className="text-xl text-sky-700 font-bold"> Total Etudiants = {getTotalEtudiants()} </div>;
  const paginatorRight =  <div className="text-xl text-sky-700 font-bold"> Total Lits = {getTotalLits()} </div>;
 
  return (
    <>
    <div className="my-2 mx-4"><Title order={5}>CODIFICATION PEDAGOGIQUE POUR LA SESSION {session?.nom}</Title></div>
    
     <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>EFFECTIFS PAR DEPARTEMENT</Title>
          <div className="w-full my-4">
            <DataTable
              value={totalByDepartments}
              paginator
              header={header}
              rows={10}
              size="small"
              filters={filters}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="departement.nom"
              filterDisplay="menu"
              responsiveLayout="scroll"
              globalFilterFields={["departement.nom"]}
              emptyMessage="Aucun Departement trouvé"
              currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Departements"
              paginatorLeft={paginatorLeft}
              paginatorRight={paginatorRight}
            >
              <Column
                field="departement.nom"
                header="NOM DU DEPARTEMENT"
                sortable
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="total"
                header="TOTAL"
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

export default CodificationPedagogique