export default class Aluno{
    constructor(nome) {
        this.nome = nome;
        this.notas = [];
    }

    adicionarNota(nota) {
        this.notas.push(parseFloat(nota));
        console.log("Nota adicionada com sucesso!");
    }
}