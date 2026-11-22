const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const opcoesEl = document.getElementById("opcoes");
const btnReiniciar = document.getElementById("btn-reiniciar");

let estado = "MENU";
let pontos = 0;
let vidas = 3;
let perguntaAtual = null;
let respondido = false;
const imagensCarregadas = {};

const paises = [
  { pais: "Brasil", codigo: "br", continente: "América", parecidos: ["Argentina", "Uruguai", "Colômbia"] },
  { pais: "Argentina", codigo: "ar", continente: "América", parecidos: ["Uruguai", "Brasil", "Chile"] },
  { pais: "Uruguai", codigo: "uy", continente: "América", parecidos: ["Argentina", "Brasil", "Paraguai"] },
  { pais: "Paraguai", codigo: "py", continente: "América", parecidos: ["Croácia", "Países Baixos", "Uruguai"] },
  { pais: "Colômbia", codigo: "co", continente: "América", parecidos: ["Equador", "Venezuela", "Brasil"] },
  { pais: "Equador", codigo: "ec", continente: "América", parecidos: ["Colômbia", "Venezuela", "Peru"] },
  { pais: "Venezuela", codigo: "ve", continente: "América", parecidos: ["Colômbia", "Equador", "Brasil"] },
  { pais: "Chile", codigo: "cl", continente: "América", parecidos: ["Estados Unidos", "Argentina", "Uruguai"] },
  { pais: "Peru", codigo: "pe", continente: "América", parecidos: ["Canadá", "Áustria", "Equador"] },
  { pais: "Canadá", codigo: "ca", continente: "América", parecidos: ["Peru", "Estados Unidos", "México"] },
  { pais: "Estados Unidos", codigo: "us", continente: "América", parecidos: ["Libéria", "Chile", "Canadá"] },
  { pais: "México", codigo: "mx", continente: "América", parecidos: ["Itália", "Irlanda", "Canadá"] },
  { pais: "Cuba", codigo: "cu", continente: "América", parecidos: ["Porto Rico", "Estados Unidos", "Chile"] },
  { pais: "Costa Rica", codigo: "cr", continente: "América", parecidos: ["Tailândia", "Panamá", "Cuba"] },
  { pais: "Panamá", codigo: "pa", continente: "América", parecidos: ["Costa Rica", "Estados Unidos", "Cuba"] },
  { pais: "Bolívia", codigo: "bo", continente: "América", parecidos: ["Gana", "Etiópia", "Colômbia"] },
  { pais: "Honduras", codigo: "hn", continente: "América", parecidos: ["Argentina", "Nicarágua", "El Salvador"] },
  { pais: "Nicarágua", codigo: "ni", continente: "América", parecidos: ["Honduras", "El Salvador", "Argentina"] },

  { pais: "Romênia", codigo: "ro", continente: "Europa", parecidos: ["Chade", "Moldávia", "Andorra"] },
  { pais: "Moldávia", codigo: "md", continente: "Europa", parecidos: ["Romênia", "Andorra", "Chade"] },
  { pais: "Andorra", codigo: "ad", continente: "Europa", parecidos: ["Moldávia", "Romênia", "Chade"] },
  { pais: "Noruega", codigo: "no", continente: "Europa", parecidos: ["Islândia", "Suécia", "Dinamarca"] },
  { pais: "Islândia", codigo: "is", continente: "Europa", parecidos: ["Noruega", "Suécia", "Finlândia"] },
  { pais: "Suécia", codigo: "se", continente: "Europa", parecidos: ["Finlândia", "Noruega", "Dinamarca"] },
  { pais: "Finlândia", codigo: "fi", continente: "Europa", parecidos: ["Suécia", "Noruega", "Islândia"] },
  { pais: "Dinamarca", codigo: "dk", continente: "Europa", parecidos: ["Suíça", "Suécia", "Noruega"] },
  { pais: "Suíça", codigo: "ch", continente: "Europa", parecidos: ["Dinamarca", "Áustria", "Polônia"] },
  { pais: "Áustria", codigo: "at", continente: "Europa", parecidos: ["Peru", "Letônia", "Polônia"] },
  { pais: "Polônia", codigo: "pl", continente: "Europa", parecidos: ["Indonésia", "Mônaco", "Áustria"] },
  { pais: "Mônaco", codigo: "mc", continente: "Europa", parecidos: ["Indonésia", "Polônia", "Áustria"] },
  { pais: "Irlanda", codigo: "ie", continente: "Europa", parecidos: ["Costa do Marfim", "Itália", "México"] },
  { pais: "Itália", codigo: "it", continente: "Europa", parecidos: ["México", "Irlanda", "Hungria"] },
  { pais: "Hungria", codigo: "hu", continente: "Europa", parecidos: ["Bulgária", "Itália", "Irã"] },
  { pais: "Bulgária", codigo: "bg", continente: "Europa", parecidos: ["Hungria", "Rússia", "Sérvia"] },
  { pais: "Países Baixos", codigo: "nl", continente: "Europa", parecidos: ["Luxemburgo", "França", "Rússia"] },
  { pais: "Luxemburgo", codigo: "lu", continente: "Europa", parecidos: ["Países Baixos", "Rússia", "França"] },

  { pais: "Japão", codigo: "jp", continente: "Ásia", parecidos: ["Palau", "Bangladesh", "Coreia do Sul"] },
  { pais: "Bangladesh", codigo: "bd", continente: "Ásia", parecidos: ["Japão", "Palau", "Índia"] },
  { pais: "Coreia do Sul", codigo: "kr", continente: "Ásia", parecidos: ["Japão", "Mongólia", "Taiwan"] },
  { pais: "China", codigo: "cn", continente: "Ásia", parecidos: ["Vietnã", "Coreia do Norte", "Mongólia"] },
  { pais: "Vietnã", codigo: "vn", continente: "Ásia", parecidos: ["China", "Marrocos", "Tailândia"] },
  { pais: "Indonésia", codigo: "id", continente: "Ásia", parecidos: ["Mônaco", "Polônia", "Singapura"] },
  { pais: "Singapura", codigo: "sg", continente: "Ásia", parecidos: ["Indonésia", "Polônia", "Malásia"] },
  { pais: "Índia", codigo: "in", continente: "Ásia", parecidos: ["Níger", "Irlanda", "Irã"] },
  { pais: "Irã", codigo: "ir", continente: "Ásia", parecidos: ["Tadjiquistão", "Hungria", "Índia"] },
  { pais: "Tadjiquistão", codigo: "tj", continente: "Ásia", parecidos: ["Irã", "Hungria", "Uzbequistão"] },
  { pais: "Tailândia", codigo: "th", continente: "Ásia", parecidos: ["Costa Rica", "Coreia do Sul", "Vietnã"] },
  { pais: "Turquia", codigo: "tr", continente: "Ásia", parecidos: ["Tunísia", "Paquistão", "Azerbaijão"] },
  { pais: "Paquistão", codigo: "pk", continente: "Ásia", parecidos: ["Turquia", "Arábia Saudita", "Azerbaijão"] },
  { pais: "Arábia Saudita", codigo: "sa", continente: "Ásia", parecidos: ["Paquistão", "Turquia", "Emirados Árabes Unidos"] },
  { pais: "Emirados Árabes Unidos", codigo: "ae", continente: "Ásia", parecidos: ["Jordânia", "Palestina", "Kuwait"] },
  { pais: "Jordânia", codigo: "jo", continente: "Ásia", parecidos: ["Palestina", "Emirados Árabes Unidos", "Kuwait"] },
  { pais: "Catar", codigo: "qa", continente: "Ásia", parecidos: ["Bahrein", "Emirados Árabes Unidos", "Jordânia"] },
  { pais: "Filipinas", codigo: "ph", continente: "Ásia", parecidos: ["República Tcheca", "Cuba", "Tailândia"] },

  { pais: "Chade", codigo: "td", continente: "África", parecidos: ["Romênia", "Moldávia", "Andorra"] },
  { pais: "Mali", codigo: "ml", continente: "África", parecidos: ["Guiné", "Camarões", "Senegal"] },
  { pais: "Guiné", codigo: "gn", continente: "África", parecidos: ["Mali", "Camarões", "Senegal"] },
  { pais: "Camarões", codigo: "cm", continente: "África", parecidos: ["Senegal", "Mali", "Guiné"] },
  { pais: "Senegal", codigo: "sn", continente: "África", parecidos: ["Camarões", "Mali", "Guiné"] },
  { pais: "Costa do Marfim", codigo: "ci", continente: "África", parecidos: ["Irlanda", "Nigéria", "Gana"] },
  { pais: "Nigéria", codigo: "ng", continente: "África", parecidos: ["Costa do Marfim", "Irlanda", "Gana"] },
  { pais: "Gana", codigo: "gh", continente: "África", parecidos: ["Bolívia", "Etiópia", "Senegal"] },
  { pais: "Etiópia", codigo: "et", continente: "África", parecidos: ["Gana", "Bolívia", "Zâmbia"] },
  { pais: "Egito", codigo: "eg", continente: "África", parecidos: ["Síria", "Iraque", "Iêmen"] },
  { pais: "Marrocos", codigo: "ma", continente: "África", parecidos: ["Vietnã", "China", "Tunísia"] },
  { pais: "Tunísia", codigo: "tn", continente: "África", parecidos: ["Turquia", "Marrocos", "Argélia"] },
  { pais: "Argélia", codigo: "dz", continente: "África", parecidos: ["Tunísia", "Turquia", "Marrocos"] },
  { pais: "África do Sul", codigo: "za", continente: "África", parecidos: ["Quênia", "Namíbia", "Zimbábue"] },
  { pais: "Quênia", codigo: "ke", continente: "África", parecidos: ["África do Sul", "Sudão do Sul", "Uganda"] },
  { pais: "Níger", codigo: "ne", continente: "África", parecidos: ["Índia", "Costa do Marfim", "Irlanda"] },
  { pais: "Burkina Faso", codigo: "bf", continente: "África", parecidos: ["Gana", "Camarões", "Mali"] },
  { pais: "Libéria", codigo: "lr", continente: "África", parecidos: ["Estados Unidos", "Malásia", "Togo"] },

  { pais: "Austrália", codigo: "au", continente: "Oceania", parecidos: ["Nova Zelândia", "Tuvalu", "Fiji"] },
  { pais: "Nova Zelândia", codigo: "nz", continente: "Oceania", parecidos: ["Austrália", "Tuvalu", "Fiji"] },
  { pais: "Tuvalu", codigo: "tv", continente: "Oceania", parecidos: ["Austrália", "Nova Zelândia", "Fiji"] },
  { pais: "Fiji", codigo: "fj", continente: "Oceania", parecidos: ["Austrália", "Nova Zelândia", "Tuvalu"] },
  { pais: "Papua-Nova Guiné", codigo: "pg", continente: "Oceania", parecidos: ["Ilhas Salomão", "Vanuatu", "Austrália"] },
  { pais: "Ilhas Salomão", codigo: "sb", continente: "Oceania", parecidos: ["Papua-Nova Guiné", "Vanuatu", "Nauru"] },
  { pais: "Vanuatu", codigo: "vu", continente: "Oceania", parecidos: ["Papua-Nova Guiné", "Ilhas Salomão", "Samoa"] },
  { pais: "Samoa", codigo: "ws", continente: "Oceania", parecidos: ["Taiwan", "Vanuatu", "Tonga"] },
  { pais: "Tonga", codigo: "to", continente: "Oceania", parecidos: ["Samoa", "Vanuatu", "Nauru"] },
  { pais: "Palau", codigo: "pw", continente: "Oceania", parecidos: ["Japão", "Bangladesh", "Nauru"] },
  { pais: "Nauru", codigo: "nr", continente: "Oceania", parecidos: ["Palau", "Kiribati", "Ilhas Salomão"] },
  { pais: "Kiribati", codigo: "ki", continente: "Oceania", parecidos: ["Nauru", "Fiji", "Ilhas Marshall"] },
  { pais: "Ilhas Marshall", codigo: "mh", continente: "Oceania", parecidos: ["Micronésia", "Kiribati", "Palau"] },
  { pais: "Micronésia", codigo: "fm", continente: "Oceania", parecidos: ["Ilhas Marshall", "Palau", "Fiji"] },
  { pais: "Ilhas Cook", codigo: "ck", continente: "Oceania", parecidos: ["Nova Zelândia", "Austrália", "Niue"] },
  { pais: "Niue", codigo: "nu", continente: "Oceania", parecidos: ["Ilhas Cook", "Nova Zelândia", "Austrália"] },
  { pais: "Samoa Americana", codigo: "as", continente: "Oceania", parecidos: ["Estados Unidos", "Samoa", "Fiji"] },
  { pais: "Guam", codigo: "gu", continente: "Oceania", parecidos: ["Estados Unidos", "Micronésia", "Palau"] }
];

