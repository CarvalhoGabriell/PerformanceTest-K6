
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
    - Load Tests
    - Smoke Tests
    - Métricas

## Linha de comando para execução

```bash
  k6 run .\config_metrics.js --out json=.\logs\test.json
```
* Para executar esse comando com sucesso é necessário realizar as configurações do k6-cloud e configurar o seu Token.

```bash
  
 k6 run .\config_metrics.js --out json=.\logs\test.json --out cloud
```
* Para debugar seu código basta adicionar as tags `--http-debug` ou `--http-debug=full` em tempo de execução e no seu terminal de saída haverá algumas informação mais detalhadas
```bash
  
 k6 run .\MaoNaMassa\exec5_LoadTest_LoginAuth.js --http-debug=full
```

## Autores

- [@CarvalhoGabriell](https://github.com/CarvalhoGabriell)

