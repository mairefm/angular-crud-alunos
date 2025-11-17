import { Routes } from '@angular/router';
import { ListaAlunos } from './alunos/pages/lista-alunos/lista-alunos';
import { FormAluno } from './alunos/pages/form-aluno/form-aluno';

export const routes: Routes = [
    { path: '', redirectTo: 'alunos', pathMatch: 'full' },
    { path: 'alunos', component: ListaAlunos },
    { path: 'alunos/novo', component: FormAluno },
    { path: 'alunos/editar/:id', component: FormAluno },
];
