import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppState } from '../store'

type CountState = {
  value: number
}

const initialState: CountState = {
  value: 0,
}

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = countSlice.actions

export const selectCount = (state: AppState) => state.count.value

export const countReducer = countSlice.reducer
