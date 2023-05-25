import Users from "./Users";
import { CreateUser } from "../crud/CreateUser";
import { UpdateUser } from "../crud/UpdateUser";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { getAuth } from "../services/authservice";
import { useQuery, useQueryClient } from "react-query";
import { FaHome, FaUser, FaUsers, FaWindows } from "react-icons/fa";
import Sessions from "./Sessions";
import Etudiants from "./Etudiants";
import Etudiant from "./Etudiant";
import Residences from "./Residences";
import Residence from "./Residence";
import Session from "./Session";
import P404 from "./P404";
import Inscrits from "./Inscrits";
import DepartementSelection from "./DepartementSelection";
import Residents from "./Residents";
import Dossier from "./Dossier";

function Dashboard() {
  const auth = useAuthUser()();
  const qk = ["auth", auth?.id];
  useQuery(qk, () => getAuth(auth?.id), {
    stateTime: 100_000,
    refetchOnWindowFocus: false,
  });
  const qc = useQueryClient();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const logout = () => {
    if (signOut()) {
      qc.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="bg-white opacity-90">
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-orange-700">
            <div className="flex-none">
              <button className="btn btn-ghost">
                <label
                  htmlFor="my-drawer-2"
                  className="btn bg-sky-600 drawer-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-5 h-5 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>{" "}
                </label>
              </button>
            </div>
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl mx-2 text-white">
                CODIFICATION
              </a>
            </div>
          </div>
          <Routes>
            <Route path="" element={<Users />} />
            <Route path="users" element={<Users />} />
            <Route path="etudiants" element={<Etudiants />} />
            <Route path="etudiants/:id" element={<Etudiant />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/update/:id" element={<UpdateUser />} />
            <Route path="residents/:session/:id" element={<Residents />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="sessions/:id" element={<Session />} />
            <Route path="sessions/:session/:formation" element={<Inscrits />} />
            <Route
              path="sessions/:session/print/:departement"
              element={<DepartementSelection />}
            />
            <Route path="residences" element={<Residences />} />
            <Route path="residences/:id" element={<Residence />} />
            <Route path="dossier/:ins" element={<Dossier />} />
            <Route path="*" element={<P404 />} />
          </Routes>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="bg-orange-700 w-80">
            <div className=" flex items-center justify-center">
              <div className="avatar">
                <div className="w-24 rounded">
                  <img src="/img/logo.png" />
                </div>
              </div>
            </div>

            <ul className="menu p-4 w-80  text-base-content flex flex-col  justify-between py-5">
              <Link
                to="/dashboard/users"
                className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
              >
                <FaUser className="inline text-green-600" /> UTILISATEURS
              </Link>
              <Link
                to="/dashboard/sessions"
                className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
              >
                <FaWindows className="inline text-green-600" /> SESSIONS DE
                CONDIFICATIONS
              </Link>
              <Link
                to="/dashboard/residences"
                className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
              >
                <FaHome className="inline text-green-600" /> RESIDENCES
              </Link>
              <Link
                to="/dashboard/etudiants"
                className="bg-white hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2"
              >
                <FaUsers className="inline text-green-600" /> ETUDIANTS
              </Link>
            </ul>
            <div className="ml-5">
              <Button
                onClick={logout}
                className="bg-blue-500 hover:bg-orange-400 hover:text-white rounded-md shadow-md text-center py-2 animate-pulse"
              >
                SE DECONNECTER
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
