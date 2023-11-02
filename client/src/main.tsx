import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
    BrowserRouter
} from 'react-router-dom'
import {
    ThemeProvider
} from './components/theme-provider.tsx'
import {
    Provider
} from 'react-redux'
import store from './Store.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Provider store={store} >
            <BrowserRouter>
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
)
