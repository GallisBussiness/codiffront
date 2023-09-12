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
import { BsPencilSquare } from "react-icons/bs";
import CreatePavillonModal from "../crud/CreatePavillonModal";
import UpdatePavillonModal from "../crud/UpdatePavillonModal";
import {
  createPavillon,
  getPavillons,
  removePavillon,
  updatePavillon,
} from "../services/pavillonservice";

import { useNavigate } from "react-router-dom";
import { ActionIcon, Button, LoadingOverlay } from "@mantine/core";

function Pavillons() {
  const [selectedPavillons, setSelectedPavillons] = useState(null);
  const qk = ["get_Pavillons"];
  const { data: Pavillons, isLoading } = useQuery(qk, () => getPavillons());
  const qc = useQueryClient();
  const navigate = useNavigate();
  const toast = useRef();

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nom: {
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
    (data) => createPavillon(data),
    {
      onSuccess: (_) => {
        toast.current.show({
          severity: "success",
          summary: "Creation Pavillon",
          detail: "Création réussie !!",
        });
        qc.invalidateQueries(qk);
      },
      onError: (_) => {
        toast.current.show({
          severity: "error",
          summary: "Create Pavillon",
          detail: "Creation échouée !!",
        });
      },
    }
  );

  const { mutate: deleteD, isLoading: loadingD } = useMutation(
    (id) => removePavillon(id),
    {
      onSuccess: (_) => {
        toast.current.show({
          severity: "success",
          summary: "Suppréssion Pavillon",
          detail: "Suppréssion réussie !!",
        });
        qc.invalidateQueries(qk);
      },
      onError: (_) => {
        toast.current.show({
          severity: "error",
          summary: "Suppréssion Pavillon",
          detail: "Suppréssion échouée !!",
        });
      },
    }
  );

  const { mutate: update, isLoading: loadingU } = useMutation(
    (data) => updatePavillon(data._id, data.data),
    {
      onSuccess: (_) => {
        toast.current.show({
          severity: "success",
          summary: "Mise à jour Pavillon",
          detail: "Mis à jour réussie !!",
        });
        qc.invalidateQueries(qk);
      },
      onError: (_) => {
        toast.current.show({
          severity: "error",
          summary: "Mis à jour Pavillon",
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
          onClick={handleCreatePavillon}
          leftIcon={<AiOutlinePlus />}
        >
          Nouveau
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-700"
          disabled={!selectedPavillons || !selectedPavillons.length}
          onClick={(ev) => handleDelete(ev)}
          leftIcon={<MdDelete />}
        >
          {" "}
          Supprimer
        </Button>
      </div>
    );
  };

  const handleUpdatePavillon = (d) => {
    UpdatePavillonModal({ pavillon: d }).then((dt) => {
      const { _id, ...rest } = dt;
      update({ _id, data: rest });
    });
  };

  const handleCreatePavillon = () => {
    CreatePavillonModal().then(create);
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
        for (let i = 0; i < selectedPavillons?.length; i++) {
          deleteD(selectedPavillons[i]?._id);
        }
      },
      reject: () => {},
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h5 className="m-0">Liste des Pavillons</h5>
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
          onClick={() => handleUpdatePavillon(rowData)}
        >
          <BsPencilSquare size={26} />
        </ActionIcon>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <>
      <LoadingOverlay
        visible={isLoading || loadingC || loadingU || loadingD}
        overlayBlur={2}
      />
      <div className="flex flex-wrap bg-whity">
        <div className="w-full px-3 mb-6 lg:mb-0 lg:flex-none">
          <div className="relative flex flex-col h-40 min-w-0 break-words bg-white shadow-soft-xl bg-clip-border">
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
            value={Pavillons}
            paginator
            className="p-datatable-customers"
            header={header}
            rows={10}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}
            dataKey="_id"
            size="small"
            selection={selectedPavillons}
            onSelectionChange={(e) => setSelectedPavillons(e.value)}
            filters={filters}
            filterDisplay="menu"
            loading={isLoading}
            responsiveLayout="scroll"
            globalFilterFields={["nom", "type"]}
            emptyMessage="Aucun Pavillon trouvé"
            currentPageReportTemplate="Voir {first} de {last} à {totalRecords} Pavillons"
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "2em" }}
            ></Column>
            <Column
              field="nom"
              header="Nom"
              sortable
              style={{ minWidth: "2rem" }}
            />
            <Column
              field="type"
              header="Type"
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
      <Toast ref={toast} />
      <ConfirmPopup />
      <ModalContainer />
    </>
  );
}

export default Pavillons;
