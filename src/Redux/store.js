import { configureStore } from '@reduxjs/toolkit'

import productReducer from './Slices/product'

export default configureStore({
    reducer:{
        products: productReducer
    }
})