// Arrays para armazenar doadores e solicitações de sangue
let doadores = [];
let solicitacoes = [];

// Função para verificar compatibilidade sanguínea
function verificarCompatibilidade(solicitante, doador) {
    const compatibilidade = {
        "A+": ["A+", "AB+"],
        "A-": ["A-", "A+", "AB-", "AB+"],
        "B+": ["B+", "AB+"],
        "B-": ["B-", "B+", "AB-", "AB+"],
        "AB+": ["AB+"],
        "AB-": ["AB-", "A-", "B-", "AB+", "O-"],
        "O+": ["O+", "A+", "B+", "AB+"],
        "O-": ["O-"]
    };

    return compatibilidade[solicitante].includes(doador);
}

// Função para cadastrar um doador
document.querySelector("#cadastro-doador-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio do formulário

    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const ultimaDoacao = document.getElementById("ultimaDoacao").value;
    const contato = document.getElementById("contato").value;

    // Adiciona o doador ao array de doadores
    doadores.push({
        nome: nome,
        tipo: tipo,
        ultimaDoacao: ultimaDoacao,
        contato: contato
    });

    alert(`Doador ${nome} cadastrado com sucesso!`);

    verificarCompatibilidadeComSolicitacao(tipo);
});

// Função para cadastrar uma solicitação de sangue
document.querySelector("#solicitacao-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Previne o envio do formulário

    const nomeSolicitante = document.getElementById("nomeSolicitante").value;  // Adicionado nome do solicitante
    const tipoSolicitado = document.getElementById("tipoNecessario").value;
    const quantidade = document.getElementById("quantidade").value;

    // Adiciona a solicitação ao array de solicitações
    solicitacoes.push({
        nomeSolicitante: nomeSolicitante, 
        tipoSolicitado: tipoSolicitado,
        quantidade: quantidade
    });

    alert(`Solicitação de sangue de ${nomeSolicitante} para o tipo ${tipoSolicitado} e quantidade de ${quantidade} bolsas cadastrada com sucesso!`);

    // Verifica compatibilidade automaticamente com os doadores
    verificarCompatibilidadeComDoador(tipoSolicitado);
});

function verificarCompatibilidadeComDoador(tipoSolicitado) {
    let doadorCompativel = null;
    for (let i = 0; i < doadores.length; i++) {
        if (verificarCompatibilidade(tipoSolicitado, doadores[i].tipo)) {
            doadorCompativel = doadores[i];
            break;
        }
    }

    if (doadorCompativel) {
        alert(`Encontramos um doador compatível!\nDoador: ${doadorCompativel.nome} (${doadorCompativel.tipo})`);
    } else {
        alert(`Não encontramos um doador compatível para o tipo ${tipoSolicitado}.`);
    }
}

function verificarCompatibilidadeComSolicitacao(tipoDoador) {
    let solicitanteCompativel = null;
    for (let i = 0; i < solicitacoes.length; i++) {
        if (verificarCompatibilidade(solicitacoes[i].tipoSolicitado, tipoDoador)) {
            solicitanteCompativel = solicitacoes[i];
            break;
        }
    }

    if (solicitanteCompativel) {
        alert(`Encontramos uma solicitação compatível!\nSolicitação: ${solicitanteCompativel.nomeSolicitante} (${solicitanteCompativel.tipoSolicitado}, ${solicitanteCompativel.quantidade} bolsas)`);
    } else {
        alert(`Não encontramos uma solicitação compatível para o tipo sanguíneo ${tipoDoador}.`);
    }
}
