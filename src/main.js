import readline from 'readline';
import Aluno from './Aluno.js';

// Criar interface para entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Função para fazer uma pergunta ao usuário
function pergunta(questao) {
    return new Promise((resolve) => {
        rl.question(questao, (resposta) => {
            resolve(resposta);
        });
    });
}

// Função para validar se a nota está no intervalo correto (0-10)
function validarNota(nota) {
    const num = parseFloat(nota);
    return !isNaN(num) && num >= 0 && num <= 10;
}

// Função principal da aplicação
async function calcularMedia() {
    console.log("=== CALCULADORA DE MÉDIA DE NOTAS ===\n");
    
    try {
        const nomeAluno = await pergunta("Digite o nome do aluno: ");
        const aluno = new Aluno(nomeAluno);
        

        // Pedir quantidade de notas
        const qtdNotasStr = await pergunta("Quantas notas você deseja inserir? ");
        const qtdNotas = parseInt(qtdNotasStr);
        
        if (isNaN(qtdNotas) || qtdNotas <= 0) {
            console.log("Por favor, insira um número válido maior que 0.");
            await calcularMedia();
            return;
        }
        
        const notas = [];
        
        // Coletar cada nota
        for (let i = 1; i <= qtdNotas; i++) {
            let notaValida = false;
            
            while (!notaValida) {
                const notaStr = await pergunta(`Digite a ${i}ª nota (0-10): `);
                
                if (validarNota(notaStr)) {
                    aluno.adicionarNota(notaStr);
                    notaValida = true;
                } else {
                    console.log("Nota inválida! Digite um número entre 0 e 10.");
                }
            }
        }
        
        // Calcular a média
        const soma = notas.reduce((acc, nota) => acc + nota, 0);
        const media = soma / qtdNotas;
        
        // Exibir resultados
        console.log("\n=== RESULTADO ===");
        console.log(`Notas inseridas: ${notas.join(', ')}`);
        console.log(`Média: ${media.toFixed(2)}`);
        
        // Determinar situação do aluno
        let situacao;
        if (media >= 7.0) {
            situacao = "APROVADO";
        } else if (media >= 5.0) {
            situacao = "RECUPERAÇÃO";
        } else {
            situacao = "REPROVADO";
        }
        
        console.log(`Situação: ${situacao}\n`);
        
        // Perguntar se deseja calcular outra média
        const continuar = await pergunta("Deseja calcular outra média? (s/n): ");
        if (continuar.toLowerCase() === 's' || continuar.toLowerCase() === 'sim') {
            console.log("\n" + "=".repeat(40) + "\n");
            await calcularMedia();
        } else {
            console.log("Obrigado por usar a calculadora de médias!");
            rl.close();
        }
        
    } catch (error) {
        console.log("Erro:", error.message);
        rl.close();
    }
}

// Iniciar a aplicação
calcularMedia();

