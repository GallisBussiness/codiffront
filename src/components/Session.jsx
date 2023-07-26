import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { getSessionResults } from "../services/sessionservice";
import {
  ActionIcon,
  Button,
  LoadingOverlay,
  Table,
  Title,
} from "@mantine/core";
import { useSessionStore } from "../store/session";
import { shallow } from "zustand/shallow";
import { FaCheck, FaDownload, FaEye, FaPrint, FaTrash } from "react-icons/fa";
import { getInscritsBySession } from "../services/etudiantApi";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ReactToPrint from "react-to-print";
import {
  createSociale,
  getSocialeBySession,
  removeSociale,
} from "../services/socialeservice";
import { notifications } from "@mantine/notifications";
import { SocialePrint } from "./SocialePrint";

function Session() {
  const [selectedInscrit, setSelectedInscrit] = useState(null);
  const [selectionHomme, setSelectionneHomme] = useState(0);
  const [selectionFemme, setSelectionneFemme] = useState(0);
  const [restantHomme, setRestantHomme] = useState(0);
  const [restantFemme, setRestantFemme] = useState(0);
  const qc = useQueryClient();
  const componentRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const key = ["get_Results", id];
  const {
    pavillons,
    setPavillons,
    calculs,
    setCalculs,
    totalByDepartments,
    setTotalByDepartments,
    effectifFormations,
    setEffectifFormations,
    session,
    setSession,
  } = useSessionStore(
    (state) => ({
      pavillons: state.pavillons,
      setPavillons: state.setPavillons,
      setCalculs: state.setCalculs,
      calculs: state.calculs,
      totalByDepartments: state.totalByDepartments,
      setTotalByDepartments: state.setTotalByDepartments,
      effectifFormations: state.effectifFormations,
      setEffectifFormations: state.setEffectifFormations,
      session: state.session,
      setSession: state.setSession,
    }),
    shallow
  );
  const { isLoading } = useQuery(key, () => getSessionResults(id), {
    onSuccess: (_) => {
      setPavillons(_.pavillons);
      setCalculs(_.calculs);
      setTotalByDepartments(_.totalParDepartement);
      setEffectifFormations(_.effectifFormation);
      setSession(_.session);
    },
  });

  const { mutate: addSelectionne, isLoading: isLoadingC } = useMutation(
    (d) => createSociale(d),
    {
      onSuccess: (_) => {
        notifications.show({
          title: "Codification réussie !!!",
          message: "Bravo cet étudiant a été codifié...",
        });
        qc.invalidateQueries(key);
        qc.invalidateQueries(keyTi);
        qc.invalidateQueries(keyI);
      },
    }
  );

  const { mutate: delSelectionne, isLoading: isLaodingD } = useMutation(
    (id) => removeSociale(id),
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

  const keyI = ["getInscrits", session];

  const keyTi = ["getTotalSelectionnesSociale", session];
  const { data: ts, isLoading: isloadingts } = useQuery(
    keyTi,
    () => getSocialeBySession(id),
    {
      onSuccess: (_) => {
        const sh = _.filter((s) => s.inscription.etudiant.sexe === "H").length;
        const sf = _.filter((s) => s.inscription.etudiant.sexe === "F").length;
        setSelectionneHomme(sh);
        setSelectionneFemme(sf);
        setRestantHomme(calculs.absoluSocGarcon - sh);
        setRestantFemme(calculs.absoluSocFille - sf);
      },
      enabled: session != false,
    }
  );

  const { data: inscrits, isLoading: isLoadingI } = useQuery(
    keyI,
    () => getInscritsBySession(session),
    {
      enabled: session != false,
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
            title: "Déja sélectionné!",
            message: "Etudiant déja sélectionné ..",
            color: "red",
          });
          return;
        } else {
          if (d.is_codified === true) {
            notifications.show({
              title: "Déja sélectionné!",
              message: "Etudiant déja sélectionné pour la pédagogique..",
              color: "red",
            });
            return;
          }
        }

        addSelectionne({
          session: id,
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

  const  actionEffDepTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center space-x-1">
        <ActionIcon
          color="green"
          size="lg"
           onClick={() => printSelection(rowData)}
            >
      <FaDownload size={26} />
        </ActionIcon>
      </div>
    );
  };
  const  actionEffForTemplate = (rowData) => {
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

  const viewInscrits = (p) =>
    navigate(`/dashboard/sessions/${session}/${p.formation._id}`, {
      state: { data: p, idSession: id },
    });

  const gotoResidents = (id) => navigate(`/dashboard/residents/${session}/${id}`);

  const printSelection = (d) => {
    navigate(`/dashboard/sessions/${session}/print/${d._id}`, {
      state: { data: d, idSession: id },
    });
  };

  const header = renderHeader();

  return (
    <>
      <LoadingOverlay
        visible={
          isLoading || isLoadingI || isloadingts || isLoadingC || isLaodingD
        }
        overlayBlur={2}
      />
      <div className="p-4 flex items-center justify-end">
        <Button className="bg-cyan-700" onClick={() => gotoResidents(id)}>
          RESIDENTS DE LA SESSION <FaEye className="ml-1 inline " />
        </Button>
      </div>
      <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>CAPACITE DES PAVILLONS </Title>
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
      {/* ------------------ */}
      <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>EFFECTIFS PAR DEPARTEMENT </Title>
          <div className="w-full">
            <DataTable
              value={totalByDepartments}
              paginator
              rows={10}
              size="small"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="departement.nom"
              rowHover
              filterDisplay="menu"
              responsiveLayout="scroll"
              globalFilterFields={["departement.nom"]}
              emptyMessage="Aucun Session trouvé"
              currentPageReportTemplate="Voir {first} de {last} à {totalRecords}"
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
                body={actionEffDepTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
      {/* ------------------ */}
    
       <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>EFFECTIFS PAR FORMATION </Title>
          <div className="w-full">
            <DataTable
              value={effectifFormations}
              paginator
              rows={10}
              size="small"
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              rowsPerPageOptions={[10, 25, 50]}
              dataKey="formation.nom"
              rowHover
              filterDisplay="menu"
              responsiveLayout="scroll"
              globalFilterFields={["formatiom.nom"]}
              emptyMessage="Aucun Session trouvé"
              currentPageReportTemplate="Voir {first} de {last} à {totalRecords}"
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
                body={actionEffForTemplate}
              />
            </DataTable>
          </div>
        </div>
      </div>
      <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>QUOTAS SOCIALES HOMMES</Title>
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
                <td>{calculs.absoluSocGarcon}</td>
                <td>{selectionHomme}</td>
                <td>{restantHomme}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="p-5 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Title order={4}>QUOTAS SOCIALES FEMMES</Title>
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
                <td>{calculs.absoluSocFille}</td>
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
            <Title order={4}>LISTE DES SELECTIONNES SOCIALES </Title>{" "}
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
      {ts && (
        <div className="hidden print:block">
          <SocialePrint selectionnes={ts} ref={componentRef} />{" "}
        </div>
      )}
      <ConfirmPopup />
    </>
  );
}

export default Session;
