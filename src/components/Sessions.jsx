import { FilterMatchMode, FilterOperator } from "primereact/api";
import { ConfirmPopup } from "primereact/confirmpopup";
import { confirmPopup } from "primereact/confirmpopup";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ModalContainer from "react-modal-promise";
import { InputText } from "primereact/inputtext";
import { BsEye, BsPencilSquare } from "react-icons/bs";
import CreateSessionModal from "../crud/CreateSessionModal";
import UpdateSessionModal from "../crud/UpdateSessionModal";
import {
  createSession,
  getSessions,
  removeSession,
  updateSession,
} from "../services/sessionservice";

import { useNavigate } from "react-router-dom";
import { ActionIcon, Button, LoadingOverlay } from "@mantine/core";
import { format, parseISO } from "date-fns";

function Sessions() {
  const [selectedSessions, setSelectedSessions] = useState(null);
  const qk = ["get_Sessions"];
  const { data: Sessions, isLoading } = useQuery(qk, () => getSessions());
  console.log(Sessions);
  const qc = useQueryClient();
  const navigate = useNavigate();
  const toast = useRef();

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    annee: {
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

  const { mutate: create, isLoading: loadingC } = useMutation(
    (data) => createSession(data),
    {
      onSuccess: (_) => {
        toast.current.show({
          severity: "success",
          summary: "Creation Session",
          detail: "Création réussie !!",
        });
        qc.invalidateQueries(qk);
      },
      onError: (_) => {
        toast.current.show({
          severity: "error",
          summary: "Create Session",
          detail: "Creation échouée !!",
        });
      },
    }
  );

  const { mutate: deleteD, isLoading: loadingD } = useMutation(
    (id) => removeSession(id),
    {
      onSuccess: (_) => {
        toast.current.show({
          severity: "success",
          summary: "Suppréssion Session",
          detail: "Suppréssion réussie !!",
        });
        qc.invalidateQueries(qk);
      },
      onError: (_) => {
        toast.current.show({
          severity: "error",
          summary: "Suppréssion Session",
          detail: "Suppréssion échouée !!",
        });
      },
    }
  );

  const { mutate: update, isLoading: loadingU } = useMutation(
    (data) => updateSession(data._id, data.data),
    {
      onSuccess: (_) => {
        toast.current.show({
          severity: "success",
          summary: "Mise à jour Session",
          detail: "Mis à jour réussie !!",
        });
        qc.invalidateQueries(qk);
      },
      onError: (_) => {
        toast.current.show({
          severity: "error",
          summary: "Mis à jour Session",
          detail: "Mis à jour échouée !!",
        });
      },
    }
  );

  const leftToolbarTemplate = () => {
    return (
      <div className="flex items-center justify-center space-x-2">
        <Button
          className="bg-green-500 hover:bg-green-700"
          onClick={handleCreateSession}
          leftIcon={<AiOutlinePlus />}
        >
          Nouveau
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-700"
          disabled={!selectedSessions || !selectedSessions.length}
          onClick={(ev) => handleDelete(ev)}
          leftIcon={<MdDelete />}
        >
          {" "}
          Supprimer
        </Button>
      </div>
    );
  };

  const handleUpdateSession = (d) => {
    UpdateSessionModal({ session: d }).then((dt) => {
      const { _id, ...rest } = dt;
      update({ _id, data: rest });
    });
  };

  const handleViewSession = (d) => {
    navigate(`/dashboard/sessions/${d._id}`);
  };
  const handleCreateSession = () => {
    CreateSessionModal().then(create);
  };

  const handleDelete = async (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Etes vous sur de vouloir supprimer ?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Supprimer",
      acceptClassName:
        "bg-red-500 hover:bg-red-700 border-none ring-node focus:ring-none",
      accept: () => {
        for (let i = 0; i < selectedSessions?.length; i++) {
          deleteD(selectedSessions[i]?._id);
        }
      },
      reject: () => {},
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h5 className="m-0">Liste des Sessions</h5>
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

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center space-x-1">
        <ActionIcon
          color="green"
          size="lg"
          onClick={() => handleUpdateSession(rowData)}
        >
          <BsPencilSquare size={26} />
        </ActionIcon>
        <ActionIcon
          color="blue"
          size="lg"
          onClick={() => handleViewSession(rowData)}
        >
          <BsEye size={26} />
        </ActionIcon>
      </div>
    );
  };

  const header = renderHeader();
  const dateTemplate = (row) =>
    format(parseISO(row?.dateDeNaissance), "dd-MM-yyyy");
  const createdTemplate = (row) =>
    row?.createdAt ? format(parseISO(row?.createdAt), "dd-MM-yyyy") : "neant";

  return (
    <div className="bg-white">
      <LoadingOverlay
        visible={isLoading || loadingC || loadingU || loadingD}
        overlayBlur={2}
      />
      <div className="flex flex-wrap bg-white">
        <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
          <div className="relative flex flex-col h-40 min-w-0 break-words shadow-soft-xl bg-clip-border">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap -mx-3">
                <div className="max-w-full px-3 lg:w-1/2 lg:flex-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="datatable-doc mt-4 mx-10">
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            value={Sessions}
            paginator
            className="p-datatable-customers"
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="_id"
            rowHover
            selection={selectedSessions}
            onSelectionChange={(e) => setSelectedSessions(e.value)}
            filters={filters}
            filterDisplay="menu"
            loading={isLoading}
            responsiveLayout="scroll"
            globalFilterFields={["annee"]}
            emptyMessage="Aucun Session trouvé"
            currentPageReportTemplate="Voir {first} de {last} à {totalRecords} sessions"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "2em" }}
            ></Column>
            <Column
              field="annee"
              header="Annee"
              sortable
              body={createdTemplate}
              style={{ minWidth: "2rem" }}
            />
            <Column
              field="pedagogique"
              header="Pedagogique"
              style={{ minWidth: "2rem" }}
            />
            <Column
              field="sociale"
              header="Sociale"
              style={{ minWidth: "2rem" }}
            />
            <Column
              field="amicale"
              header="Amicale"
              style={{ minWidth: "2rem" }}
            />
            <Column field="autre" header="Autre" style={{ minWidth: "2rem" }} />
            <Column
              field="licence1"
              header="Licence1"
              style={{ minWidth: "2rem" }}
            />
            <Column
              field="licence2"
              header="Licence2"
              style={{ minWidth: "2rem" }}
            />
            <Column
              field="licence3"
              header="Licence3"
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
      <Toast ref={toast} />
      <ConfirmPopup />
      <ModalContainer />
    </div>
  );
}

export default Sessions;
