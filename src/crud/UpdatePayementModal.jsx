import { Dialog } from "primereact/dialog";
import { create } from "react-modal-promise";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { getPayementByDossier, updatePayement } from "../services/payementservice";
import { List, LoadingOverlay, Switch, ThemeIcon } from "@mantine/core";
import { FaCheck, FaRegCircle } from "react-icons/fa";
import { notifications } from "@mantine/notifications";


function UpdatePayementModal({ dossier,isOpen, onReject}) {
    const qc = useQueryClient();
    const qk = ["get_Payements", dossier];
  const { data: Payements, isLoading } = useQuery(qk, () => getPayementByDossier(dossier));
  const { mutate: update, isLoading: loadingU } = useMutation(
    (data) => updatePayement(Payements?._id, data),
    {
      onSuccess: (_) => {
        notifications.show({
          title: "PAIEMENT UPDATE",
          message: "Mise a jour paiement reussi !!",
          color:"green",
        });
        qc.invalidateQueries(qk);
      },
      onError: (_) => {
        notifications.show({
          title: "PAIEMENT UPDATE",
          message: "Mise a jour paiement echoue !!",
          color:"red",
        });
      },
    }
  );

  const toggleUpdate = (e,property) => {
    confirmPopup({
      target: e.currentTarget,
      message: "Etes-vous sure de vouloir modifier ?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel:"OUI",
      accept: () => {
      const data = {[property]: !e.target.checked}
      update(data);
      },
      reject: () => console.log("annule"),
    });
  };

  return (
    <>
    <LoadingOverlay
        visible={isLoading || loadingU}
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
      <List.Item
      icon={ Payements?.janvier ? 
        <ThemeIcon color="green" size={24} radius="xl">
          <FaCheck size="1rem" />
        </ThemeIcon> : 
        <ThemeIcon color="red" size={24} radius="xl">
        <FaRegCircle size="1rem" />
      </ThemeIcon>
      }
      ><Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="JANVIER"
                      checked={Payements?.janvier}
                      onChange={(e) => toggleUpdate(e,"janvier")}
                    /></List.Item>
      <List.Item
      icon={ Payements?.fevrier ? 
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
                      label="FEVRIER"
                      checked={Payements?.fevrier}
                      onChange={(e) => toggleUpdate(e,"fevrier")}
                    />
      </List.Item>
      <List.Item
      icon={ Payements?.mars ? 
        <ThemeIcon color="green" size={24} radius="xl">
          <FaCheck size="1rem" />
        </ThemeIcon> : 
        <ThemeIcon color="red" size={24} radius="xl">
        <FaRegCircle size="1rem" />
      </ThemeIcon>
      }
      ><Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="MARS"
                      checked={Payements?.mars}
                      onChange={(e) => toggleUpdate(e,"mars")}
                    /></List.Item>
      <List.Item
      icon={ Payements?.avril ? 
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
                      label="AVRIL"
                      onChange={(e) => toggleUpdate(e,"avril")}
                      checked={Payements?.avril}
                    />
      </List.Item>
      <List.Item
      icon={ Payements?.mai ? 
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
                      label="MAI"
                      checked={Payements?.mai}
                      onChange={(e) => toggleUpdate(e,"mai")}
                    />
      </List.Item>
      <List.Item
      icon={ Payements?.juin ? 
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
                      label="JUIN"
                      checked={Payements?.juin}
                      onChange={(e) => toggleUpdate(e,"juin")}
                    />
      </List.Item>
      <List.Item
      icon={ Payements?.juillet ? 
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
                      label="JUILLET"
                      checked={Payements?.juillet}
                      onChange={(e) => toggleUpdate(e,"juillet")}
                    />
      </List.Item>
      <List.Item
      icon={ Payements?.aout ? 
        <ThemeIcon color="green" size={24} radius="xl">
          <FaCheck size="1rem" />
        </ThemeIcon> : 
        <ThemeIcon color="red" size={24} radius="xl">
        <FaRegCircle size="1rem" />
      </ThemeIcon>
      }
      ><Switch
                      size="lg"
                      onLabel="PAYE" offLabel="IMPAYE"
                      label="AOUT"
                      checked={Payements?.aout}
                      onChange={(e) => toggleUpdate(e,"aout")}
                    /></List.Item>
      <List.Item
      icon={ Payements?.septembre ? 
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
                      label="SEPTEMBRE"
                      checked={Payements?.septembre}
                      onChange={(e) => toggleUpdate(e,"septembre")}
                    />
      </List.Item>
      <List.Item
      icon={ Payements?.octobre ? 
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
                      label="OCTOBRE"
                      checked={Payements?.octobre}
                      onChange={(e) => toggleUpdate(e,"octobre")}
                    />
      </List.Item>
      <List.Item
      icon={ Payements?.novembre ? 
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
                      label="NOVEMBRE"
                      checked={Payements?.novembre}
                      onChange={(e) => toggleUpdate(e,"novembre")}
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
                      onChange={(e) => toggleUpdate(e,"decembre")}
                    />
      </List.Item>
    </List>
    <ConfirmPopup />
      </Dialog>
    </>
  )
}

export default create(UpdatePayementModal)