const {contas} = require('../dados/colecao-contas')

const validarSenha = (req, res) => {
  const { senha_banco } = req.query;
  if (!senha_banco) {
    return res.status(401).json({ mensagem: "A senha não foi informada." });
  } else if (senha_banco !== "Cubos123Bank") {
    return res
      .status(401)
      .json({ mensagem: "A senha informada está incorreta." });
  }
  return res.status(200).json(contas)
};

module.exports = validarSenha;
