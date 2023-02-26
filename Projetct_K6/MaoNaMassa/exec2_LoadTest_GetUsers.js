import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


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

function LengthIDCrocodiles() {
    const req = http.get('https://test-api.k6.io/public/crocodiles/')
    let crocodiles = req.json()
    let qtdIdCrocodiles = crocodiles.map(function(e) {return e.id})
    let randomID = Math.floor(Math.random() * qtdIdCrocodiles.length + 1)
    return  randomID
};
    
// fase de execução
export default function() {
    const id = LengthIDCrocodiles();
    let resp;
    
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${id}`
    resp = http.get(BASE_URL);

    check(resp, {
        'status code 200': (r) => r.status === 200
    });
    sleep(1)
}

// no metodo de retorno informar o caminho que o report deve ser armazenado e o nome do arquivo terminado em .html
export function handleSummary(data) {
    return {
      "../logs/index.html": htmlReport(data),
    };
  }