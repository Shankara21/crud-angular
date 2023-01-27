import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from '../Models/Book.models';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private baseUrl = 'http://localhost:3000'

  constructor(private HttpCLient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  getAllBooks() {
    return this.HttpCLient.get(this.baseUrl + '/books').pipe(
      catchError(this.errorHttpHandler)
    )
  }
  countByStatus() {
    return this.HttpCLient.get(this.baseUrl + '/books/countByStatus').pipe(
      catchError(this.errorHttpHandler)
    )
  }
  countByCategory() {
    return this.HttpCLient.get(this.baseUrl + '/books/countByCategory').pipe(
      catchError(this.errorHttpHandler)
    )
  }

  errorHttpHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error ${error.error.message}`
    }
    else {
      errorMessage = `Error code : ${error.status}\n${error.message}`
    }
    return throwError(errorMessage)
  }
}
