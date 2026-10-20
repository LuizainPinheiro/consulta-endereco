const inputCep = document.getElementById("cep");
const inputLogradouro = document.getElementById("logradouro");
const inputBairro = document.getElementById("bairro");
const inputCidade = document.getElementById("cidade");
const inputUf = document.getElementById("uf");
const mensagemErro = document.getElementById("mensagem-erro");

async function procurarCep() {
    mensagemErro.textContent = "";
    inputLogradouro.value = "";
    inputBairro.value = "";
    inputCidade.value = "";
    inputUf.value = "";

    const cep = inputCep.value.replace("-", "").trim();

    if (cep === "") return;

    if (cep.length !== 8) {
        mensagemErro.textContent = "O CEP deve ter 8 números!";
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            mensagemErro.textContent = "CEP não encontrado!";
            return;
        }

        inputLogradouro.value = dados.logradouro;
        inputBairro.value = dados.bairro;
        inputCidade.value = dados.localidade;
        inputUf.value = dados.uf;

    } catch (erro) {
        mensagemErro.textContent = "Erro ao consultar o CEP!";
    }
}

inputCep.addEventListener("mouseleave", procurarCep);