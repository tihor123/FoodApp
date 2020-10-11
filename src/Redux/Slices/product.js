import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        id: 1,
        name: "Guad de la Costa",
        description: "tortillas de mais, fruit de la passion, mango",
        price: 7,
        count: 0
    },
    {
        id: 2,
        name: "Chicharron y Cerveza",
        description: "citron vert/ corona sauce",
        price: 7,
        count: 0
    },
    {
        id: 3,
        name: "Chilitos con Card",
        description: "padrones tempura, ganbus",
        price: 7,
        count: 0
    }
]

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        incrementCount(state, action){
            console.log(action.payload, ...state)
            let index = state.findIndex(x=>x.id==action.payload.id);
            console.log(index)
            state[index].count += 1
        },
        decrementCount(state, action){
            console.log(action.payload, ...state)
            let index = state.findIndex(x=>x.id==action.payload.id);
            console.log(index)
            state[index].count -= 1
        }
    }
})

export const { incrementCount, decrementCount } = productSlice.actions;

export default productSlice.reducer;