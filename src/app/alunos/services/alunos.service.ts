import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  private apiUrl = 'http://localhost:3000/alunos';

  constructor(private http: HttpClient) { }


  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  getAluno(id: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  updateAluno(id: string, aluno: Partial<Aluno>): Observable<Aluno> {
    const { id: _, ...dados } = aluno;
    return this.http.put<Aluno>(`${this.apiUrl}/${id}`, dados);
  }

  deleteAluno(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private contador = 0;

  createAluno(aluno: Omit<Aluno, 'id'>): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

}
