import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { SharedArray } from "k6/data";

// fase de configuração
export const options = {
    stages: [
        { duration: '10s', target: 10},
        { duration: '10s', target: 10},
        { duration: '10s', target: 0}
    ],
    thresholds: { 
        checks: ['rate > 0.95'],
        http_req_duration: ['p(90) < 230']

    }
}

const jsonFile = new SharedArray('Lendo arquivo json', function() {

    return  JSON.parse(open('../Docs/payloads_crocodiles.json')).crocodiles
})

    
// fase de execução
export default function() {
    let crocodilo = jsonFile[Math.floor(Math.random() * jsonFile.length)].id
    let resp;
    
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`
    resp = http.get(BASE_URL);

    check(resp, {
        'status code 200': (r) => r.status === 200
    });
    sleep(1)
}

// no metodo de retorno informar o caminho que o report deve ser armazenado e o nome do arquivo terminado em .html
export function handleSummary(data) {
    return {
      "index.html": htmlReport(data),
    };
  }