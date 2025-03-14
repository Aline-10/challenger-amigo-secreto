
document.getElementById("amigo").addEventListener("keydown", apertarTeclaEnter);

function apertarTeclaEnter(evento){
    if (evento.key === "Enter") {
        adicionarAmigo();
    }
}

let listaAmigos = [];
let quantidadeElementosLista = 0;
let sorteioRealizado = false; // Variável para verificar se o sorteio foi feito



// função para que o primeiro sorteio tenha de ser feito com no minimo 3 pessoas na lista
function atualizarQuantidadeLista() {
    quantidadeElementosLista = listaAmigos.length;
    console.log(quantidadeElementosLista);
    // Verifica se a lista tem pelo menos 3 elementos e se o sorteio ja foi realizado
    if (quantidadeElementosLista < 3 && !sorteioRealizado) {
        document.getElementById("sortear").disabled = true;
        document.getElementById("tituloPrincipal").innerHTML = `Adicione mais ${3 - quantidadeElementosLista} amigos`;
    } else {  // Habilita o botão de sortear
        document.getElementById("sortear").disabled = false;
        document.getElementById("tituloPrincipal").innerHTML = `Digite o nome dos seus amigos`;
    } 
    if (quantidadeElementosLista === 0) {
        document.getElementById("limpar").disabled = true;
    }
    else {
        document.getElementById("limpar").disabled = false;
    }
}

// Função para adcionar amigos a lista
function adicionarAmigo() {
    let nome = document.querySelector('#amigo').value;
    // verifica se o campo esta vazio
    if (nome == "") {
        alert("Por Favor, Insira um nome")
        return;
    } 
    // verifica se amigo ja foi adcionado
    if (listaAmigos.includes(nome)) {
        alert("Esse amigo já foi adicionado")
        return;
    }
    // Adiciona o amigo a lista caso as condições sejam falsas 
    listaAmigos.push(nome);
    console.log(listaAmigos);
    atualizarLista();
    atualizarQuantidadeLista();
    limparCampo();
}

function atualizarLista() {
    // Atualiza a lista de amigos exibida na tela
    let lista = document.querySelector('#listaAmigos');
    lista.innerHTML = '';
    // Loop que adiciona amigos à lista
    for (let i = 0; i < listaAmigos.length; i++) {
        let item = document.createElement('li');
        item.textContent = listaAmigos[i];
        lista.appendChild(item);
    }
    atualizarQuantidadeLista();
    
}

// função para sortear amigos
function sortearAmigo() {
    // Verificação se a lista esta vazia
    if (listaAmigos.length === 0) {
        alert('Adicione amigos antes de sortear');
        return;
    }
    // Realizaçao do sorteio
    let numeroAleatorio = Math.floor(Math.random() * listaAmigos.length);
    let amigoSorteado = listaAmigos[numeroAleatorio];
    // Seleciona o elemento onde o resultado será exibido
    let resultado = document.getElementById("resultado");
     // Exibe o amigo sorteado na tela
    resultado.innerHTML = `O amigo sorteado foi: ${amigoSorteado}`;
    // Remove o amigo sorteado da lista
    listaAmigos.splice(numeroAleatorio, 1);
    sorteioRealizado = true
    atualizarLista();
    atualizarQuantidadeLista();
    confeteDoCliff();

}

// Função para limpar o campo de input
function limparCampo() {
    let chute = document.querySelector("input");
    chute.value = "";
}

// Função para limpar a lista de amigos
function limparLista() {
    listaAmigos = [];
    atualizarLista();
    atualizarQuantidadeLista();
    sorteioRealizado = false; // transforrma o sorteio em falso
    document.getElementById("resultado").innerHTML = "Lista de amigos limpa";
}

// função que dispara confetes

function confeteDoCliff() {
    // variavel que faz o tempo de duração do confete (15 segundos do futuro)
    var end = Date.now() + (15 * 1000);
    // variavel que seleciona as cores do confete
    var colors = ['#4b69fd', '#ffffff'];

    (function frame() {
        //confete da esquerda
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        // confete da direita
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
        // finaliza o processo quando o tempo atual for maior que o definido na variavel end
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}