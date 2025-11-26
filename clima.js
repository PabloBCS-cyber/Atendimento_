function carregarClima() {
    const container = document.getElementById("clima-container");

    fetch("https://api.open-meteo.com/v1/forecast?latitude=-23.5227&longitude=-46.8350&current_weather=true")
        .then(r => r.json())
        .then(data => {
            const temp = data.current_weather.temperature;

            container.innerHTML = `
                <hr>
                <p style="font-weight:bold;color:white;font-size:18px">
                    Clima agora: ${temp}°C
                </p>
            `;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "Erro ao carregar clima.";
        });
}

carregarClima();
