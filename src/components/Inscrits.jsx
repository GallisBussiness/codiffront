import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import {
  ActionIcon,
  Button,
  LoadingOverlay,
  Table,
  Title,
} from "@mantine/core";
import { getInscrits } from "../services/etudiantApi";
import {
  createSelectionne,
  getSelectionneBySessionAndFormation,
  removeSelectionne,
} from "../services/selectionneService";
import { notifications } from "@mantine/notifications";
import { FaCheck, FaPrint, FaTrash } from "react-icons/fa";
import ReactToPrint from "react-to-print";
import { SelectionnePedagogiquePrint } from "./SelectionnePedagogiquePrint";

function Inscrits() {
  const [selectionHomme, setSelectionneHomme] = useState(0);
  const [selectionFemme, setSelectionneFemme] = useState(0);
  const [restantHomme, setRestantHomme] = useState(0);
  const [restantFemme, setRestantFemme] = useState(0);
  const keyTi = ["getTotalSelectionnes", session, formation];
  const { data: ts, isLoading: isloadingts } = useQuery(
    keyTi,
    () => getSelectionneBySessionAndFormation(state.idSession, formation),
    {
      onSuccess: (_) => {
        const sh = _.filter((s) => s.inscription.etudiant.sexe === "H").length;
        const sf = _.filter((s) => s.inscription.etudiant.sexe === "F").length;
        setSelectionneHomme(sh);
        setSelectionneFemme(sf);
        setRestantHomme(state.data.nb_lit_g - sh);
        setRestantFemme(state.data.nb_lit_f - sf);
      },
    }
  );
 
  const { mutate: addSelectionne } = useMutation((d) => createSelectionne(d), {
    onSuccess: (_) => {
      notifications.show({
        title: "Default notification",
        message: "Hey there, your code is awesome! 🤥",
      });
      qc.invalidateQueries(key);
      qc.invalidateQueries(keyTi);
    },
  });

  const { mutate: delSelectionne } = useMutation(
    (id) => removeSelectionne(id),
    {
      onSuccess: (_) => {
        notifications.show({
          title: "Unselected",
          message: "Etudiant décodifié! 🤥",
          color: "green",
        });
        qc.invalidateQueries(key);
        qc.invalidateQueries(keyTi);
        qc.invalidateQueries(keyI);
      },
    }
  );

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
  const SelectInscription = (e) => {
    confirmPopup({
      target: e.currentTarget,
      message: "Etes-vous sure ?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const { data: d } = e;
        const { formation } = d;
        const sexe = d.etudiant.sexe;
        if (sexe === "H") {
          if (restantHomme <= 0) {
            notifications.show({
              title: "Nombre homme épuisé",
              message: "La sélection est épuisée",
              color: "red",
            });
            return;
          }
        }

        if (sexe === "F") {
          if (restantFemme <= 0) {
            notifications.show({
              title: "Nombre femme épuisé",
              message: "La sélection est épuisée",
              color: "red",
            });
            return;
          }
        }

        if (ts.find((s) => s.inscription._id === d._id)) {
          notifications.show({
            title: "Déja sélectionné",
            message: "Etudiant déja sélectionné ..",
            color: "red",
          });
          return;
        } else {
          if (d.is_codified === true) {
            notifications.show({
              title: "Déja sélectionné!",
              message: "Etudiant déja sélectionné pour la sociale..",
              color: "red",
            });
            return;
          }
        }

        addSelectionne({
          session: state.idSession,
          formation: formation._id,
          inscription: d,
        });
      },
      reject: () => console.log("annule"),
    });
  };

  const removeSeleted = (id) => delSelectionne(id);

  const codifiedTemplate = (row) =>
    row?.is_codified ? (
      <FaCheck size={20} color="green" />
    ) : (
      <FaCheck size={20} color="red" />
    );

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <h5 className="m-0">Liste Des étudiants inscrits pour la session</h5>
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

  const header = renderHeader();

  return (
    <>
      <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>QUOTAS HOMMES</Title>
          <Table>
            <thead>
              <tr>
                <th>TOTAL</th>
                <th>SELECTIONNES HOMMES</th>
                <th>RESTANTS HOMMES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{state.data.nb_lit_g}</td>
                <td>{selectionHomme}</td>
                <td>{restantHomme}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>QUOTAS FEMMES</Title>
          <Table>
            <thead>
              <tr>
                <th>TOTAL</th>
                <th>SELECTIONNES FEMMES</th>
                <th>RESTANTS FEMMES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{state.data.nb_lit_f}</td>
                <td>{selectionFemme}</td>
                <td>{restantFemme}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>ETUDIANTS INSCRITS </Title>
          <div className="w-full">
            <DataTable
              value={data}
              paginator
              rowClassName={rowClass}
              header={header}
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="_id"
              rowHover
              selectionMode="single"
              selection={selectedInscrit}
              onRowSelect={SelectInscription}
              onSelectionChange={(e) => {
                setSelectedInscrit(e.value);
              }}
              filters={filters}
              filterDisplay="menu"
              loading={isLoading}
              responsiveLayout="scroll"
              globalFilterFields={["etudiant.nce", "etudiant.cni"]}
              emptyMessage="Aucun Session trouvé"
              currentPageReportTemplate="Voir {first} de {last} à {totalRecords} etudiants"
            >
              <Column
                field="is_codified"
                header="CODIFIE"
                body={codifiedTemplate}
                sortable
                style={{ minWidth: "2rem" }}
              />
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
            </DataTable>
          </div>
        </div>
      </div>
      <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <div className="flex space-x-2">
            <Title order={4}>LISTE DES SELECTIONNES </Title>{" "}
            <ReactToPrint
              trigger={() => (
                <Button className="bg-sky-500">
                  IMPRIMER <FaPrint size={20} />
                </Button>
              )}
              content={() => componentRef.current}
            />
          </div>

          <Table>
            <thead>
              <tr>
                <th>NCE</th>
                <th>CNI</th>
                <th>PRENOM</th>
                <th>NOM</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {ts?.map((p) => (
                <tr key={p._id}>
                  <td>{p.inscription.etudiant.nce}</td>
                  <td>{p.inscription.etudiant.cni}</td>
                  <td>{p.inscription.etudiant.prenom}</td>
                  <td>{p.inscription.etudiant.nom}</td>
                  <td>
                    <ActionIcon color="green" size="lg">
                      <FaTrash size={20} onClick={() => removeSeleted(p._id)} />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="mx-5">
        <SelectionnePedagogiquePrint ref={componentRef} selectionnes={ts} />
      </div>

      <ConfirmPopup />
    </>
  );
}

export default Inscrits;
