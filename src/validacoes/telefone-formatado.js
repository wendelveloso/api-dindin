const telefoneFormatado = function (telefone){
    const quatroUltimosNumeros = telefone.slice(-4)
    const quatroPrimeirosNumeros = telefone.slice(-8, -4)
    const ddd = telefone.slice(0, 2)
    let celularFormatado = ""

    if (telefone.length === 11){
        return celularFormatado = ddd + " " + telefone.slice(2,3) + " " + quatroPrimeirosNumeros + "-" + quatroUltimosNumeros
    }else if (telefone.length === 10){
        return celularFormatado = ddd + " " + "9 " + quatroPrimeirosNumeros + "-" + quatroUltimosNumeros
    } else if (telefone.length === 9){
        return celularFormatado = telefone.slice(0, 1) + " " + quatroPrimeirosNumeros + "-" + quatroUltimosNumeros
    } else if (telefone.length === 8){
        return celularFormatado = "9 " + quatroPrimeirosNumeros + "-" + quatroUltimosNumeros
    } 
}

module.exports = {telefoneFormatado}