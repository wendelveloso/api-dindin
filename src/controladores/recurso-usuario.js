const { contas } = require("../dados/colecao-contas");
const { telefoneFormatado } = require("../validacoes/telefone-formatado");
const { emailFormatado } = require("../validacoes/formatar-email");
const { nomeFormatado } = require("../validacoes/nome-formatado");
const { verificar } = require("../validacoes/verificar-email-cpf");

const atualizarUsuarioContaBancaria = (req, res) => {
  try {
    const { numeroConta } = req.params;
    const { email, cpf, nome, data_nascimento, telefone, senha } = req.body;

    const conta = contas.find((conta) => {
      return conta.numero === Number(numeroConta);
    });

    if (!conta) {
      return res
        .status(404)
        .json({ mensagem: "Não existe conta com essa numeração!" });
    }
    if (Object.keys(req.body).length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Ao menos um campo precisa ser alterado." });
    }
    if (verificar(contas, { cpf: cpf })) {
      return res.status(404).json({ mensagem: "Este CPF já está cadastrado." });
    }
    if (verificar(contas, { email: email })) {
      return res
        .status(404)
        .json({ mensagem: "Este e-mail já está cadastrado." });
    } else if (!emailFormatado(email)) {
      return res.status(400).json({ mensagem: "Insira um e-mail válido!" });
    }
    if (nome) {
      conta.usuario.nome = nomeFormatado(nome);
    }
    if (cpf) {
      conta.usuario.cpf = cpf;
    }
    if (data_nascimento) {
      conta.usuario.data_nascimento = data_nascimento;
    }
    if (telefone) {
      conta.usuario.telefone = telefoneFormatado(telefone);
    }
    if (email) {
      conta.usuario.email = email;
    }
    if (senha) {
      conta.usuario.senha = senha;
    }
    return res.status(201).json({ mensagem: "Conta atualizada com sucesso" });
  } catch (error) {
    return res.status(500).json(`Error: ${error.message}`);
  }
};

module.exports = {
  atualizarUsuarioContaBancaria,
};
