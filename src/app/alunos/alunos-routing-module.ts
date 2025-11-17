import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlunos } from './pages/lista-alunos/lista-alunos';
import { FormAluno } from './pages/form-aluno/form-aluno';

const routes: Routes = [
  { path: '', component: ListaAlunos },
  { path: 'novo', component: FormAluno },
  { path: 'editar/:id', component: FormAluno }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
