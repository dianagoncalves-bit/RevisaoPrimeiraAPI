SHOW DATABASES;

CREATE DATABASE turmads1b;

CREATE TABLE alunos(
	id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(100) NOT NULL, 
	curso VARCHAR(100) NOT NULL
)

SHOW TABLES;

SELECT * FROM alunos;

INSERT INTO alunos (nome, curso)
VALUES ('selwyn', 'Ser o mais lindo e perfeito perssonagem que o mundo já presenciou e nunca podera negar ou esquecer'),
       ('Wriothesley', 'box mais bonito que eu já vi'),
       ('zoro',  'espadachim mais lindo e leal'),
       ('valechaz', 'piadas mais engraçadas e salva clima do livro');
       
SELECT * FROM alunos;