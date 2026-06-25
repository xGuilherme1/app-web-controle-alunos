CREATE DATABASE controle_alunos;
USE controle_alunos;

CREATE TABLE Departamento (
    id_dep INT AUTO_INCREMENT PRIMARY KEY,
    nome_dep VARCHAR(100)
);

CREATE TABLE Professor (
    id_pro INT AUTO_INCREMENT PRIMARY KEY,
    nome_pro VARCHAR(150),
    titulacao_pro VARCHAR(100)
);

CREATE TABLE Evento (
    id_eve INT AUTO_INCREMENT PRIMARY KEY,
    titulo_eve VARCHAR(150),
    data_eve DATE,
    local_eve VARCHAR(150)
);

CREATE TABLE Endereco (
    id_end INT AUTO_INCREMENT PRIMARY KEY,
    logradouro_end VARCHAR(150),
    numero_end VARCHAR(20),
    cidade_end VARCHAR(100),
    estado_end VARCHAR(50)
);

CREATE TABLE Turma (
    id_tur INT AUTO_INCREMENT PRIMARY KEY,
    nome_tur VARCHAR(50),
    ano_tur INT
);

CREATE TABLE Disciplina (
    id_dis INT AUTO_INCREMENT PRIMARY KEY,
    nome_dis VARCHAR(100),
    id_professor_fk INT,
    FOREIGN KEY (id_professor_fk)
        REFERENCES Professor (id_pro)
);

CREATE TABLE Curso (
    id_cur INT AUTO_INCREMENT PRIMARY KEY,
    nome_cur VARCHAR(100),
    carga_horaria_cur INT,
    id_departamento_fk INT,
    FOREIGN KEY (id_departamento_fk)
        REFERENCES Departamento (id_dep)
);

CREATE TABLE Aluno (
    id_alu INT AUTO_INCREMENT PRIMARY KEY,
    nome_alu VARCHAR(150),
    data_nascimento_alu DATE,
    id_curso_fk INT,
    id_turma_fk INT,
    id_endereco_fk INT,
    FOREIGN KEY (id_curso_fk)
        REFERENCES Curso (id_cur),
    FOREIGN KEY (id_turma_fk)
        REFERENCES Turma (id_tur),
    FOREIGN KEY (id_endereco_fk)
        REFERENCES Endereco (id_end)
);

CREATE TABLE Ocorrencia (
    id_oco INT AUTO_INCREMENT PRIMARY KEY,
    tipo_oco VARCHAR(100),
    descricao_oco VARCHAR(500),
    data_oco DATE,
    id_aluno_fk INT,
    FOREIGN KEY (id_aluno_fk)
        REFERENCES Aluno (id_alu)
);

CREATE TABLE AlunoDisciplina (
    alunoId INT NOT NULL,
    disciplinaId INT NOT NULL,
    nota decimal,
    PRIMARY KEY (alunoId, disciplinaId),
    FOREIGN KEY (alunoId) REFERENCES Aluno(id_alu),
    FOREIGN KEY (disciplinaId) REFERENCES Disciplina(id_dis)
);

CREATE TABLE AlunoEvento (
    alunoId INT NOT NULL,
    eventoId INT NOT NULL,
    presenca BOOLEAN,
    PRIMARY KEY (alunoId, eventoId),
    FOREIGN KEY (alunoId) REFERENCES Aluno(id_alu),
    FOREIGN KEY (eventoId) REFERENCES Evento(id_eve)
);