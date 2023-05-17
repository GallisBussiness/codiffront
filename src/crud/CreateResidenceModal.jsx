import { Dialog } from "primereact/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { create } from "react-modal-promise";
import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { useState } from "react";
import { getSessions } from "../services/sessionservice";
import { useQuery } from "react-query";

const schema = yup
  .object({
    nom: yup.string().required(),
    session: yup.string().required(),
  })
  .required();

function CreateResidenceModal({ isOpen, onResolve, onReject }) {
  const [sessions, setSessions] = useState([]);
  const defaultValues = {
    nom: "",
    session: "",
  };
  const qks = ["get_Sessions"];

  const { isLoading } = useQuery(qks, () => getSessions(), {
    onSuccess: (_) => {
      const u = _.map((c) => ({
        value: c._id,
        label: c.annee,
      }));
      setSessions(u);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onCreate = (data) => {
    onResolve(data);
  };

  return (
    <>
      <Dialog
        header="Créer une Résidence"
        visible={isOpen}
        onHide={() => onReject(false)}
        className="w-1/2"
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <form onSubmit={handleSubmit(onCreate)} method="POST">
          <div className="flex flex-col space-y-2 w-full ">
            <div>
              <Controller
                control={control}
                name="nom"
                render={({ field }) => (
                  <TextInput
                    label="Nom de la résidence"
                    error={errors.nom && errors.nom.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                control={control}
                name="session"
                render={({ field }) => (
                  <Select
                    label="Session"
                    placeholder="Selectionnez la session ..."
                    searchable
                    clearable
                    nothingFound="Pas de session disponibles"
                    data={sessions}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.session && errors.session.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                CREER LA RESIDENCE
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default create(CreateResidenceModal);
