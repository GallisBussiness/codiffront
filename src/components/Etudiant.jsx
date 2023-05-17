import {
  createStyles,
  Avatar,
  Text,
  Group,
  LoadingOverlay,
} from "@mantine/core";
import { FaPhone, FaUserGraduate, FaVoicemail } from "react-icons/fa";
import { getEtudiantById } from "../services/etudiantApi";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

function Etudiant() {
  const { id } = useParams();
  const key = ["get_Etudiant", id];
  const { data: etudiant, isLoading } = useQuery(key, () =>
    getEtudiantById(id)
  );
  const { classes } = useStyles();

  return (
    <div className="px-5 py-10 bg-slate-50 w-full">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Group noWrap>
        {etudiant?.avatar && (
          <Avatar
            src={`${import.meta.env.VITE_ETUDIANT_SERVICE}/${etudiant?.avatar}`}
            size={94}
            radius="xl"
          />
        )}
        <div>
          <Text
            size="lg"
            sx={{ textTransform: "uppercase" }}
            weight={700}
            className={classes.name}
          >
            {etudiant?.prenom}
          </Text>

          <Text size="lg" weight={500} className={classes.name}>
            {etudiant?.nom}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <FaVoicemail stroke={1.5} size={16} className={classes.name} />
            <Text size="md">{etudiant?.email}</Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <FaPhone size={16} className={classes.name} />
            <Text size="md">{etudiant?.telephone}</Text>
          </Group>
          <Group noWrap spacing={10} mt={5}>
            <FaUserGraduate size={16} className={classes.name} />
            <Text size="md">{etudiant?.formation.nom}</Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}

export default Etudiant;
