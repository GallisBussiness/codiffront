import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDossierByInscription } from "../services/dossierservice";
import { Button } from "@mantine/core";

function Dossier() {
  const { ins } = useParams();
  const key = ["getDossier", ins];
  const { data: dossier, isLoading: loadingDossier } = useQuery(
    key,
    () => getDossierByInscription(ins),
    {
      onSuccess: (_) => {
        console.log(_);
      },
    }
  );
  return (
    <div className="w-full h-72">
      {dossier ? (
        <></>
      ) : (
        <div className="w-11/12 my-10 mx-auto h-full flex items-center justify-center">
          <Button className="bg-cyan-800">CREER FICHE DU RESIDENT</Button>
        </div>
      )}
    </div>
  );
}

export default Dossier;
