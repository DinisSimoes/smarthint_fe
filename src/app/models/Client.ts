export class Client{
    ID!: number;
    nome!: string;
    email!: string;
    telefone!: number;
    tipo!: string;
    cpf!: Number;
    cnpj!: Number;
    inscricaoEstadual!: string;
    bloqueado!: boolean;
    genero!: string | null;
    dataNascimento!: Date | null;
    dataCadastro!: Date;
    senha!: string
}