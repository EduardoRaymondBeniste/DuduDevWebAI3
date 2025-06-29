const express = require("express");
const app = express();
const path = require("path");

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

// Simula os dados da cidade de Londres (como se fossem de um banco JSON)
const weatherData = {
    coord: { lon: -0.13, lat: 51.51 },
    weather: [
        {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
        }
    ],
    main: {
        temp: 21.79,
        feels_like: 21.67,
        temp_min: 20.65,
        temp_max: 22.9,
        pressure: 1021,
        humidity: 63
    },
    name: "London"
};

// Serve a página do formulário
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Recebe o formulário e mostra os dados da cidade
app.post("/", (req, res) => {
    console.log("Dados enviados com sucesso");

    const temperatura = weatherData.main.temp;
    const descricao = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const nomeCidade = weatherData.name;
    const imgURL = `https://openweathermap.org/img/wn/${icon}.png`;

    res.send(`
        <h1>Dados enviados com sucesso!</h1>
        <h2>Cidade: ${nomeCidade}</h2>
        <p>Temperatura: ${temperatura} °C</p>
        <p>Descrição: ${descricao}</p>
        <img src="${imgURL}" alt="Ícone do clima">
    `);
});

// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
