import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetchPokemon',
  // if you type your function argument here
  async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    return await response.json()
  }
)

export const counterSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPokemon.pending, (state) => {
      state.status = Status.ERROR
    })
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = Status.SUCCESS
    })
  }
})

// Action creators are generated for each case reducer function
//export const { getPokemon } = counterSlice.actions

export default counterSlice.reducer

export const selectAllPokemonState = (initialState: any) => initialState
