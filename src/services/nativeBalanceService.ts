import axios from 'axios' 

const api_get_token_url = "http://localhost:3000/api/v1/wallet/get-balance/"

export function getBalance(address_wallet: string){ 
    const options = { 
        method: 'GET', 
        url: api_get_token_url + address_wallet, 
    }; 
    
    return axios.request(options)
        .then(res => { return res.data; })
        .catch((err) => { return err; }) 
}