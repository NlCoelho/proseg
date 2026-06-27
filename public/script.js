// DATA INICIAL DO CONTADOR
const DATA_INICIAL = new Date("2022-12-14T00:00:00");

function atualizarPainel() {
  const pai = document.querySelector(".quadro");
  const filho = pai.querySelector(".hora");
  const filho2 = pai.querySelector(".data");
  const filho3 = document.querySelector(".dias");

  filho.style.fontSize = `${quadro.clientWidth * 0.45}px`;
  filho2.style.fontSize = `${quadro.clientWidth * 0.14}px`;
  filho3.style.fontSize = `${quadro.clientWidth * 0.4}px`;

  const agora = new Date();

  // DATA
  const options = { day: "2-digit", month: "2-digit" };
  document.getElementById("dataAtual").textContent = agora.toLocaleDateString("pt-BR", options);

  // HORA

  document.getElementById("hh").textContent = String(agora.getHours()).padStart(2, "0");

  document.getElementById("mm").textContent = String(agora.getMinutes()).padStart(2, "0");

  document.getElementById("sep").style.opacity = agora.getSeconds() % 2 === 0 ? "1" : "0";

  // DIA SEMANA

  const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  const hoje = new Date();

  const numeroDia = hoje.getDay();
  document.getElementById("dataAtual").textContent = document.getElementById("dataAtual").textContent + " " + diasDaSemana[numeroDia].substring(0, 3).toUpperCase();

  // DIAS CORRIDOS
  const diferenca = agora.getTime() - DATA_INICIAL.getTime();
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  if(dias % 100 === 0 && (agora.getHours() % 6 === 0 || agora.toLocaleTimeString('pt-BR') == "00:00:00")){
    runConfetti();
    
  }
  document.getElementById("dias").textContent = dias.toLocaleString("pt-BR") + " DIAS";
}

atualizarPainel();

//runConfetti();
// Confetti: efeito por 5 segundos, partindo do alto até embaixo
function runConfetti() {
  confetti({
    duration: 3000,
    spread: 360,
    origin: { 
      x: 0.5, 
      y: -0.5 
    },
    velocity: 0,
    gravity: 0.5,
    ticks: 8000,
    particleCount: 8000,
    
  });
}

setInterval(atualizarPainel, 1000);
// Executa a checagem de deploy assim que abre e depois a cada 5 minutos (300000ms)
setInterval(checarNovoDeploy, 120000);

// Armazena a versão inicial da página (ETag ou data de modificação)
let hashAtual = null;

async function checarNovoDeploy() {
  try {
    // Faz uma requisição rápida apenas no cabeçalho da página para evitar consumo de dados
    const local = "https://127.0.0.1:8080/";
    const production = "https://proseg-nine.vercel.app";
    
    const resposta = await fetch(`${production}`, { method: "HEAD", cache: "no-cache" });
    // A Vercel gera um mapeamento único (ETag ou x-vercel-id) para cada deploy
    const novoHash = resposta.headers.get("etag") || resposta.headers.get("x-vercel-id") || resposta.headers.get("last-modified");
    
    if (hashAtual === null) {
      hashAtual = novoHash;
    } else if (hashAtual !== novoHash) {
      // Se o servidor responder com um hash diferente, um novo deploy foi feito!
      window.location.reload(true);
    }
  } catch (erro) {
    console.log("Erro ao checar deploy:", erro);
  }
}
