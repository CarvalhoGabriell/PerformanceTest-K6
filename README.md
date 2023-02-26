
# Teste de Performance com K6

<div align="center">
  <img src="/assets/K6-logo.svg.png" width="320px" padding-bottom="500px"/>
</div>
</br>

Um simples projeto passando por exemplos básicos e avançados de Testes de Performance utilizando o K6 + JavaScript. Passando por todos os conceitos e passo-a-passo de como utilizado essa ferramenta completa para criar seus testes não-funcionais.

##
## Tecnologias Uttilizadas
 - JavaScript
 - K6

<div align="center">
  <img src="/assets/k6_crocodile.png" width="320px"/>
</div>

## Tipos de Testes executados no Projeto
    - Testes de Carga
    - Smoke Tests
    - Métricas
    - Checks
    - Testes de Desempenho

## Linha de comando para execução

* Comando para executar o script localmente e gerando um arquivo de log .json

```bash
  k6 run .\config_metrics.js --out json=.\logs\test.json
```

* Para debugar seu código basta adicionar as tags `--http-debug` ou `--http-debug=full` em tempo de execução e no seu terminal de saída haverá algumas informação mais detalhadas
```bash
  
 k6 run .\MaoNaMassa\exec5_LoadTest_LoginAuth.js --http-debug=full
```

## Autores

- [@CarvalhoGabriell](https://github.com/CarvalhoGabriell)