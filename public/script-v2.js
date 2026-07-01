// DATA INICIAL DO CONTADOR
const DATA_INICIAL = new Date("2022-12-14T00:00:00");

function atualizarPainel() {
  const pai = document.querySelector(".quadro");
  const hora = pai.querySelector(".hora");
  const data = pai.querySelector(".data");
  const diaSem = pai.querySelector(".dia_semana");
  const nDias = document.querySelector(".dias");

  hora.style.fontSize = `${quadro.clientWidth * 0.44}px`;
  data.style.fontSize = `${quadro.clientWidth * 0.14}px`;
  diaSem.style.fontSize = `${quadro.clientWidth * 0.1}px`;
  nDias.style.fontSize = `${quadro.clientWidth * 0.42}px`;

  const agora = new Date();

  // DATA
  const options = { day: "2-digit", month: "2-digit" };
  document.getElementById("dataAtual").textContent = agora.toLocaleDateString("pt-BR", options);

  // DIA SEMANA

  const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  const hoje = new Date();

  const numeroDia = hoje.getDay();
  document.getElementById("dia_semana").textContent = diasDaSemana[numeroDia].toUpperCase();

  // HORA

  document.getElementById("hh").textContent = String(agora.getHours()).padStart(2, "0");

  document.getElementById("mm").textContent = String(agora.getMinutes()).padStart(2, "0");

  document.getElementById("sep").style.opacity = agora.getSeconds() % 2 === 0 ? "1" : "0";

  // DIAS CORRIDOS
  const diferenca = agora.getTime() - DATA_INICIAL.getTime();
  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  if (dias % 100 === 0 && agora.getHours() % 6 === 0 && agora.getMinutes() === 0 && agora.getSeconds() === 0) {
    runConfetti();
  }
  document.getElementById("dias").textContent = dias.toLocaleString("pt-BR") + " DIAS";
}

atualizarPainel();

setInterval(atualizarPainel, 1000);

setInterval(checarNovoDeploy, 300000);

// Armazena a versão inicial da página (ETag ou data de modificação)
let hashAtual = null;

async function checarNovoDeploy() {
  try {
    // Faz uma requisição rápida apenas no cabeçalho da página para evitar consumo de dados
    const local = "https://127.0.0.1:8080/";
    const production = "https://proseg-nine.vercel.app/v2.html";

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
