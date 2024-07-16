const emailFormatado = function (email) {
    const emailCorrigido = email.trim();
    const emailComprimento = emailCorrigido.length;
    const indiceArroba = emailCorrigido.indexOf("@");
    const indicePontoAposArroba = emailCorrigido.indexOf(".", indiceArroba);
    const indicePontoInicio = emailCorrigido.indexOf(".");
    const indicePontoFinal = emailCorrigido.lastIndexOf(".");
    const textoVerificadorEmail =
      indiceArroba > 0 &&
      indicePontoAposArroba > indiceArroba &&
      indicePontoFinal + 1 !== emailComprimento &&
      indicePontoInicio !== 0
        ? true
        : false;
    return textoVerificadorEmail;
  };

  module.exports = {emailFormatado}