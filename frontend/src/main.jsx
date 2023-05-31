import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import store from '../src/app/store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx';
import UserProfilePage from './pages/UserProfilePage.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import SingleProductPage from './pages/SingleProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage.jsx';

// Styles [pages styles] modules
import './styles/pages-styles/cart-page.css'
import './styles/pages-styles/landing-page.css'
import './styles/pages-styles/not-found-page.css'
import './styles/pages-styles/sign-in-page.css'
import './styles/pages-styles/sign-up-page.css'
import './styles/pages-styles/single-product-page.css'
import './styles/pages-styles/user-profile-page.css'

// Styles [pages styles] modules
import './styles/components-styles/header.css'
import './styles/components-styles/product-card.css';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' Component={LandingPage} />
      <Route path='/register' Component={SignUpPage}/>
      <Route path='/login' Component={SignInPage} />
      <Route path='/products/:id' Component={SingleProductPage} />
      <Route path="/myCart" Component={CartPage} />
      <Route path='/checkout-success' Component={CheckoutSuccessPage} />
      {/* All private routes here */}
      <Route path='/' element={<PrivateRoutes />}>
        <Route path='/profile' Component={UserProfilePage} />
      </Route>
      <Route path='*' Component={NotFoundPage} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={  router  } />
      </React.StrictMode>
  </Provider>,
)
