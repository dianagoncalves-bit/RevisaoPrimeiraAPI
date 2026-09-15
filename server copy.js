const express = require("express");
const cors = require("cors");
const { match } = require("node:assert");

const app = express();

app.use(cors());
app.use(express.json());
// {
//     "nome": "demi",
//     "curso": "ser o mais lindo"
// }

let ALUNOS = [
    { id: 1, nome: "Selwyn", curso: "Ser o mais lindo e perfeito perssonagem que o mundo já presenciou e nunca podera negar ou esquecer" },
    { id: 2, nome: "Wriothesley", curso: "box mais bonito que eu já vi" },
    { id: 3, nome: "zoro", curso: "espadachim mais lindo e leal" },
    { id: 4, nome: "valechaz", curso: "piadas mais engraçadas e salva clima do livro" }
]
app.get("/", (req, res) => {
    res.json({
        mensagem: "API alunos funcionando"
    })
})

app.get("/alunos", (req, res) => {
    res.json(ALUNOS);
})

app.get("/alunos/:id", (req, res) => {
    const id = Number(req.params.id);

    const aluno = ALUNOS.find(a => a.id === id);

    if (!aluno) {
        return res.status(404).json({
            mensagem: "aluno não encontrado"
        })
    }

    res.status(200).json(aluno);
})

app.post("/alunos/cadastrar", (req, res) => {
    const { nome, curso } = req.body;

    if (!nome || !curso) {
        return res.status(400).json({ mensagem: "Nome e curso são obrigatorios" });
    }

    const novoId = ALUNOS.length > 0 ? Math.max(...ALUNOS.map(aluno => aluno.id)) + 1 : 1;

    // const novoId = ALUNOS.length > 0 ? ALUNOS[ALUNOS.length - 1].id + 1 : 1;

    const novoAluno = {
        id: novoId,
        nome: nome,
        curso: curso
    };

    ALUNOS.push(novoAluno);

    res.status(201).json({
        mensagem: "Aluno Cadastrado com sucesso"
    })



});

app.put("/alunos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, curso } = req.body;

    const indice = ALUNOS.findIndex(aluno => aluno.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "aluno não encontrado"
        })
    }

    if (!nome || !curso) {
        return res.status(400).json({
            mensagem: "nome e curso são obrigatório"
        })
    }

    ALUNOS[indice] = {
        id: id,
        nome: nome,
        curso: curso
    }

    res.status(200).json({
        mensagem: "aluno atualizado com sucesso",
        aluno: ALUNOS[indice]
    })
})

const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`servidor iniciado com sucesso`);
    console.log(`http://localhost:${`${PORTA}`}`)
})

