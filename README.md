# API | EasyBank

API RESTful que contém recursos de um sistema bancário, possibilitando a criação e gerenciamento de contas e transações básicas de depósito, saque e transferências.

<br>
<img align=center src="banner-repository-easybank.png">

## Como rodar

Para rodar o projeto localmente, você precisa:

- _Instalar as dependências_

```shell
npm install
```

- _Iniciar o projeto com:_

```shell
npm run dev
```

## _Rotas usáveis_ 

O servidor será iniciado na porta 3000 e você poderá acessá-lo em:

 <br>

 ```shell
 http://localhost:3000/contas
```
`POST` _Essa é a rota que será utilizada para criar uma conta bancária, onde será gerado um número único para identificação de cada conta._<br>
`PUT` `/contas/:numeroConta/usuario` _Essa é a rota que será utilizada para atualizar os dados do usuário de uma conta bancária._<br>
`DELETE` `/contas/:numeroConta` _Essa é a rota que será utilizada para excluir uma conta bancária existente._<br>
`GET` `/contas?senha_banco=123` _Essa é a rota que será utilizada para listar todas as contas bancárias existentes._
<br>

<br>

`GET` `/contas/saldo?numero_conta=123&senha=123` _Essa é a rota que será utilizada para retornar o saldo de uma conta bancária._<br>
`GET` `/contas/extrato?numero_conta=123&senha=123` _Essa é a rota que será utilizada para listar as transações realizadas de uma conta específica._

<details>
<summary><b>Exemplo de Requisição json</b></summary>
<br>
 
```javascript
// POST /contas
{
    "nome": "Foo Bar",
    "email": "foo@bar.com",
    "cpf": "00011122233",
    "data_nascimento": "15/03/2001",
    "telefone": "11999998888",
    "senha": "1234"
}

// PUT /contas/1/usuario
// informando apenas um campo para atualizar
{
    "nome": "Bar Foo"
}

// informando todos os campos para atualizar
{
    "nome": "Bar Foo",
    "email": "bar@foo.com",
    "cpf": "33322211100",
    "data_nascimento": "03/05/2010",
    "telefone": "11988889999",
    "senha": "4321"
}
```
</details>

<br>
<br>

```shell
http://localhost:3000/transacoes
```
`POST` `/transacoes/depositar` _Essa é a rota que será utilizada para somar o valor do depósito ao saldo de uma conta válida e registrar essa transação._ <br>
`POST` `/transacoes/sacar` _Essa é a rota que será utilizada para realizar o saque de um valor em uma determinada conta bancária e registrar essa transação._<br>
`POST` `/transacoes/transferir` _Essa é a rota que será utilizada para para realizar a transferência de saldo de uma conta bancária para outra e registrar essa transação._<br>
<details>
<summary><b>Exemplo de Requisição json</b></summary>
<br>
 
```javascript
// POST /transacoes/depositar
{
    "numero_conta": "1",
    "valor": 10000
}

// POST /transacoes/sacar
{
    "numero_conta": "1",
    "valor": 10000,
    "senha": "1234"
}

// POST /transacoes/transferir
{
    "numero_conta_origem": "1",
    "numero_conta_destino": "2",
    "valor": 10000,
    "senha": "1234"
}
```
</details>

<br>

## _Tecnologias usadas_
- Javascript
- Node.js
- Express.js
- JSON
