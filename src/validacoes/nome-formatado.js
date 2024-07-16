const nomeFormatado = function (nome) {
    const arraysNomes = nome.split(" ");
    let nomeCorrigido = "";
    for (let nomeSeparado of arraysNomes){
        nomeSeparado = nomeSeparado.toLowerCase()
        let primeiraLetra = nomeSeparado.slice(0, 1)
        let restoNome = nomeSeparado.slice(1)
        nomeCorrigido += primeiraLetra.toUpperCase() + restoNome + " "
      }
      return nomeCorrigido.trim()
  }

  module.exports = {nomeFormatado}