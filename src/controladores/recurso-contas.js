let {
  contas,
  id,
  transferencias,
  saques,
  depositos,
} = require("../dados/colecao-contas");
const {emailFormatado} = require('../validacoes/formatar-email')
const {telefoneFormatado} = require('../validacoes/telefone-formatado')
const {nomeFormatado} = require('../validacoes/nome-formatado')
const {verificar} = require('../validacoes/verificar-email-cpf')

const criandoContaBancaria = (req, res) => {
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

  try {
    if (verificar(contas, {cpf: cpf})) {
      return res.status(404).json({ mensagem: "Este CPF já está cadastrado." });
    }
    if (verificar(contas, {email: email}))
      return res
        .status(404)
        .json({ mensagem: "Este e-mail já está cadastrado." });

    if (!nome) {
      return res.status(400).json({ mensagem: "O nome é obrigatório!" });
    } else if (nome.trim().length === 0) {
      return res
        .status(400)
        .json({ mensagem: "O campo nome precisa ser preenchido!" });
    }
    if (!email) {
      return res.status(400).json({ mensagem: "O e-mail é obrigatório!" });
    } else if (email.trim().length === 0) {
      return res
        .status(400)
        .json({ mensagem: "O campo e-mail precisa ser preenchido!" });
    } else if (!emailFormatado(email)) {
      return res.status(400).json({ mensagem: "Insira um e-mail válido!" });
    }
    if (!cpf) {
      return res.status(400).json({ mensagem: "O CPF é obrigatório!" });
    } else if (cpf.trim().length === 0) {
      return res
        .status(400)
        .json({ mensagem: "O campo CPF precisa ser preenchido!" });
    } else if (cpf.length !== 11) {
      return res
        .status(400)
        .json({ mensagem: "O campo CPF precisa ter 11 números" });
    }
    if (!data_nascimento) {
      return res
        .status(400)
        .json({ mensagem: "A data de nascimento é obrigatória!" });
    } else if (cpf.trim().length === 0) {
      return res.status(400).json({
        mensagem: "O campo data de nascimento precisa ser preenchido!",
      });
    }
    if (!telefone) {
      return res.status(400).json({ mensagem: "O telefone é obrigatório!" });
    } else if (cpf.trim().length === 0) {
      return res
        .status(400)
        .json({ mensagem: "O campo telefone precisa ser preenchido!" });
    } else if (!telefoneFormatado(telefone)) {
      return res.status(400).json({ mensagem: "O campo telefone deve conter apenas números" })
    }
    if (!senha) {
      return res.status(400).json({ mensagem: "A senha é obrigatória!" });
    } else if (cpf.trim().length === 0) {
      return res
        .status(400)
        .json({ mensagem: "O campo senha precisa ser preenchido!" });
    }
    const novaConta = {
      numero: id++,
      saldo: 0,
      usuario: {
        nome: nomeFormatado(nome),
        cpf,
        data_nascimento,
        telefone: telefoneFormatado(telefone),
        email,
        senha,
      },
    };
    contas.push(novaConta);
    return res.status(201).json(novaConta);
  } catch (error) {
    return res.status(500).json(`Error: ${error.message}`);
  }
};
const deletandoContaBancaria = (req, res) => {
  const { numeroConta } = req.params;
  try {
    const conta = contas.find((conta) => {
      return conta.numero === Number(numeroConta);
    });

    if (!conta) {
      return res
        .status(400)
        .json({ mensagem: "O número de conta informado não existe." });
    }

    if (conta.saldo > 0) {
      return res.status(400).json({
        mensagem: "Não é permitido a exclusão da conta se houver saldo.",
      });
    } else {
      const indiceDaConta = contas.indexOf(conta);
      contas.splice(indiceDaConta, 1);
      return res.status(200).json({ mensagem: "Conta excluída com sucesso" });
    }
  } catch (error) {
    return res.status(500).json(`Error: ${error.message}`);
  }
};
const saldo = (req, res) => {
  const { numero_conta, senha } = req.query;
  try {
    if (!numero_conta || !senha) {
      return res.status(400).json({
        mensagem: "O número da conta e senha precisam ser informados.",
      });
    }
    const conta = contas.find((conta) => {
      return conta.numero === Number(numero_conta);
    });
    const senhaUsuario = contas.find((conta) => {
      return conta.usuario.senha === senha;
    });
    if (!conta) {
      return res
        .status(400)
        .json({ mensagem: "O número da conta está incorreto ou não existe." });
    }
    if (!senhaUsuario) {
      return res.status(400).json({ mensagem: "A senha está incorreta!" });
    }

    return res.status(200).json({ saldo: conta.saldo });
  } catch (error) {
    return res.status(500).json(`Error: ${error.message}`);
  }
};
const extrato = (req, res) => {
  const { numero_conta, senha } = req.query;

  try {
    if (!numero_conta || !senha) {
      return res.status(400).json({
        mensagem: "O número da conta e senha precisam ser informados.",
      });
    }
    const conta = contas.find((conta) => {
      return conta.numero === Number(numero_conta);
    });
    if (!conta) {
      return res
        .status(400)
        .json({ mensagem: "O número da conta está incorreto ou não existe." });
    }
    if (conta.usuario.senha !== senha) {
      return res.status(400).json({ mensagem: "A senha está incorreta!" });
    }

    const transferenciasEnviadas = transferencias.filter((conta) => {
      return conta.numero_conta_origem == numero_conta;
    });
    const transferenciasRecebidas = transferencias.filter((conta) => {
      return conta.numero_conta_destino == numero_conta;
    });
    const depositosUsuario = depositos.filter((conta) => {
      return conta.numero_conta == numero_conta;
    });
    const saquesUsuario = saques.filter((conta) => {
      return conta.numero_conta == numero_conta;
    });
    const extratoBancario = {
      depositos: depositosUsuario,
      saques: saquesUsuario,
      transferenciasEnviadas,
      transferenciasRecebidas,
    };
    return res.status(201).json(extratoBancario);
  } catch (error) {
    return res.status(500).json(`Error: ${error.message}`);
  }
};

module.exports = {
  criandoContaBancaria,
  deletandoContaBancaria,
  saldo,
  extrato,
};
