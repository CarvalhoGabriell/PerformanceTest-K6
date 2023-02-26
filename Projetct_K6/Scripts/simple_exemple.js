// 1. Inicialização
import {sleep} from 'k6';

// 2. Configuração - opções que o teste irá receber, como qtd de usuários e duração
export const options = {
    vus: 2,
    duration: '3s'
}

// 3. Execução ou código vu
export default function() {
    console.log("testando o k6")
    sleep(1)
}

// 4. Desmontagem - Envio de informações e resultados do teste
export function teardown(result) {
    console.log(result)
}