import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';     // ← CORRETO
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AlunosService } from '../../services/alunos.service';
import { Aluno } from '../../models/aluno';

@Component({
  selector: 'app-lista-alunos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,        // ← MÓDULO, não componente!
    MatTooltipModule,
    MatSnackBarModule
  ],
  templateUrl: './lista-alunos.html',
  styleUrl: './lista-alunos.scss'
})
export class ListaAlunos implements OnInit {
  alunos: Aluno[] = [];
  displayedColumns = ['nome', 'email', 'curso', 'status', 'acoes'];

  constructor(
    private alunosService: AlunosService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.alunosService.getAlunos().subscribe({
      next: (data) => this.alunos = data,
      error: (err) => console.error(err)
    });
  }

  excluir(id: string): void {
    if (confirm('Tem certeza que quer excluir este aluno?')) {
      this.alunosService.deleteAluno(id).subscribe({
        next: () => {
          this.alunos = this.alunos.filter(a => a.id !== id);
          this.snackBar.open('Aluno excluído com sucesso!', 'OK', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        },
        error: () => this.snackBar.open('Erro ao excluir aluno', 'OK', {
          duration: 4000,
          panelClass: ['error-snackbar']
        })
      });
    }
  }
}