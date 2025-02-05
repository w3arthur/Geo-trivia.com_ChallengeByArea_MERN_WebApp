import axios from 'axios';
import Logging from '../Classes/Logging.class';
import {server} from '../Config';

const axiosFunction = axios.create({
    baseURL: server.axiosBaseUrl    //'http://localhost:3500'
    , headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Credentials':true}
    //, withCredentials: true
    //, timeout: 1000
});

export const userRegisterApi = (user) => Axios('POST', '/api/login/register', user, {});
export const loginApi = (user) => Axios('POST', '/api/login', user, {});
export const tokenRenewApi = () => Axios('PATCH', '/api/login', {}, {});    //require cookie
export const tokenDestroyApi = () => Axios('DELETE', '/api/login', {}, {});    //require cookie

const loggingLog = (log) => axiosLogging ('title?', '/api/log/logging', log);
const errorLog = (log) => axiosLogging ('title?', '/api/log/error', log);

export default async function Axios(method, additionUrl, data, additionHeader){
    try{
        let response = await axiosFunction({
            method: method
            , url: additionUrl
            , data: JSON.stringify(data)
            , headers: additionHeader
        });
        console.log(response);
        try{}
        catch(e){ console.log(':: axios log logging fail');  }
        loggingLog( new Logging({}, data, response ).SentDetails(method, additionUrl, additionHeader) );

        console.log(':: axios success');
        return response.data;
    }catch(error){
        console.log(':: axios error');
        // console.log('data', error.response?.data);  //{result: 'user already exist!'}
        // console.log('status', error.response?.status);  //status 452
        // console.log('headers', error.response?.headers);  //{content-length: '32', content-type: 'application/json; charset=utf-8'}
        if(!error.response?.data) throw (()=>'no server connection')() ;
        errorLog( new Logging({}, data, error ).SentDetails(method, additionUrl, additionHeader) );
        throw error.response?.data;
    }
}

async function axiosLogging (title, additionUrl, data) {
    try{ 
        await axiosFunction({ method: 'post' , url: additionUrl , data: JSON.stringify(data) });
        console.log(':: axios logging :: ' + title);
    }catch(e){ }
}



  