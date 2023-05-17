import { create } from 'zustand'

export const useSessionStore = create((set) => ({
  pavillons: [],
  calculs: {},
  effectifFormations: [],
  session: "",
  setSession: (id) => set({session: id}),
  inscrits: [],
  setInscrits: (list) => set({inscrits: list}),
  setTotalByDepartments:(list) => set({totalByDepartments: list}),
  setPavillons: (list) => set({pavillons: list}),
  setCalculs: (c) => set({calculs: c}),
  setEffectifFormations: (c) => set({effectifFormations: c})
}));