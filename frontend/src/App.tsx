import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Store from "./pages/store/Store.tsx";
import {Layout} from "./component/layout/Layout.tsx";
import Product from "./pages/product/Product.tsx";
import {Cart} from "./pages/cart/Cart.tsx";
import Hello from './pages/tamrin/tamrin.tsx'
import {ShoppingCartProvider} from "./context/ShoppingCartContext.tsx";
import {Register} from './pages/sign up/Register.tsx';
import {Otp} from './pages/sign up/Otp.tsx';
import AuthProvider from './context/AuthContext.tsx';
import Search from './pages/search/Search.tsx'
import Profile from './pages/profile/Profile.tsx';
import Login from './pages/sign up/Login.tsx';
import UserInformation from "./component/profile/UserInformation.tsx";
import SavedProductProvider from "./context/SavedProductContext.tsx";
import SavedProducts from "./component/profile/SavedProducts.tsx";
import Order from "./pages/order/Order.tsx";
import Addresses from "./component/profile/Addresses.tsx";
import IsAuthenticated from "./component/authenticated/Authenticated.tsx";
import Pay from "./pages/pay/Pay.tsx";


function App() {

    return (
        <>

            <AuthProvider>
                <SavedProductProvider>
                    <ShoppingCartProvider>
                        <Layout>
                            <Routes>
                                <Route path='/' element={<Home/>}/>
                                <Route path='/store' element={<Store/>}/>
                                <Route path='/product/:id' element={<Product/>}/>
                                <Route path='/cart' element={<Cart/>}/>
                                <Route path='/tamrin' element={<Hello/>}/>
                                <Route path='/register' element={<Register/>}/>
                                <Route path='/otp' element={<Otp/>}/>
                                <Route path='/search' element={<Search/>}/>
                                <Route element={<IsAuthenticated/>}>
                                    <Route path='/profile' element={<Profile/>}>
                                        <Route index element={<UserInformation/>}/>
                                        <Route path="saved" element={<SavedProducts/>}/>
                                        <Route path="addresses" element={<Addresses/>}/>
                                    </Route>
                                </Route>
                                <Route path='/login' element={<Login/>}/>
                                <Route element={<IsAuthenticated/>}>
                                    <Route path='/order' element={<Order/>}/>
                                    <Route path='/pay' element={<Pay/>} />
                                </Route>


                            </Routes>
                        </Layout>
                    </ShoppingCartProvider>
                </SavedProductProvider>
            </AuthProvider>
        </>
    )
}

export default App
