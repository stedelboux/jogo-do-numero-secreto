const numeroLimite = 10;
let numeroSecreto;
let tentativas = 1;

function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * numeroLimite) + 1;
}

function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    if (campo) {
        campo.innerHTML = texto;
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

function exibirMensagemInicial() {
    numeroSecreto = gerarNumeroAleatorio(); // Definindo o número secreto aqui
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute() {
    const chute = document.querySelector('input').value;
    const palpite = parseInt(chute);
    
    if (isNaN(palpite) || palpite < 1 || palpite > numeroLimite) {
        exibirTextoNaTela('p', 'Por favor, insira um número válido.');
        return;
    }

    if (palpite == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        const palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        const mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (palpite > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    const campo = document.querySelector('input');
    if (campo) {
        campo.value = '';
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
