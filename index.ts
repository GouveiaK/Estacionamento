interface Veiculo{
    marca: string;
    placa: string;
    entrada: Date | string;
}

(function () {
    const selectorId = (id: string): HTMLInputElement | null => document.querySelector(id);
    function calcTempo(mil: number) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) - 1000);
        return `${min}m e ${sec}s`;
    }
    function patio() {
        function ler(): Veiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos: Veiculo[]) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function adicionar(veiculo: Veiculo, salva?: boolean) {
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
            row.querySelector(".delete")?.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            selectorId("#patio")?.appendChild(row);

            if (salva) salvar([...ler(), veiculo]);
         }
        function remover(placa:string) {
            const { entrada, marca } = ler().find(
                (veiculo) => veiculo.placa === placa
            );
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());;

            if (
                !confirm(`O veículo ${marca} permaneceu por ${tempo}. Deseja encerrar?`)
            )
                return;
                salvar(ler().filter((veiculo) => veiculo.placa !== placa));
                render();
         }
        function render() {
            selectorId('#patio')!.innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach((veliculo) => adicionar(veliculo));
            }
         }
        return{ler, adicionar, remover, salvar, render}
    }


    patio().render();
    selectorId("#cadastrar")?.addEventListener("click", () => {
        const marca = selectorId("#marca")?.value;
        const placa = selectorId("#placa")?.value;
        if (!marca || !placa) {
            alert("Os campos marca e placa são obrigatórios");
            return;
        }
        patio().adicionar({ marca, placa, entrada: new Date().toISOString() }, true);
    });
}) ();