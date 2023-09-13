import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useSessionStore = create(
  persist(
    (set) => ({
      pavillons: [],
      calculs: {},
      effectifFormations: [],
      session: null,
      setSession: (id) => set({session: id}),
      sessionCodif: null,
      setSessionCodif: (id) => set({sessionCodif: id}),
      inscrits: [],
      setInscrits: (list) => set({inscrits: list}),
      setTotalByDepartments:(list) => set({totalByDepartments: list}),
      setPavillons: (list) => set({pavillons: list}),
      setCalculs: (c) => set({calculs: c}),
      setEffectifFormations: (c) => set({effectifFormations: c})
    }),
    {
      name: 'codif-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

