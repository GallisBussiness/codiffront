import { Dialog } from "primereact/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { create } from "react-modal-promise";
import {
  Button,
  LoadingOverlay,
  NumberInput,
  Select,
  Switch,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useQuery } from "react-query";
import { getPedagoqueSession } from "../services/etudiantApi";

const schema = yup
  .object({
    annee: yup.string().required(),
    pedagogique: yup.number().required(),
    etat: yup.boolean().required(),
    sociale: yup.number().required(),
    amicale: yup.number().required(),
    licence1: yup.number().required(),
    licence2: yup.number().required(),
    licence3: yup.number().required(),
    master1: yup.number().required(),
    master2: yup.number().required(),
    autre: yup.number().required(),
    depot: yup.number().required(),
    interne: yup.number().required(),
    etranger: yup.number().required(),
    pedagogique_session: yup.string().required(),
  })
  .required();

const CreateSessionModal = ({ isOpen, onResolve, onReject }) => {
  const [pedagiqueSessions, setPedagogiqueSessions] = useState([]);
  const defaultValues = {
    annee: "",
    pedagogique: 0,
    etat: false,
    sociale: 0,
    amicale: 0,
    licence1: 0,
    licence2: 0,
    licence3: 0,
    master1: 0,
    master2: 0,
    autre: 0,
    depot: 0,
    interne: 0,
    etranger: 0,
    pedagogique_session: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const kk = ["getPedagogiqueSession"];
  const { isLooading } = useQuery(kk, () => getPedagoqueSession(), {
    onSuccess: (_) => {
      const ps = _.map((s) => ({ label: s.nom, value: s._id }));
      setPedagogiqueSessions(ps);
    },
  });

  const onCreate = (data) => {
    onResolve(data);
  };

  return (
    <>
      <Dialog
        header="Créer une Séssion"
        visible={isOpen}
        onHide={() => onReject(false)}
        className="w-8/12"
      >
        <LoadingOverlay visible={isLooading} overlayBlur={2} />
        <form onSubmit={handleSubmit(onCreate)} method="POST">
          <div className="mb-3">
            <Controller
              control={control}
              name="pedagogique_session"
              render={({ field }) => (
                <Select
                  label="Session Pédagogique"
                  placeholder="Selectionnez la session pédagogique ..."
                  searchable
                  clearable
                  nothingFound="Pas de session disponibles"
                  data={pedagiqueSessions}
                  value={field.value}
                  onChange={field.onChange}
                  error={
                    errors.pedagogique_session &&
                    errors.pedagogique_session.message
                  }
                />
              )}
            />
          </div>
          <div>
                <Controller
                  control={control}
                  name="annee"
                  render={({ field }) => (
                    <TextInput
                      label="Annee de la session"
                      error={errors.annee && errors.annee.message}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
          <div className="flex space-x-2 my-2">
            <div className="flex flex-col space-y-2 w-full ">
              
              <div>
                <Controller
                  control={control}
                  name="pedagogique"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Pedagogique"
                      error={errors.pedagogique && errors.pedagogique.message}
                      placeholder="pédagogique"
                    />
                  )}
                />
              </div>

              <div>
                <Controller
                  control={control}
                  name="sociale"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Sociale"
                      error={errors.sociale && errors.sociale.message}
                      placeholder="sociale"
                    />
                  )}
                />
              </div>
              
              <div>
                <Controller
                  control={control}
                  name="licence1"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Licence 1"
                      error={errors.licence1 && errors.licence1.message}
                      placeholder="licence 1"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="licence2"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Licence 2"
                      error={errors.licence2 && errors.licence2.message}
                      placeholder="licence 2"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="licence3"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Licence 3"
                      error={errors.licence3 && errors.licence3.message}
                      placeholder="licence 3"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="master1"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Master 1"
                      error={errors.master1 && errors.master1.message}
                      placeholder="master 1"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="master2"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Master 2"
                      error={errors.master2 && errors.master2.message}
                      placeholder="master 2"
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 w-full">
             
              <div>
                <Controller
                  control={control}
                  name="amicale"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Inter-Amicale"
                      error={errors.amicale && errors.amicale.message}
                      placeholder="inter-amicale"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="autre"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Autre"
                      error={errors.autre && errors.autre.message}
                      placeholder="autre"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="depot"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Depot"
                      error={errors.depot && errors.depot.message}
                      placeholder="depot"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="interne"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Interne"
                      error={errors.interne && errors.interne.message}
                      placeholder="interne"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="etranger"
                  render={({ field }) => (
                    <NumberInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Etranger"
                      error={errors.etranger && errors.etranger.message}
                      placeholder="etranger"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col items-center justify-center py-8">
                <Controller
                  control={control}
                  name="etat"
                  render={({ field }) => (
                    <Switch
                      size="lg"
                      onLabel="ACTIVE" offLabel="INACTIVE"
                      label="Etat de la session"
                      checked={field.value}
                      onChange={(event) =>
                        field.onChange(event.currentTarget.checked)
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                CREER LA SESSION
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default create(CreateSessionModal);