function obterUrlBandeira(codigo) {
  return `https://flagcdn.com/w320/${codigo}.png`;
}

function carregarImagem(item) {
  const url = obterUrlBandeira(item.codigo);
  if (imagensCarregadas[item.codigo]) return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    imagensCarregadas[item.codigo] = img;
  };
  img.src = url;
}

function carregarTodasImagens() {
  paises.forEach((item) => carregarImagem(item));
}

function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function gerarOpcoesParecidas(candidato) {
  const nomesDisponiveis = new Set(paises.map((p) => p.pais));
  const escolhidasErradas = [];

  const parecidosValidos = embaralhar(
    (candidato.parecidos || []).filter(
      (nome) => nome !== candidato.pais && nomesDisponiveis.has(nome)
    )
  );

  for (const nome of parecidosValidos) {
    if (escolhidasErradas.length >= 3) break;
    if (!escolhidasErradas.includes(nome)) {
      escolhidasErradas.push(nome);
    }
  }

  if (escolhidasErradas.length < 3) {
    const mesmoContinente = embaralhar(
      paises.filter(
        (p) =>
          p.continente === candidato.continente &&
          p.pais !== candidato.pais &&
          !escolhidasErradas.includes(p.pais)
      )
    );

    for (const item of mesmoContinente) {
      if (escolhidasErradas.length >= 3) break;
      escolhidasErradas.push(item.pais);
    }
  }

  if (escolhidasErradas.length < 3) {
    const outros = embaralhar(
      paises.filter(
        (p) =>
          p.pais !== candidato.pais && !escolhidasErradas.includes(p.pais)
      )
    );

    for (const item of outros) {
      if (escolhidasErradas.length >= 3) break;
      escolhidasErradas.push(item.pais);
    }
  }

  return embaralhar([candidato.pais, ...escolhidasErradas]);
}

