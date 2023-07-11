import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import Main from './Component/Main.jsx'
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import axios from 'axios'
axios.defaults.baseURL=`          https://todo-server-kazifahmid.vercel.app/`
axios.interceptors.request.use((req)=>{return req})
axios.interceptors.response.use((res)=>{return res.data})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<QueryClientProvider client={queryClient}>
<Main/>
</QueryClientProvider>
  </React.StrictMode>,
)
