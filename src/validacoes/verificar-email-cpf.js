const verificar = function (contas, param) {
  const key = Object.keys(param);
  const conta = contas.find((conta) => {
    return conta.usuario[key] === param[key];
  });
  return conta;
};

module.exports = { verificar };
  