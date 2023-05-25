import { Dialog } from "primereact/dialog";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { create } from "react-modal-promise";
import { Button, NumberInput, Select } from "@mantine/core";

const schema = yup
  .object({
    session: yup.string().required(),
    inscription: yup.string().required(),
   cite_sommierOuLit:yup.number().required(),
   cite_matelas90: yup.number().required(),
   cite_draps: yup.number().required(),
   cite_couverture: yup.number().required(),
   cite_rideau_fenetre: yup.number().required(),
   cite_tableDeTravail: yup.number().required(),
   cite_chaises: yup.number().required(),
   cite_etagere: yup.number().required(),
   cite_lampeDeChevet: yup.number().required(),
   cite_seau: yup.number().required(),
   cite_corbeilleAPapiers: yup.number().required(),
   cite_tableOreiller: yup.number().required(),
   cite_oreiller: yup.number().required(),
   resident_matelas: yup.number().required(),
   resident_drap: yup.number().required(),
   resident_couverture: yup.number().required()
  })
  .required();


function CreateFicheModal({ isOpen, onResolve, onReject}) {
    const defaultValues = {
        session: "",
        inscription: "",
        cite_sommierOuLit:0,
        cite_matelas90: 0,
        cite_draps: 0,
        cite_couverture: 0,
        cite_rideau_fenetre: 0,
        cite_tableDeTravail: 0,
        cite_chaises: 0,
        cite_etagere: 0,
        cite_lampeDeChevet: 0,
        cite_seau: 0,
        cite_corbeilleAPapiers: 0,
        cite_tableOreiller: 0,
        cite_oreiller: 0,
        resident_matelas: 0,
        resident_drap: 0,
        resident_couverture: 0
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
        header="Créer une Fiche"
        visible={isOpen}
        onHide={() => onReject(false)}
        className="w-1/2"
      >
        <form onSubmit={handleSubmit(onCreate)} method="POST">
          <div className="flex flex-col space-y-2 w-full ">
            <div className="px-2 py-3 flex items-center justify-center uppercase my-2 bg-sky-800 text-white">MOBILIER CITE </div>
            <div className="flex space-x-2 w-full">
              <div className="flex flex-col w-full">
                <div>
              <Controller
                control={control}
                name="cite_sommierOuLit"
                render={({ field }) => (
                  <NumberInput
                    label="Sommier de 90 ou lit en bois"
                    error={errors.cite_sommierOuLit && errors.cite_sommierOuLit.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_matelas90"
                render={({ field }) => (
                  <NumberInput
                    label="Matlas de 90"
                    error={errors.cite_matelas90 && errors.cite_matelas90.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_draps"
                render={({ field }) => (
                  <NumberInput
                    label="Draps"
                    error={errors.cite_draps && errors.cite_draps.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_couverture"
                render={({ field }) => (
                  <NumberInput
                    label="Couverture"
                    error={errors.cite_couverture && errors.cite_couverture.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_rideau_fenetre"
                render={({ field }) => (
                  <NumberInput
                    label="Rideau Fenetre"
                    error={errors.cite_rideau_fenetre && errors.cite_rideau_fenetre.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_tableDeTravail"
                render={({ field }) => (
                  <NumberInput
                    label="Table de Travail"
                    error={errors.cite_tableDeTravail && errors.cite_tableDeTravail.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_chaises"
                render={({ field }) => (
                  <NumberInput
                    label="Chaises"
                    error={errors.cite_chaises && errors.cite_chaises.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            
            
              </div>
              <div className="flex flex-col w-full">
              <div>
              <Controller
                control={control}
                name="cite_etagere"
                render={({ field }) => (
                  <NumberInput
                    label="Etagere"
                    error={errors.cite_etagere && errors.cite_etagere.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
              <div>
              <Controller
                control={control}
                name="cite_lampeDeChevet"
                render={({ field }) => (
                  <NumberInput
                    label="Lampe de Chevet"
                    error={errors.cite_lampeDeChevet && errors.cite_lampeDeChevet.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_seau"
                render={({ field }) => (
                  <NumberInput
                    label="Seau"
                    error={errors.cite_seau && errors.cite_seau.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_corbeilleAPapiers"
                render={({ field }) => (
                  <NumberInput
                    label="Corbeille a Papiers"
                    error={errors.cite_corbeilleAPapiers && errors.cite_corbeilleAPapiers.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_tableOreiller"
                render={({ field }) => (
                  <NumberInput
                    label="Table Oreiller"
                    error={errors.cite_tableOreiller && errors.cite_tableOreiller.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="cite_oreiller"
                render={({ field }) => (
                  <NumberInput
                    label="Oreiller"
                    error={errors.cite_oreiller && errors.cite_oreiller.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
    
              </div>
            </div>
            
            <div className="px-2 py-3 flex items-center justify-center uppercase my-2 bg-green-800 text-white">MOBILIER RESIDENT </div>
            <div className="flex flex-col">
            <div>
              <Controller
                control={control}
                name="resident_matelas"
                render={({ field }) => (
                  <NumberInput
                    label="Matelas"
                    error={errors.resident_matelas && errors.resident_matelas.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="resident_drap"
                render={({ field }) => (
                  <NumberInput
                    label="Drap"
                    error={errors.resident_drap && errors.resident_drap.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="resident_couverture"
                render={({ field }) => (
                  <NumberInput
                    label="Couverture"
                    error={errors.resident_couverture && errors.resident_couverture.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            </div>
            <div className="flex items-center justify-center">
              <Button type="submit" className="bg-green-900 hover:bg-green-900">
                CREER LA FICHE
              </Button>
            </div>
              
            </div>
        </form>
      </Dialog>
    </>
  )
}

export default create(CreateFicheModal)