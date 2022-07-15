(function () {
    var _a;
    const selectorId = (id) => document.querySelector(id);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) - 1000);
        return `${min}m e ${sec}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${veiculo.marca}</td>
            <td>${veiculo.placa}</td>
            <td>${veiculo.entrada}</td>
            <td></td>
            <td>
                <button class="delete" data-placa ="${veiculo.placa}">x</button>
            </td>
            `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = selectorId("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { entrada, marca } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            ;
            if (!confirm(`O veículo ${marca} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render();
        }
        function render() {
            selectorId('#patio').innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach((veliculo) => adicionar(veliculo));
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    (_a = selectorId("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const marca = (_a = selectorId("#marca")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = selectorId("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!marca || !placa) {
            alert("Os campos marca e placa são obrigatórios");
            return;
        }
        patio().adicionar({ marca, placa, entrada: new Date().toISOString() }, true);
    });
})();
