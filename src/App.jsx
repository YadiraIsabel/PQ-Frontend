import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProductsFormPage from './pages/ProductsFormPage'
import ProductsPage from './pages/ProductsPage'
import StoreFormPage from './pages/StoreFormPage'
import StorePage from './pages/StorePage'
import CountFormPage from './pages/CountFormPage'
import CountPage from './pages/CountPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'
import { AuthProvieder } from './context/AuthContext'
import { ProductsProvider } from './context/ProductsContext'
import { StoresProvider } from './context/StoresContext'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import { CountsProvider } from './context/CountsContext'

function App() {
  return (
    <AuthProvieder>
      <CountsProvider>
        <StoresProvider>
          <ProductsProvider>
            <BrowserRouter>
              <main className='container mx-auto px-10'>
                <Navbar />
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/login' element={<LoginPage />} />
                  <Route path='/register' element={<RegisterPage />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/:store/products' element={<ProductsPage />} />
                    <Route path='/:store/add-product' element={<ProductsFormPage />} />
                    <Route path='/:store/products/:id' element={<ProductsFormPage />} />
                    <Route path='/stores' element={<StorePage />} />
                    <Route path='/add-store' element={<StoreFormPage />} />
                    <Route path='/counts/:id' element={<CountFormPage />} />
                    <Route path='/counts' element={<CountPage />} />
                    <Route path='/add-Count' element={<CountFormPage />} />
                    <Route path='/counts/:id' element={<CountFormPage />} />
                  </Route>
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </main>
            </BrowserRouter>
          </ProductsProvider>
        </StoresProvider>
      </CountsProvider>
    </AuthProvieder>
  )
}

export default App