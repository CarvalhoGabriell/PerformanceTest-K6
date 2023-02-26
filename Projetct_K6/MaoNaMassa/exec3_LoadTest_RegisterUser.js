import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = {
    stages :[{duration: '10', target: 10}],

    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 500 '],
        http_req_failed: ['rate < 0.01']
    },
}

export default function() {
    
    const BASE_URL = 'https://test-api.k6.io'
    let resp;

    const USER =`${Math.random()}@mail.io`
    const PASS = '123456k6'

    let payload = {
        username: USER,
        first_name: "Croc",
        last_name: "Dino",
        email: USER,
        password: PASS
    }
    console.log(USER + PASS)
    resp = http.post(`${BASE_URL}/user/register/`
        , JSON.stringify(payload)
        , {headers: { 'Content-Type': 'application/json' }}
    )
    console.log(resp.json())
    check(resp, {
        'Register sucess 201': (s) => s.status === 201
    });

    sleep(1)
}

// no metodo de retorno informar o caminho que o report deve ser armazenado e o nome do arquivo terminado em .html
export function handleSummary(data) {
    return {
      "../logs/index.html": htmlReport(data),
    };
  }