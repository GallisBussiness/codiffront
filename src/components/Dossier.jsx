import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { createDossier, getDossierBySelectionne } from "../services/dossierservice";
import { Button, LoadingOverlay } from "@mantine/core";
import CreateFicheModal from "../crud/CreateFicheModal";
import ModalContainer from "react-modal-promise";
import { showNotification } from "@mantine/notifications";
import DossierTab from "./DossierTab";
import { useSessionStore } from "../store/session";
import { shallow } from "zustand/shallow";

function Dossier() {
  const { selectionne } = useParams();
   const  qc = useQueryClient();
  const {
    session
   } = useSessionStore(
     (state) => ({
       session:state.session
     }),
     shallow
   );
  const key = ["getDossier", selectionne];
  const { data: dossier, isLoading: loadingDossier } = useQuery(
    key,
    () => getDossierBySelectionne(selectionne)
  );

  const {mutate,isLoading:creatingDossier} = useMutation((data) => createDossier(data),{
    onSuccess:(_) => {
      showNotification({
        title: 'Creation dossier Réussi',
        message: 'Le Dossier a ete bien cree !!',
        color:'green',
      });
      qc.invalidateQueries(key)
    },
    onError:(err) => {
      showNotification({
        title: 'Creation dossier Echoue',
        message: 'Le Dossier echoue !!',
        color:'red',
      })
    }
  })

  const createFiche = () => {
    CreateFicheModal({session:session._id,
    selectionne}).then(mutate);
  }
  return (
    <div className="w-full h-72">
      <LoadingOverlay visible={creatingDossier || loadingDossier} overlayBlur={2} />
      {dossier ? (
        <><DossierTab dossier={dossier} /></>
      ) : (
        <div className="w-11/12 my-10 mx-auto h-full flex items-center justify-center">
          <Button className="bg-cyan-900" onClick={createFiche}>CREER FICHE DU RESIDENT</Button>
        </div>
      )}
      <ModalContainer />
    </div>
  );
}

export default Dossier;
