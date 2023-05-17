import { Dialog } from "primereact/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { create } from "react-modal-promise";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
const schema = yup
  .object({
    nom: yup.string().required(),
    type: yup.string().required(),
    nb_lit: yup.number().required(),
  })
  .required();

function UpdatePavillonModal({ isOpen, onResolve, onReject, pavillon }) {
  const defaultValues = {
    _id: pavillon?._id,
    nom: pavillon?.nom,
    type: pavillon?.type,
    nb_lit: pavillon?.nb_lit,
  };
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
        header="Modifier un Pavillon"
        visible={isOpen}
        onHide={() => onReject(false)}
        className="w-1/2"
      >
        <form onSubmit={handleSubmit(onCreate)} method="POST">
          <div className="flex flex-col space-y-2 w-full ">
            <div>
              <Controller
                control={control}
                name="nom"
                render={({ field }) => (
                  <TextInput
                    label="Nom du pavillon"
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
                name="type"
                render={({ field }) => (
                  <Select
                    label="Type de pavillon"
                    placeholder="Selectionnez le type ..."
                    searchable
                    clearable
                    nothingFound="Pas de types disponibles"
                    data={["HOMME", "FEMME"]}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.type && errors.type.message}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="nb_lit"
                render={({ field }) => (
                  <NumberInput
                    label="Nombre de lit"
                    error={errors.nb_lit && errors.nb_lit.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                MODIFIER LE PAVILLON
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default create(UpdatePavillonModal);
