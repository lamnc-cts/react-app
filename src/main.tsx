import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ROUTE from '@/constant/route.ts'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE.HOME} element={<App />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
)
