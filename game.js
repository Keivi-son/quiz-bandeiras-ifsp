const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const opcoesEl = document.getElementById("opcoes");
const btnReiniciar = document.getElementById("btn-reiniciar");

let estado = "MENU"; // "MENU", "JOGANDO", "GAMEOVER"
let pontos = 0;
let vidas = 3;
let perguntaAtual = null;

// Exemplo inicial de perguntas (podemos trocar por imagens depois)
const perguntas = [
  {
    pais: "Japão",
    opcoes: ["Japão", "Coreia do Sul", "China", "Tailândia"],
    tipo: "japao"
  },
  {
    pais: "Alemanha",
    opcoes: ["Bélgica", "Alemanha", "Holanda", "Áustria"],
    tipo: "alemanha"
  },
  {
    pais: "França",
    opcoes: ["Itália", "Rússia", "França", "Países Baixos"],
    tipo: "franca"
  }
];

function sortearPergunta() {
  const indice = Math.floor(Math.random() * perguntas.length);
  perguntaAtual = perguntas[indice];
  renderizarBotoes();
}

function renderizarBotoes() {
  opcoesEl.innerHTML = "";
  if (estado !== "JOGANDO" || !perguntaAtual) return;

  perguntaAtual.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.className = "btn-opcao";
    botao.textContent = opcao;
    botao.addEventListener("click", () => verificarResposta(opcao));
    opcoesEl.appendChild(botao);
  });
}

function verificarResposta(escolhida) {
  if (escolhida === perguntaAtual.pais) {
    pontos += 10;
  } else {
    vidas -= 1;
  }

  if (vidas <= 0) {
    vidas = 0;
    estado = "GAMEOVER";
    opcoesEl.innerHTML = "";
    btnReiniciar.style.display = "inline-block";
  } else {
    sortearPergunta();
  }
}

function iniciarJogo() {
  pontos = 0;
  vidas = 3;
  estado = "JOGANDO";
  btnReiniciar.style.display = "none";
  sortearPergunta();
}

function desenharBandeiraNoCanvas(tipo) {
  const x = 180;
  const y = 75;
  const w = 240;
  const h = 150;

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 2;

  if (tipo === "japao") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, 42, 0, Math.PI * 2);
    ctx.fill();
  } else if (tipo === "alemanha") {
    ctx.fillStyle = "#111827";
    ctx.fillRect(x, y, w, h / 3);
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(x, y + h / 3, w, h / 3);
    ctx.fillStyle = "#facc15";
    ctx.fillRect(x, y + (h / 3) * 2, w, h / 3);
    ctx.strokeRect(x, y, w, h);
  } else if (tipo === "franca") {
    ctx.fillStyle = "#1d4ed8";
    ctx.fillRect(x, y, w / 3, h);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + w / 3, y, w / 3, h);
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(x + (w / 3) * 2, y, w / 3, h);
    ctx.strokeRect(x, y, w, h);
  }
}

function desenharMenu() {
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "bold 28px Arial";
  ctx.textAlign = "center";
  ctx.fillText("QUIZ DE BANDEIRAS", canvas.width / 2, 130);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "16px Arial";
  ctx.fillText("Clique no botão verde para começar", canvas.width / 2, 175);

  ctx.fillStyle = "#16a34a";
  ctx.fillRect(canvas.width / 2 - 90, 210, 180, 44);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 16px Arial";
  ctx.fillText("INICIAR", canvas.width / 2, 238);
}

function desenharJogo() {
  ctx.fillStyle = "#f1f5f9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 18px Arial";
  ctx.textAlign = "left";
  ctx.fillText(`Pontos: ${pontos}`, 20, 34);

  ctx.textAlign = "right";
  ctx.fillText(`Vidas: ${vidas}`, canvas.width - 20, 34);

  if (perguntaAtual) {
    desenharBandeiraNoCanvas(perguntaAtual.tipo);
  }
}

function desenharGameOver() {
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ef4444";
  ctx.font = "bold 32px Arial";
  ctx.textAlign = "center";
  ctx.fillText("FIM DE JOGO", canvas.width / 2, 140);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "20px Arial";
  ctx.fillText(`Pontuação final: ${pontos}`, canvas.width / 2, 190);
}

canvas.addEventListener("click", (e) => {
  if (estado !== "MENU") return;

  const rect = canvas.getBoundingClientRect();
  const escalaX = canvas.width / rect.width;
  const escalaY = canvas.height / rect.height;
  const x = (e.clientX - rect.left) * escalaX;
  const y = (e.clientY - rect.top) * escalaY;

  const btnX = canvas.width / 2 - 90;
  const btnY = 210;
  const btnW = 180;
  const btnH = 44;

  if (x >= btnX && x <= btnX + btnW && y >= btnY && y <= btnY + btnH) {
    iniciarJogo();
  }
});

btnReiniciar.addEventListener("click", iniciarJogo);

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (estado === "MENU") {
    desenharMenu();
  } else if (estado === "JOGANDO") {
    desenharJogo();
  } else if (estado === "GAMEOVER") {
    desenharGameOver();
  }

  requestAnimationFrame(loop);
}

loop();