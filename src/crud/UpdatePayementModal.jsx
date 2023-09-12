import { Dialog } from "primereact/dialog";
import { create } from "react-modal-promise";
import { useQuery } from "react-query";
import { getPayementByDossier } from "../services/payementservice";
import { List, LoadingOverlay, Switch, ThemeIcon } from "@mantine/core";
import { FaCheck, FaRegCircle } from "react-icons/fa";


function UpdatePayementModal({ dossier,isOpen, onReject}) {

    const qk = ["get_Payements", dossier];
  const { data: Payements, isLoading } = useQuery(qk, () => getPayementByDossier(dossier));

  return (
    <>
    <LoadingOverlay
        visible={isLoading}
        overlayBlur={2}
      />
     <Dialog
        header="GESTION DES PAIEMENTS MENSUELS DE LOGEMENT"
        visible={isOpen}
        onHide={() => onReject(false)}
        className="w-1/2"
      >
        <List
      spacing="xs"
      size="lg"
      center
      icon={
        <ThemeIcon color="red" size={24} radius="xl">
          <FaRegCircle size="1rem" />
        </ThemeIcon>
      }
    >
      <List.Item><Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="JANVIER"
                      checked={Payements?.janvier}
                    /></List.Item>
      <List.Item>
      <Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="FEVRIER"
                      checked={Payements?.fevrier}
                    />
      </List.Item>
      <List.Item><Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="MARS"
                      checked={Payements?.mars}
                    /></List.Item>
      <List.Item>
      <Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="AVRIL"
                      checked={Payements?.avril}
                    />
      </List.Item>
      <List.Item>
      <Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="MAI"
                      checked={Payements?.mai}
                    />
      </List.Item>
      <List.Item>
      <Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="JUIN"
                      checked={Payements?.juin}
                    />
      </List.Item>
      <List.Item>
      <Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="JUILLET"
                      checked={Payements?.juillet}
                    />
      </List.Item>
      <List.Item><Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="AOUT"
                      checked={Payements?.aout}
                    /></List.Item>
      <List.Item>
      <Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="SEPTEMBRE"
                      checked={Payements?.septembre}
                    />
      </List.Item>
      <List.Item>
      <Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="OCTOBRE"
                      checked={Payements?.octobre}
                    />
      </List.Item>
      <List.Item>
      <Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="NOVEMBRE"
                      checked={Payements?.novembre}
                    />
      </List.Item>
      <List.Item
        icon={ Payements?.decembre ? 
          <ThemeIcon color="green" size={24} radius="xl">
            <FaCheck size="1rem" />
          </ThemeIcon> : 
          <ThemeIcon color="red" size={24} radius="xl">
          <FaRegCircle size="1rem" />
        </ThemeIcon>
        }
      >
        <Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="DECEMBRE"
                      checked={Payements?.decembre}
                    />
      </List.Item>
    </List>
      </Dialog>
    </>
  )
}

export default create(UpdatePayementModal)