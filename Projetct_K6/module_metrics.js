// inicialização
import { check } from 'k6';
import * as http from 'k6/http';

// metricas de contadores
import { Counter } from 'k6/metrics';

// metricas de medição
import { Gauge } from 'k6/metrics';
// metricas de taxa
import { Rate } from 'k6/metrics';

// metricas de tendência
import { Trend } from 'k6/metrics';

// modulo de configuração
export const options = {
    vus: 2,
    duration: '2s'
}

const calls = new Counter('quantidade de chamadas')
const myGauge = new Gauge('Tempo bloqueado')
const myRate = new Rate('Taxa requisições 200')
const trends = new Trend('Taxa de espera')

// modulo de execução
export default function() {
    const resp = http.get('https://learn.mongodb.com/learn/dashboard')

    check(resp, {
        'status code OK': (result) => result.status === 200
    })
    console.log(`Response time of site ${resp.timings.duration} ms`)
    calls.add(2);
    calls.add(1);
    myGauge.add(resp.error.length);
    myRate.add(resp.status === 200)
    trends.add(resp.timings.duration)

}