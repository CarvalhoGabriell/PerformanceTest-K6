import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

export const options = {
    stages :[
        {duration: '5s', target: 5},
        {duration: '5s', target: 0}
        // {duration: '2s', target: 50},
        // {duration: '2s', target: 50},
        // {duration: '5s', target: 0}
    ],

    thresholds: {
        http_req_failed: ['rate < 0.01']
    },
}

const fileCSV = new SharedArray('Ler dados CSV', function(){
    return  papaparse.parse(open('../Docs/usuarios.csv'), {header: true}).data;
});


export default function() {
    const BASE_URL = 'https://test-api.k6.io'
    const USER = fileCSV[Math.floor(Math.random() * fileCSV.length)].username
    const PASS = '123456k6'
    
    let resp;
    resp = http.post(`${BASE_URL}/auth/token/login/`, 
        {
            headers: { 'Content-Type': 'application/json' },
            username: USER,
            password: PASS
        }
        
    );
    console.log("Token JWT logado do user: "+resp.body)
    check(resp, {
        'Login sucess 200': (s) => s.status === 200,
        'Generate JWT Token': (t) => t.json('acess') !== ''
    });

    sleep(1)

}

