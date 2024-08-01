import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import App from "./App.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'


const router = createBrowserRouter([
    {path: "*", Component: App},
]);

const client = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NextUIProvider>
            <NextThemesProvider>
                <QueryClientProvider client={client}>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </NextThemesProvider>
        </NextUIProvider>
    </React.StrictMode>,
)
