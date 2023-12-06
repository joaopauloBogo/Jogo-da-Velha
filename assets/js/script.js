let jogadorAtual = 'X';
let vitoriasJogador1 = 0;
let vitoriasJogador2 = 0;
let modoComputador = false;
let modoDoisJogadores = false;

function cadastrarJogador(jogador) {
    if (jogador === 1) {
        document.getElementById('player1').disabled = true;
    } else {
        document.getElementById('player2').disabled = true;
    }
}

function clicarCelula(celula) {
    const player1Name = document.getElementById('player1').value;
    const player2Name = modoComputador ? 'Computador' : document.getElementById('player2').value;

    if (celula.innerText === '' && !verificarVencedor() && !verificarEmpate()) {
        celula.innerText = jogadorAtual;
        if (verificarVencedor()) {
            alert(`Parabéns, ${jogadorAtual === 'X' ? player1Name : player2Name}! Você venceu!`);
            atualizarVitorias();
            reiniciarTabuleiro();
        } else if (verificarEmpate()) {
            alert('O jogo empatou!');
            reiniciarTabuleiro();
        } else {
            jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
            if (modoComputador && jogadorAtual === 'O') {
                jogadaComputador();
            }
        }
    }
}

function verificarVencedor() {
    const celulas = document.querySelectorAll('.cell');
    const combinacoesVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;
        if (celulas[a].innerText !== '' &&
            celulas[a].innerText === celulas[b].innerText &&
            celulas[a].innerText === celulas[c].innerText) {
            return true;
        }
    }

    return false;
}

function verificarEmpate() {
    const celulas = document.querySelectorAll('.cell');
    return Array.from(celulas).every(celula => celula.innerText !== '');
}

function atualizarVitorias() {
    if (jogadorAtual === 'X') {
        vitoriasJogador1++;
        document.getElementById('player1-wins').innerText = `Vitórias: ${vitoriasJogador1}`;
    } else {
        vitoriasJogador2++;
        document.getElementById('player2-wins').innerText = `Vitórias: ${vitoriasJogador2}`;
    }
}

function reiniciarTabuleiro() {
    const celulas = document.querySelectorAll('.cell');
    for (const celula of celulas) {
        celula.innerText = '';
    }
}

function resetJogo() {
    vitoriasJogador1 = 0;
    vitoriasJogador2 = 0;
    document.getElementById('player1-wins').innerText = 'Vitórias: 0';
    document.getElementById('player2-wins').innerText = 'Vitórias: 0';
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    document.getElementById('player1').disabled = false;
    document.getElementById('player2').disabled = false;
    reiniciarTabuleiro();
}

function toggleModoComputador() {
    modoComputador = document.getElementById('computer-checkbox').checked;
    document.getElementById('player2').disabled = modoComputador;
    resetJogo();
}

function toggleModoDoisJogadores() {
    modoDoisJogadores = !modoDoisJogadores;
    document.getElementById('computer-checkbox').checked = false;
    document.getElementById('player2').disabled = modoComputador;
    resetJogo();
}

function jogadaComputador() {
    const celulas = document.querySelectorAll('.cell');
    const celulasVazias = Array.from(celulas).filter(celula => celula.innerText === '');

    if (celulasVazias.length > 0) {
        const celulaAleatoria = celulasVazias[Math.floor(Math.random() * celulasVazias.length)];
        setTimeout(() => clicarCelula(celulaAleatoria), 500);
    }
}