import * as http from 'k6/http'
import { check } from 'k6'


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