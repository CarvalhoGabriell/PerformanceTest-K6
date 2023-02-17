// modulo de inicialização
import {http} from "k6/http";


// modulo de configuração

// modulo de execução
export default function() {
    http.get('http://test.k6.io')
}

