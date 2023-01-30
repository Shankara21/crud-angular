import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from '../Models/Book.models';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private baseUrl = 'http://localhost:3000'
  private baseUrl2 = 'http://localhost:3001'

  constructor(private HttpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllBooks() {
    return this.HttpClient.get(this.baseUrl + '/books').pipe(
      catchError(this.errorHttpHandler)
    )
  }
  countByStatus() {
    return this.HttpClient.get(this.baseUrl + '/books/countByStatus').pipe(
      catchError(this.errorHttpHandler)
    )
  }
  countByCategory() {
    return this.HttpClient.get(this.baseUrl + '/books/countByCategory').pipe(
      catchError(this.errorHttpHandler)
    )
  }

  getCategory() {
    return this.HttpClient.get(this.baseUrl + '/categories').pipe(
      catchError(this.errorHttpHandler))
  }


  filterIncomeByMonth(month: any) {
    return this.HttpClient.post(this.baseUrl2 + '/users/filterIncomeByMonth', {month:month}).pipe(
      catchError(this.errorHttpHandler)
    )
  }
  testingIncome() {
    return this.HttpClient.get(this.baseUrl2 + '/users/testIncome', this.httpOptions).pipe(
      catchError(this.errorHttpHandler))
  }
  countIncomeByMOnth() {
    return this.HttpClient.get(this.baseUrl2 + '/users/countIncome', this.httpOptions).pipe(
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
