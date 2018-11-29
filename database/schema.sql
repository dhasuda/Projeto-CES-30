CREATE TABLE professor (
	id_professor int not null identity,
	nome varchar(200) not null,
	usuario varchar(200) not null,
	senha varchar(200) not null,
	
    PRIMARY KEY (id_professor)
);

CREATE TABLE unidade (
	id_unidade int not null identity,
	nome varchar(200) not null,
	
    PRIMARY KEY (id_unidade)
);

CREATE TABLE unidade_professor (
	id_unidade int not null,
	id_professor int not null,
	preferencial bit,

	PRIMARY KEY (id_unidade, id_professor),
	FOREIGN KEY (id_unidade) REFERENCES unidade (id_unidade),
	FOREIGN KEY (id_professor) REFERENCES professor (id_professor)
);

CREATE TABLE corretor (
	id_corretor int not null identity,
	nome varchar(200) not null,
	usuario varchar(200) not null,
	senha varchar(200) not null,
	
    PRIMARY KEY (id_corretor)
);

CREATE TABLE corretor_interno (
	rm_corretor int not null,
	
	id_corretor int not null,
	
    PRIMARY KEY (id_corretor),
    FOREIGN KEY (id_corretor) REFERENCES corretor (id_corretor)
);

CREATE TABLE corretor_externo (
	email varchar(200) not null,
	
	id_corretor int not null,
	
    PRIMARY KEY (id_corretor),
    FOREIGN KEY (id_corretor) REFERENCES corretor (id_corretor)
);

CREATE TABLE unidade_corretor (
	id_unidade int not null,
	id_corretor int not null,

	PRIMARY KEY (id_unidade, id_corretor),
	FOREIGN KEY (id_unidade) REFERENCES unidade (id_unidade),
	FOREIGN KEY (id_corretor) REFERENCES corretor (id_corretor)
);

CREATE TABLE aluno (
	id_aluno int not null identity,
	nome varchar(200) not null,
	usuario varchar(200) not null,
	senha varchar(200) not null,
	turma varchar(20) not null,
	ativo bit not null,
	
	id_unidade int not null,

    PRIMARY KEY (id_aluno),
    FOREIGN KEY (id_unidade) REFERENCES unidade (id_unidade)
);

CREATE TABLE categoria_prova (
    id_categoria int not null identity,
    nome varchar(50) not null,
	arquivo varchar(200) not null,
	json_template nvarchar(max),
	
    PRIMARY KEY (id_categoria)
);

CREATE TABLE criterio (
    id_criterio int not null identity,
    nome varchar(max) not null,
	descricao varchar(max) not null,
	nota_total float not null,
	passo float not null,
	
	id_categoria int not null,
	
    PRIMARY KEY (id_criterio),
    FOREIGN KEY (id_categoria) REFERENCES categoria_prova (id_categoria)
);

CREATE TABLE restricao_criterio (
    id_restricao int not null identity,
	se_condicao varchar(20) not null,
	se_valor float not null,
	entao_condicao varchar(20) not null,
	entao_valor float not null,
	
    se_criterio int not null,
    entao_criterio int not null,
	
	id_categoria int not null,
	
    PRIMARY KEY (id_restricao),
    FOREIGN KEY (id_categoria) REFERENCES categoria_prova (id_categoria),
    FOREIGN KEY (se_criterio) REFERENCES criterio (id_criterio),
    FOREIGN KEY (entao_criterio) REFERENCES criterio (id_criterio)
);

CREATE TABLE proposta (
    id_proposta int not null identity,
    nome varchar(500) not null,
    arquivo varchar(200) not null,
	rm_coordenador int,
	
    PRIMARY KEY (id_proposta)
);

