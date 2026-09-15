const express = require("express");
const cors = require("cors");
const conexao = require("./db.js");

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



app.get("/alunos", async (req, res) => {
    try {
        const [resultado] = await conexao.query("SELECT * FROM alunos");
        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensagem: "ERRO ao buscar alunos"
        })
    };
})

app.get("/alunos/:id", async (req, res) => {

    try {
        const id = Number(req.params.id);
        const [resultado] = await conexao.query(`SELECT * FROM alunos where id =${id}`)
        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensagem: "ERRO ao buscar alunos"
        })
    };

    // const aluno = ALUNOS.find(a => a.id === id);

    // if (!aluno) {
    //     return res.status(404).json({
    //         mensagem: "aluno não encontrado"
    //     })
    // }

    // res.status(200).json(aluno);
})

app.post("/alunos/cadastrar", async (req, res) => {
    const { nome, curso } = req.body;



  const sql =  `INSERT INTO alunos (nome, curso) VALUES (${nome}, ${curso}) `;
  
//   const [resultado] = await conexao.query(`INSERT INTO alunos (nome, curso) VALUES (?, ?)`, [nome, curso]);
//   const [resultado] = await conexao.query(`INSERT INTO alunos (nome, curso) VALUES (${nome}, ${curso})`);
  const [resultado] = await conexao.query(sql);

  res.status(201).json({
    id: resultado.insertId,
    nome,
    curso
  });
});

app.put("/alunos/:id", (req, res) => {
    const id = Number(req.params.id)
    const { nome, curso } = req.body;

    const indice = ALUNOS.findIndex(aluno => aluno.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    if (!nome || !curso) {
        return res.status(400).json({
            mensagem: "Nome e curso são obrigatorios"
        })
    }

    ALUNOS[indice] = {
        id: id,
        nome: nome,
        curso: curso
    };

    res.status(200).json({
        mensagem: "Aluno atualizado com sucesso",
        aluno: ALUNOS[indice]
    })


})

const PORTA = 3000;

app.listen(PORTA, () => {
    console.log(`servidor iniciado com sucesso`);
    console.log(`http://localhost:${`${PORTA}`}`)
})