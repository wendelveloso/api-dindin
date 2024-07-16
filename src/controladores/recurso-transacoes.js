const { format } = require("date-fns");
const {
  contas,
  depositos,
  saques,
  transferencias,
} = require("../dados/colecao-contas");

const depositar = (req, res) => {
  const { valor, numero_conta } = req.body;
  try {
    const conta = contas.find((conta) => {
      return conta.numero === Number(numero_conta);
    });

    if (!conta) {
      return res
        .status(400)
        .json({ mensagem: "O número de conta informado não existe." });
    }
    if (valor <= 0) {
      return res.status(400).json({
        mensagem: "Não é permitido depósito com valor negativo ou zerado",
      });
    }

    conta.saldo += valor;
    const registroDeposito = {
      data: format(new Date(), "yyyy-MM-dd' 'HH:mm:ss"),
      numero_conta,
      valor,
    };
    depositos.push(registroDeposito);
    return res.status(201).json({ mensagem: "Depósito realizado com sucesso" });
  } catch (error) {
    return res.status(500).json(`Error: ${error.message}`);
  }
};
const sacar = (req, res) => {
  const { numero_conta, valor, senha } = req.body;

  try {
    const conta = contas.find((conta) => {
      return conta.numero === Number(numero_conta);
    });
    if (!conta) {
      return res
        .status(400)
        .json({ mensagem: "O número de conta informado não existe." });
    }

    if (conta.usuario.senha === senha && valor <= conta.saldo) {
      conta.saldo -= valor;
    } else {
      return res.status(400).json({
        mensagem:
          "A senha informada está incorreta ou não possui saldo suficiente em conta.",
      });
    }
    const registroSaque = {
      data: format(new Date(), "yyyy-MM-dd' 'HH:mm:ss"),
      numero_conta,
      valor,
    };
    saques.push(registroSaque);
    return res.status(201).json({ mensagem: "Saque realizado com sucesso" });
  } catch (error) {
    return res.status(500).json(`Error: ${error.message}`);
  }
};
const transferir = (req, res) => {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

  try {
    if (!numero_conta_origem) {
      return res
        .status(400)
        .json({ mensagem: "O campo número da conta origem é obrigatório!" });
    }
    if (!numero_conta_destino) {
      return res
        .status(400)
        .json({ mensagem: "O campo número da conta destino é obrigatório!" });
    }
    if (!valor) {
      return res.status(400).json({ mensagem: "O campo valor é obrigatório!" });
    }
    if (!senha) {
      return res.status(400).json({ mensagem: "O campo senha é obrigatório!" });
    }

    const NumeroContaOrigem = contas.find((conta) => {
      return conta.numero === Number(numero_conta_origem);
    });
    const NumeroContaDestino = contas.find((conta) => {
      return conta.numero === Number(numero_conta_destino);
    });

    if (!NumeroContaOrigem) {
      return res
        .status(400)
        .json({ mensagem: "Número da conta origem informado não existe." });
    }
    if (!NumeroContaDestino) {
      return res
        .status(400)
        .json({ mensagem: "Número da conta destino informado não existe." });
    }

    if (
      NumeroContaOrigem.usuario.senha === senha &&
      valor <= NumeroContaOrigem.saldo
    ) {
      NumeroContaOrigem.saldo -= valor;
      NumeroContaDestino.saldo += valor;
    } else {
      return res.status(400).json({
        mensagem:
          "A senha informada está incorreta ou não possui saldo suficiente em conta.",
      });
    }

    const registroTransferencia = {
      data: format(new Date(), "yyyy-MM-dd' 'HH:mm:ss"),
      numero_conta_origem: NumeroContaOrigem.numero,
      numero_conta_destino: NumeroContaDestino.numero,
      valor,
    };
    transferencias.push(registroTransferencia);
    return res
      .status(201)
      .json({ mensagem: "Transferência realizado com sucesso" });
  } catch (error) {
    return res.status(500).json(`Error: ${error.message}`);
  }
};

module.exports = {
  depositar,
  sacar,
  transferir,
};
