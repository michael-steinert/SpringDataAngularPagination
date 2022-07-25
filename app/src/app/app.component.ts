import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { AppState } from './model/app-state';
import { CustomResponse } from './model/custom-response';
import { Page } from './model/page';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  usersState$: Observable<AppState> | undefined;
  customResponseSubject = new BehaviorSubject<CustomResponse<Page> | null>(
    null
  );
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usersState$ = this.userService.users$().pipe(
      map((customResponse: CustomResponse<Page>) => {
        // Updating Data
        this.customResponseSubject.next(customResponse);
        this.currentPageSubject.next(customResponse.data.page.number);
        return {
          appState: 'APP_LOADED',
          appData: customResponse,
        };
      }),
      startWith({
        appState: 'APP_LOADING',
      }),
      catchError((httpErrorResponse: HttpErrorResponse) => {
        return of({
          appState: 'APP_ERROR',
          error: httpErrorResponse,
        });
      })
    );
  }

  goToPage(name?: string, pageNumber: number = 0): void {
    this.usersState$ = this.userService.users$(name, pageNumber).pipe(
      map((customResponse: CustomResponse<Page>) => {
        // Updating Data
        this.customResponseSubject.next(customResponse);
        this.currentPageSubject.next(pageNumber);
        return {
          appState: 'APP_LOADED',
          appData: customResponse,
        };
      }),
      startWith({
        appState: 'APP_LOADED',
        appData: this.customResponseSubject.value,
      }),
      catchError((httpErrorResponse: HttpErrorResponse) => {
        return of({
          appState: 'APP_ERROR',
          error: httpErrorResponse,
        });
      })
    );
  }

  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.goToPage(
      name,
      direction === 'forward'
        ? this.currentPageSubject.value + 1
        : this.currentPageSubject.value - 1
    );
  }
}
