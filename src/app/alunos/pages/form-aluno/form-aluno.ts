import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlunosService } from '../../services/alunos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-form-aluno',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './form-aluno.html',
  styleUrl: './form-aluno.scss',
})
export class FormAluno implements OnInit {
  formulario!: FormGroup;
  id?: string;
  modoEdicao = false;

  constructor(
    private fb: FormBuilder,
    private service: AlunosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      curso: ['', Validators.required],
      status: ['Ativo', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = idParam;
      this.modoEdicao = true;
      this.service.getAluno(this.id).subscribe({
        next: (aluno) => {
          this.formulario.patchValue(aluno);
        },
        error: () => {
          alert('Aluno não encontrado');
          this.voltar();
        }
      });
    }
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.value;

    if (this.modoEdicao && this.id) {
      // EDITAR → ENVIA ID
      const { id, ...dadosSemId } = dados;
      this.service.updateAluno(this.id, dadosSemId).subscribe(() => this.voltar());
    } else {
      // CRIAR → NÃO ENVIA ID
      this.service.createAluno(dados).subscribe(() => this.voltar());
    }
  }

  voltar(): void {
    this.router.navigate(['/alunos']);
  }
}