import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { ActionIcon, LoadingOverlay, Title } from "@mantine/core";
import { FaBook } from "react-icons/fa";
import { getSelectionneBySession} from "../services/selectionneService";
import { useSessionStore } from "../store/session";
import { shallow } from "zustand/shallow";
function Residents() {
  const navigate = useNavigate();
  const {
    session
   } = useSessionStore(
     (state) => ({
       session:state.session
     }),
     shallow
   );
  const key = ["getResidents", session._id];
  const { isLoading, data } = useQuery(key, () => getSelectionneBySession(session._id));
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "inscription.etudiant.nce": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
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
        <h5 className="m-0 uppercase">
          Liste Des étudiants codifiés pour la session {session?.nom}
        </h5>
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
  

  const  actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center space-x-1">
        <ActionIcon
          color="blue"
          size="lg"
          onClick={() => navigate(`dossier/${rowData._id}`)}
        >
          <FaBook size={26} />
        </ActionIcon>
      </div>
    );
  };

  const header = renderHeader();
  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>RESIDENTS DE LA SESSION {session?.nom}</Title>
          <div className="w-full my-10">
            <DataTable
              value={data}
              paginator
              header={header}
              rows={10}
              size="small"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="_id"
              selectionMode="single"
              filters={filters}
              filterDisplay="menu"
              loading={isLoading}
              responsiveLayout="scroll"
              globalFilterFields={["inscription.etudiant.nce", "inscription.etudiant.cni"]}
              emptyMessage="Aucun étudiants trouvé"
              currentPageReportTemplate="Voir {first} de {last} à {totalRecords} etudiants"
            >
              <Column
                field="inscription.etudiant.nce"
                header="NCE"
                sortable
                style={{ minWidth: "2rem" }}
              />
               <Column
                field="typeCodif"
                header="CODIFICATION"
                sortable
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="inscription.etudiant.cni"
                header="CNI"
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="inscription.etudiant.prenom"
                header="PRENOM"
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="inscription.etudiant.nom"
                header="NOM"
                style={{ minWidth: "2rem" }}
              />

              <Column
                field="inscription.formation.nom"
                header="FORMATION"
                sortable
                style={{ minWidth: "2rem" }}
              />
              <Column
                headerStyle={{ width: "4rem", textAlign: "center" }}
                bodyStyle={{ textAlign: "center", overflow: "visible" }}
                body={actionBodyTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
}

export default Residents;
