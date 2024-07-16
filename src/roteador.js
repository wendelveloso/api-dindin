const express = require('express')
const rotas = express()
const {criandoContaBancaria, deletandoContaBancaria, saldo, extrato } = require('./controladores/recurso-contas')
const { atualizarUsuarioContaBancaria } = require('./controladores/recurso-usuario')
const { depositar, sacar, transferir} = require('./controladores/recurso-transacoes')
const validarSenha = require('./validacoes/validar-senha')

rotas.get('/contas', validarSenha)
rotas.get('/contas/saldo', saldo)
rotas.get('/contas/extrato', extrato)
rotas.post('/contas', criandoContaBancaria)
rotas.put('/contas/:numeroConta/usuario', atualizarUsuarioContaBancaria)
rotas.delete('/contas/:numeroConta', deletandoContaBancaria)
rotas.post('/transacoes/depositar', depositar)
rotas.post('/transacoes/sacar', sacar)
rotas.post('/transacoes/transferir', transferir)


module.exports = rotas