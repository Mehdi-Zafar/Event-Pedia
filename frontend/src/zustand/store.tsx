import { create } from 'zustand'

interface User{
    username:string,
    email:string
}

export const useStore = create((set) => ({
  user: null,
  setUser: (user:User) => set(() => ({ user: user })),
}))