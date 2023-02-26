import * as http from 'k6/http'
import { check } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options= {
    vus:1,
    duration: '30s',
    thresholds: { checks: ['rate > 0.99']}
}

export default function() {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/'
    let resp;

    resp = http.get(BASE_URL);

    check(resp, {
        'status code 200' : (r) => r.status === 200
    })
}

// no metodo de retorno informar o caminho que o report deve ser armazenado e o nome do arquivo terminado em .html
export function handleSummary(data) {
    return {
      "index.html": htmlReport(data),
    };
  }