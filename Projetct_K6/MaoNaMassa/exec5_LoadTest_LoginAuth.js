import * as http from 'k6/http'
import { check, sleep } from 'k6'


export const options= {
    vus: 100,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(95) < 10.0'],
        http_req_failed: ['rate < 0.01']
    }
}

const BASE_URL = 'https://test-api.k6.io/'

export function setup() {
    let respLogin;
    respLogin = http.post(BASE_URL+'auth/token/login/', 
    { 
        username: '0.06015253723891286@mail.io',
        password: '123456k6'
    });   
    let token = respLogin.json('access');
    return token
    
};

export default function(token) {
    const param = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
        }
    }
    let resp;
    resp = http.get(BASE_URL+'my/crocodiles/', param);
    check(resp, {
        'status code 200' : (r) => r.status === 200
    })

    sleep(1)
}