import * as http from 'k6/http'
import { check } from 'k6'



export const options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_failed : ['rate < 0.02'],
        //http_req_duration: ['p(90) > 250'],

        // o k6 irá abortar a execução se algum limite for ultrapassado
        http_req_duration: [{ threshold: 'p(90) > 200', abortOnFail: true}],

        checks: ['rate > 0.90']
    }
}


export default function() {
    const resp = http.get('http://test.k6.io')
    check(resp, {
        'status code 200': (r) => r.status === 200
    });
}