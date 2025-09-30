import axios from "axios";
import {data} from "react-router-dom";
import {array} from "yup";


const client = axios.create({
    baseURL: 'http://localhost:8001/product/',
    withCredentials: true
})

function getCookie(name: string) {
    const value = `;${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length == 2) return parts.pop()!.split(';').shift()
}


client.interceptors.request.use(config => {
    const csrfToken = getCookie('csrftoken')
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken
    }
    return config
})


export async function getProducts() {

    const {data} = await client.get('list')
    console.log('data', data);


    return data
}

export async function getProduct(id: string | number) {
    const {data} = await client(`/${id}`)
    return data
}


export async function searchServiece(type: string, productname: string) {

    const {data} = await client.get(`search/?type=${type}&name=${productname}`)
    return data
}


const register = axios.create({
    baseURL: 'http://localhost:8000/accounts/',
    withCredentials: true

})


register.interceptors.request.use(config => {
    const csrfToken = getCookie('csrftoken')
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken
    }
    return config
})


export async function send_phonenumber(phonenumber: string) {
    console.log('Test works!');
    const response: any = await register.post('otp', {

        'phone_number': phonenumber,


    })
    return response.data

}

export async function getCSRFToken() {
    const response = await register.get('csrf')
    return response

}


export async function registerlogin({...data}) {

    await getCSRFToken()
    console.log('data is', data.phone_number);
    const response: any = await register.post('register', {


        'phone_number': data.phone_number,
        'password': data.password,
        'password2': data.confirm_password,
        'otp_code': data.otp_code


    })
    return response.data

}


export async function login({...data}) {
    const response = await register.post('login', {

        'phone_number': data.phone_number,
        'password': data.password,
    })
    return response.data
}


export async function checklogin() {


    const user = await register.get('checklogin')

    return user.data

}

export async function getAddresses() {
    const addresses = await register.get('addresses')
    return addresses.data
}

export async function selectedAddress(pk: number) {
    const addresses = await register.get(`selectedaddress/${pk}`)
    return addresses.data
}

export async function saveAddress({...data}) {
    const response = await register.post('addresses', {
        'address' : data.address,
        'receiver_phone' : data.receiver_phone,
        'province' : data.province,
        'city' : data.city,
        'plaque' : data.plaque,
        'postcode' : data.postcode,
        'unit' : data.unit
    })
    return response.data
}

export async function deleteAddress(id:number){
    const response = await register.delete(`address/delete/${id}`)
    return response.data

}

export async function logoutApi(){

    const response = await register.get('logout')
    return response.data

}


const order = axios.create({
    baseURL: 'http://localhost:8001/order/',
    withCredentials: true

})

export async function sendOrder(cart, address) {

    const response = await order.post('http://localhost:8001/order/add',{
        "address" : address,
        "cart" : cart

    })
    return response.data
}