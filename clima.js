// clima.js

const API_KEY = "4edce22ed0bd2fec8bf656a140503ef3";

// Coordenadas das cidades
const cidades = {
    carapicuiba: { lat: -23.5227, lon: -46.835 },
    osasco:      { lat: -23.5320, lon: -46.7926 },
    barueri:     { lat: -23.5106, lon: -46.8790 }
};

async function carregarClimas() {
    const container = document.getElementById("clima-container");
    container.innerHTML = ""; // limpa o container

    for (const [nome, coords] of Object.entries(cidades)) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}&lang=pt`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro na API");
            
            const data = await response.json();

            const cidade = data.name || nome;
            const tempAtual = data.main.temp.toFixed(1);
            const tempMin = data.main.temp_min.toFixed(1);
            const tempMax = data.main.temp_max.toFixed(1);
            const descricao = data.weather[0].description;

            const card = document.createElement("div");
            card.className = "clima-card";
            card.innerHTML = `
                <h3>${cidade}</h3>
                <p>${descricao}</p>
                <p><b>Atual:</b> ${tempAtual}°C</p>
                <p><b>Máx:</b> ${tempMax}°C | <b>Mín:</b> ${tempMin}°C</p>
            `;
            container.appendChild(card);

        } catch (err) {
            console.error(`Erro ao buscar clima de ${nome}:`, err);
            const card = document.createElement("div");
            card.className = "clima-card";
            card.innerHTML = `<h3>${nome}</h3><p>Erro ao carregar clima</p>`;
            container.appendChild(card);
        }
    }
}

// Chama a função ao carregar a página
carregarClimas();