CREATE TABLE prova (
    id_prova int not null identity,
    estado varchar(20) not null,
	datahora_criacao datetime not null,
    datahora_submissao datetime,
	datahora_validade datetime not null,
	arquivo varchar(200) not null,
	pacote varchar(200) not null,
	semana varchar(200) not null,
	dados_correcao nvarchar(max),
	avaliacao_nota float,
	avaliacao_descricao varchar(500),
	
	id_aluno int not null,
	id_professor int not null,
	id_categoria int not null,
	id_proposta int not null,
	
    PRIMARY KEY (id_prova),
    FOREIGN KEY (id_aluno) REFERENCES aluno (id_aluno),
    FOREIGN KEY (id_professor) REFERENCES professor (id_professor),
    FOREIGN KEY (id_categoria) REFERENCES categoria_prova (id_categoria),
	FOREIGN KEY (id_proposta) REFERENCES proposta (id_proposta)
);

CREATE TABLE atribuicao (
	datahora_atribuicao datetime not null,
	datahora_correcao datetime,
	datahora_validade datetime,
	
	id_prova int not null,
	id_corretor int,
	id_professor int,
	professor_atribuidor int not null,
	
	PRIMARY KEY (datahora_atribuicao, id_prova),
	FOREIGN KEY (id_prova) REFERENCES prova (id_prova),
	FOREIGN KEY (id_corretor) REFERENCES corretor (id_corretor),
	FOREIGN KEY (id_professor) REFERENCES professor (id_professor),
	FOREIGN KEY (professor_atribuidor) REFERENCES professor (id_professor)
);

CREATE TABLE comentario (
	id_comentario int not null identity,
	id_entidade int not null,
    datahora_comentario datetime not null,
	corpo nvarchar(max),
	audio varchar(200),
	final bit not null,
	
	id_prova int not null,
	id_corretor int,
	id_professor int,
	
    PRIMARY KEY (id_comentario),
    FOREIGN KEY (id_prova) REFERENCES prova (id_prova),
    FOREIGN KEY (id_corretor) REFERENCES corretor (id_corretor),
    FOREIGN KEY (id_professor) REFERENCES professor (id_professor)
);

CREATE TABLE resultado_criterio (
	notaparcial float not null,
    datahora_comentario datetime not null,
	corpo nvarchar(max),
	
	id_criterio int not null,
	id_prova int not null,
	
    PRIMARY KEY (id_criterio, id_prova),
    FOREIGN KEY (id_criterio) REFERENCES criterio (id_criterio),
    FOREIGN KEY (id_prova) REFERENCES prova (id_prova)
);

CREATE TABLE comentario_padrao (
	id_comentario_padrao int not null identity,
	titulo varchar(50) not null,
	corpo nvarchar(max),
	audio varchar(200),
	
	id_professor int not null,
	
    PRIMARY KEY (id_comentario_padrao),
    FOREIGN KEY (id_professor) REFERENCES professor (id_professor)
);

CREATE TABLE comentario_individual (
	id_comentario_individual int not null identity,
	titulo varchar(50) not null,
	corpo nvarchar(max),
	audio varchar(200),
	
	id_corretor int not null,
	
    PRIMARY KEY (id_comentario_individual),
    FOREIGN KEY (id_corretor) REFERENCES corretor (id_corretor)
);

CREATE TABLE config (
	id_corretor INT NOT NULL,
	json_config VARCHAR(500)
);

CREATE TABLE usuarios_online (
	id INT NOT NULL,
	tipo VARCHAR(20) not null,

	PRIMARY KEY (id, tipo)
);

CREATE TABLE meta_corretor (
	id_meta int not null identity,
	id_corretor INT NOT NULL,
	quantidade INT NOT NULL,
	datahora_inicio datetime not null,
	datahora_fim datetime not null,
	id_professor int not null,

	PRIMARY KEY (id_meta),
	FOREIGN KEY (id_corretor) REFERENCES corretor (id_corretor),
    FOREIGN KEY (id_professor) REFERENCES professor (id_professor)
);

CREATE TABLE prova_teste (
    id_prova int not null,
	id_prova_original int not null,
	
    PRIMARY KEY (id_prova),
    FOREIGN KEY (id_prova) REFERENCES prova (id_prova),
	FOREIGN KEY (id_prova_original) REFERENCES prova (id_prova)
);