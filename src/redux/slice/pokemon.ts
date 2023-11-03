import { createSlice } from '@reduxjs/toolkit'

export enum Status {
  SUCCESS = 'success',
  ERROR = 'error'
}
export interface IPokemon {
  status: Status | null
  data: any
}

const initialState: IPokemon = {
  status: null,
  data: []
}

export const counterSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {}
})

// Action creators are generated for each case reducer function
//export const { getPokemon } = counterSlice.actions

export default counterSlice.reducer

export const selectAllPokemonState = (initialState: any) => initialState
