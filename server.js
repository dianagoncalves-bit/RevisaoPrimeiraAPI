const express = require("express");
const cors = require("cors");
const { match } = require("node:assert");

const app = express();

app.use(cors());
app.use(express.json());
// {
//     "nome": "Selwyn",
//     "curso": "ser o mais lindo mundo"
// }

let ALUNOS = [
    {id: 1, nome: "Selwyn", curso: "Ser o mais lindo e perfeito perssonagem que o mundo já presenciou e nunca podera negar ou esquecer"},
    {id: 2, nome: "Wriothesley", curso:"box mais bonito que eu já vi"},
    {id: 3, nome: "zoro", curso:"espadachim mais lindo e leal"},
    {id: 4, nome: "valechaz", curso:"piadas mais engraçadas e salva clima do livro"}
]

app.get("/", (req, res)=>{
    res.json({
        mensagem: "API alunos funcionando"
    })
})

app.get("/alunos", (req, res)=>{
    res.json(ALUNOS);
})

app.get("/alunos/:id",(req,res)=>{
    const id = Number(req.params.id);

    const aluno = ALUNOS.find(a => a.id === id);

    if(!aluno){
        return res.status(404).json({
            mensagem: "aluno não encontrado"
        })
    }

    res.status(200).json(aluno);
})

app.post("/alunos/cadastrar",(req,res)=>{
    const {nome, curso} = req.body;


    if(!nome || !curso){
        return res.status(400).json({mensagem: "Nome e curso são obrigatorios"})
    }

    const novoId = ALUNOS.length > 0?  match.max(...ALUNOS.map(aluno => aluno.id)) +1 : 1;

    // const novoId = ALUNOS.length > 0 ? ALUNOS[ALUNOS.length - 1].id +1 : 1;

    const novoAluno ={
        id: novoId,
        nome: nome,
        curso: curso
    }

    ALUNOS.push(novoAluno);

    res.status(201).json({
        mensagem: "aluno cadastrado com sucesso"
    })
});

const PORTA = 3000;

app.listen(PORTA,()=>{
    console.log(`servidor iniciado com sucesso`);
    console.log(`http://localhost:${`${PORTA}`}`)
})

