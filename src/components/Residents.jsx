import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { ActionIcon, LoadingOverlay, Title } from "@mantine/core";
import { getInscritsBySession } from "../services/etudiantApi";
import { FaBook } from "react-icons/fa";
function Residents() {
  const [codifies, setCodifies] = useState([]);
  const { session,id } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const key = ["getResidents", session];
  const { isLoading } = useQuery(key, () => getInscritsBySession(session), {
    onSuccess: (_) => {
      setCodifies(_.filter((c) => c.is_codified));
    },
  });

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "etudiant.nce": {
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
          Liste Des étudiants codifiés pour la session
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
  const rowClass = (data) => {
    return "bg-red-500";
  };

  const  actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center space-x-1">
        <ActionIcon
          color="blue"
          size="lg"
          onClick={() => navigate(`/dashboard/dossier/${rowData._id}/${id}`)}
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
          <Title order={4}>DOSSIERS RESIDENTS </Title>
          <div className="w-full">
            <DataTable
              value={codifies}
              paginator
              rowClassName={rowClass}
              header={header}
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="_id"
              rowHover
              selectionMode="single"
              filters={filters}
              filterDisplay="menu"
              loading={isLoading}
              responsiveLayout="scroll"
              globalFilterFields={["etudiant.nce", "etudiant.cni"]}
              emptyMessage="Aucun étudiants trouvé"
              currentPageReportTemplate="Voir {first} de {last} à {totalRecords} etudiants"
            >
              <Column
                field="etudiant.nce"
                header="NCE"
                sortable
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="etudiant.cni"
                header="CNI"
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="etudiant.prenom"
                header="PRENOM"
                style={{ minWidth: "2rem" }}
              />
              <Column
                field="etudiant.nom"
                header="NOM"
                style={{ minWidth: "2rem" }}
              />

              <Column
                field="formation.nom"
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