function sortearPergunta() {
  let candidato = paises[Math.floor(Math.random() * paises.length)];
  if (perguntaAtual && paises.length > 1) {
    while (candidato.pais === perguntaAtual.pais) {
      candidato = paises[Math.floor(Math.random() * paises.length)];
    }
  }

  carregarImagem(candidato);
  const opcoes = gerarOpcoesParecidas(candidato);

  perguntaAtual = {
    pais: candidato.pais,
    codigo: candidato.codigo,
    continente: candidato.continente,
    opcoes
  };

  respondido = false;
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
  if (estado !== "JOGANDO" || respondido || !perguntaAtual) return;
  respondido = true;

  const botoes = opcoesEl.querySelectorAll("button");
  botoes.forEach((btn) => {
    btn.disabled = true;
  });

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
    return;
  }

  sortearPergunta();
}

function iniciarJogo() {
  pontos = 0;
  vidas = 3;
  perguntaAtual = null;
  respondido = false;
  estado = "JOGANDO";
  btnReiniciar.style.display = "none";
  sortearPergunta();
}

function desenharBandeiraNoCanvas(codigo) {
  const x = 180;
  const y = 78;
  const w = 240;
  const h = 150;

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  const img = imagensCarregadas[codigo];
  if (img) {
    ctx.drawImage(img, x, y, w, h);
  } else {
    ctx.fillStyle = "#64748b";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Carregando bandeira...", x + w / 2, y + h / 2);
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

  ctx.textAlign = "center";
  if (perguntaAtual) {
    ctx.font = "bold 15px Arial";
    ctx.fillStyle = "#334155";
    ctx.fillText(`Continente: ${perguntaAtual.continente}`, canvas.width / 2, 34);
  }

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 18px Arial";
  ctx.textAlign = "right";
  ctx.fillText(`Vidas: ${vidas}`, canvas.width - 20, 34);

  if (perguntaAtual) {
    desenharBandeiraNoCanvas(perguntaAtual.codigo);
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

carregarTodasImagens();
loop();