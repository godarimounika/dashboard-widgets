import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import Widgetreducer from './Widgetreducer'



const store = configureStore({
    reducer:{
        widgets:Widgetreducer
    }
});










export default store