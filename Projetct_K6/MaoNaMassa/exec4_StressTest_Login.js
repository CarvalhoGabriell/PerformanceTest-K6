import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = {
    stages :[
        {duration: '5s', target: 5},
        {duration: '5s', target: 0},
        {duration: '2s', target: 50},
        {duration: '2s', target: 50},
        {duration: '5s', target: 0}
    ],

    thresholds: {
        http_req_failed: ['rate < 0.01']
    },

    ext: {
        loadimpact: {
          // projectID referente ao projeto criado dentro do k6 cloud
          projectID: 3628577,
          // Test runs with the same name groups test runs together
          name: "Test K6 Cloud execution"
        }
      }
}

const fileCSV = new SharedArray('Ler dados CSV', function(){
    return  papaparse.parse(open('../Docs/usuarios.csv'), {header: true}).data;
});


export default function() {
    const BASE_URL = 'https://test-api.k6.io'
    const USER = fileCSV[Math.floor(Math.random() * fileCSV.length)].username
    const PASS = '123456k6'
    
    let resp;
    resp = http.post(`${BASE_URL}/auth/token/login/`, 
        {
            headers: { 'Content-Type': 'application/json' },
            username: USER,
            password: PASS
        }
        
    );
    //console.log("Token JWT logado do user: "+resp.body)
    check(resp, {
        'Login sucess 200': (s) => s.status === 200,
        'Generate JWT Token': (t) => t.json('acess') !== ''
    });

    sleep(1)

}



// no metodo de retorno informar o caminho que o report deve ser armazenado e o nome do arquivo terminado em .html
export function handleSummary(data) {
    return {
      "../logs/index.html": htmlReport(data),
    };
  }