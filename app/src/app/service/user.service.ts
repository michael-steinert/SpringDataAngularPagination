import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly serverUrl: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  // Procedural Approach
  getUsers(
    name: string = '',
    page: number = 0,
    size: number = 10
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.serverUrl}/users?name=${name}&page=${page}&size=${size}`
    );
  }

  // Reactive Approach
  users$ = (
    name: string = '',
    page: number = 0,
    size: number = 10
  ): Observable<any> => {
    return this.httpClient.get<any>(
      `${this.serverUrl}/users?name=${name}&page=${page}&size=${size}`
    );
  }
}
