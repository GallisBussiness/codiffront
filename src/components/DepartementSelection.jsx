import React, { useRef, useState } from "react";
import { DepartementPrint } from "./DepartementPrint";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import ReactToPrint from "react-to-print";
import { Button, Title } from "@mantine/core";
import { FaPrint } from "react-icons/fa";
import { getSelectionneByDepartement } from "../services/selectionneService";

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

function DepartementSelection() {
  const { session, departement } = useParams();
  const [selectionne, setSelectionne] = useState([]);
  const componentRef = useRef();
  const qc = useQueryClient();
  const { state } = useLocation();
  const key = ["get_selected_departement", departement];
  const { data } = useQuery(
    key,
    () => getSelectionneByDepartement(departement),
    {
      onSuccess: (_) => {
        const sorted = _.sort((a, b) =>
          a.inscription.formation.nom > b.inscription.formation.nom
            ? 1
            : a.inscription.formation.nom < b.inscription.formation.nom
            ? -1
            : 0
        );
        const grouped = groupBy(
          sorted,
          (item) => item.inscription.formation.nom
        );
        setSelectionne([...grouped]);
      },
    }
  );

  return (
    <div>
      <div className="flex flex-col justify-between mx-10 my-5">
        <Title order={4}>
          LISTE DES SELECTIONNES DU DEPARTEMENT :{" "}
          {state?.data?.departement?.nom}
        </Title>{" "}
        <ReactToPrint
          trigger={() => (
            <Button className="bg-sky-500">
              IMPRIMER <FaPrint size={20} />
            </Button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div className="mx-5">
        <DepartementPrint
          ref={componentRef}
          selectionnes={selectionne}
          departement={state?.data?.departement?.nom}
        />
      </div>
    </div>
  );
}

export default DepartementSelection;
