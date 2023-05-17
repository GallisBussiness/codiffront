import { Divider, Table, Text, Title } from "@mantine/core";
import { forwardRef } from "react";

export const SocialePrint = forwardRef(({ selectionnes }, ref) => {
  return (
    <div ref={ref} className="bg-white my-10">
      <div className="flex items-center justify-between py-2 mx-10 bg-white">
        <div className="flex flex-col items-center space-y-1">
          <div className="flex flex-col items-center">
            <Text fw="bold" size={12}>
              REPUBLIQUE DU SENEGAL
            </Text>
            <Text size={8}>------------------</Text>
          </div>
          <div className="flex flex-col items-center text-center">
            <Text size={12} fw="bold">
              MINISTERE DE L'ENSEIGNEMENT SUPPERIEUR DE LA RECHERCHE ET DE
              L'INNOVATION
            </Text>
            <Text size={8}>------------------</Text>
            <img
              src="/img/logo.png"
              alt="logo"
              className="h-16 w-16 object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col items-center text-center">
            <Text size={14} fw="bold">
              {" "}
              CENTRE REGIONAL DES OEUVRE UNIVERSITAIRES SOCIALES DE ZIGUINCHOR
            </Text>
            <Text size={14} fw="bold">
              COMMISSION DE CODIFICATION
            </Text>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-center py-2 bg-green-400">
        <Text
          size={20}
          fw="bold"
          className="font-roboto text-white text-center uppercase"
        >
          CODIFICATION SOCIALE
        </Text>
      </div>
      <Divider />
      <div className="mx-5 my-5">
        <Table striped withBorder withColumnBorders>
          <thead>
            <tr>
              <th>NCE</th>
              <th>CNI</th>
              <th>PRENOM</th>
              <th>NOM</th>
            </tr>
          </thead>
          <tbody>
            {selectionnes
              ?.sort((a, b) =>
                a.inscription.etudiant.sexe > b.inscription.etudiant.sexe
                  ? 1
                  : a.inscription.etudiant.sexe === b.inscription.etudiant.sexe
                  ? 0
                  : -1
              )
              ?.map((p) => (
                <tr
                  key={p._id}
                  style={{
                    backgroundColor:
                      p.inscription.etudiant.sexe === "H"
                        ? "#acf7fc"
                        : "#f7dc83",
                  }}
                >
                  <td>{p.inscription.etudiant.nce}</td>
                  <td>{p.inscription.etudiant.cni}</td>
                  <td>{p.inscription.etudiant.prenom}</td>
                  <td>{p.inscription.etudiant.nom}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
});
