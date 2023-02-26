// iniciaização
import * as http from 'k6/http';
import { check } from 'k6';

// modulo de configuração de carga
export const options = {
    vus: 1,
    duration: '2s'
}

// modulo de execução
export default function() {
    const resp = http.get('http://test.k6.io')
    // console.log(resp)
    check(resp, {
        // primeiro: Nome da checagem segundo: codigo realizando a checagem
        'status code 200': (result) => result.status === 200,
        'body not null': (result) => result.body != null
    });
}