import { useMutation, useQuery, useQueryClient} from "react-query";
import { useParams } from "react-router-dom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import {
    Button,
  Table,
  Title,
} from "@mantine/core";
import {
  createSelectionne,
  getSelectionneSocialeBySession,
  removeSelectionne,
} from "../services/selectionneService";
import { notifications } from "@mantine/notifications";
import { FaCheck, FaTrash} from "react-icons/fa";
import { useSessionStore } from "../store/session";
import { shallow } from "zustand/shallow";
import { getInscrits, getInscritsBySession } from "../services/etudiantApi";

function CodificationSociale() {
  const [selectionHomme, setSelectionneHomme] = useState(0);
  const [selectionFemme, setSelectionneFemme] = useState(0);
  const [restantHomme, setRestantHomme] = useState(0);
  const [restantFemme, setRestantFemme] = useState(0);
  const qc = useQueryClient();
    const {
        session,
        calculs
       } = useSessionStore(
         (state) => ({
           session:state.session,
           calculs:state.calculs
         }),
         shallow
       );
       const key = ["get_Inscrits", session._id];
    const keyTi = ["getTotalSelectionnesSociale", session._id];
    const { data: ts, isLoading: isloadingts } = useQuery(
      keyTi,
      () => getSelectionneSocialeBySession(session._id),
      {
        onSuccess: (_) => {
          const sh = _.filter((s) => s.inscription.etudiant.sexe === "H").length;
          const sf = _.filter((s) => s.inscription.etudiant.sexe === "F").length;
          setSelectionneHomme(sh);
          setSelectionneFemme(sf);
          setRestantHomme(calculs?.absoluSocGarcon - sh);
          setRestantFemme(calculs?.absoluSocFille - sf);
        },
      }
    );

    const { data: inscrits, isLoading } = useQuery(
        key,
        () => getInscritsBySession(session._id),
      );

    
   
    const { mutate: addSelectionne } = useMutation((d) => createSelectionne(d), {
      onSuccess: (_) => {
        notifications.show({
          title: "CODIFICATION",
          message: "Codification réussie !!",
          color:"green",
        });
        qc.invalidateQueries(keyTi);
        qc.invalidateQueries(key);
      },
    });
  
    const { mutate: delSelectionne } = useMutation(
      (id) => removeSelectionne(id),
      {
        onSuccess: (_) => {
          notifications.show({
            title: "CODIFICATION Unselected",
            message: "Etudiant décodifié! 🤥",
            color: "green",
          });
          qc.invalidateQueries(keyTi);
          qc.invalidateQueries(key);
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
      const rowClass = (data) => {
        return {
            'bg-red-500': data.is_codified === false,
        };
    };

    const SelectInscription = (e,rowData) => {
        confirmPopup({
          target: e.currentTarget,
          message: "Etes-vous sure de vouloir codifier ?",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            const { formation,etudiant } = rowData;
            const sexe = etudiant.sexe;
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
    
            if (ts.find((s) => s.inscription._id === rowData._id)) {
              notifications.show({
                title: "Déja sélectionné",
                message: "Etudiant déja sélectionné ..",
                color: "red",
              });
              return;
            } else {
              if (rowData.is_codified === true) {
                notifications.show({
                  title: "Déja sélectionné!",
                  message: "Etudiant déja sélectionné pour la sociale..",
                  color: "red",
                });
                return;
              }
            }
    
            addSelectionne({
              session: session._id,
              formation: formation._id,
              inscription: rowData,
              typeCodif: "SOCIALE"
            });
          },
          reject: () => console.log("annule"),
        });
      };

      const enlever = (e,rowData) => {
        confirmPopup({
          target: e.currentTarget,
          message: "Etes-vous sure de vouloir enlever ?",
          icon: "pi pi-exclamation-triangle",
          acceptLabel:"OUI",
          accept: () => {
           const sel =  ts.find((s) => s.inscription._id === rowData._id);
           removeSeleted(sel._id);
          },
          reject: () => console.log("annule"),
        });
      };
    
      const removeSeleted = (id) => delSelectionne(id);


      const  actionTemplate = (rowData) => {
        return (
          <div className="flex items-center justify-center space-x-1">
           <Button className="bg-sky-500" disabled={rowData.is_codified} onClick={(e) => SelectInscription(e,rowData)}>CODIFIER <FaCheck className="inline"/></Button>
           <Button className="bg-red-500" disabled={!rowData.is_codified} onClick={(e) => enlever(e,rowData)}>ENLEVER <FaTrash className="inline"/></Button>
          </div>
        );
      };
    
      const header = renderHeader();
  return (
    <>
    <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>QUOTAS SOCIALE HOMMES</Title>
          <Table>
            <thead>
              <tr>
                <th>TOTAL</th>
                <th>SELECTIONNES SOCIALE HOMMES</th>
                <th>RESTANTS SOCIALE HOMMES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{calculs?.absoluSocGarcon}</td>
                <td>{selectionHomme}</td>
                <td>{restantHomme}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
   <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>QUOTAS SOCIALE FEMMES</Title>
          <Table>
            <thead>
              <tr>
                <th>TOTAL</th>
                <th>SELECTIONNES SOCIALE FEMMES</th>
                <th>RESTANTS SOCIALE FEMMES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{calculs?.absoluSocFille}</td>
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
              value={inscrits}
              paginator
              size="small"
              rowClassName={rowClass}
              header={header}
              loading={isloadingts || isLoading}
              rows={10}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="_id"
              filters={filters}
              filterDisplay="menu"
              responsiveLayout="scroll"
              globalFilterFields={["etudiant.nce", "etudiant.cni"]}
              emptyMessage="Aucun Etudiant trouvé"
              currentPageReportTemplate="Voir {first} de {last} à {totalRecords} etudiants"
            >
              <Column
                field="etudiant.nce"
                header="NCE"
                sortable
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
                body={actionTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
      <ConfirmPopup />
    </>
  )
}

export default CodificationSociale