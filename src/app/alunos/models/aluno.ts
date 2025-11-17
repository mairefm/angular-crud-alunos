export interface Aluno {
    id?: string;
    nome: string;
    email: string;
    curso: string;
    status: 'Ativo' | 'Inativo';
}