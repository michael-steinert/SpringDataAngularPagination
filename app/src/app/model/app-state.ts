import { HttpErrorResponse } from '@angular/common/http';
import { CustomResponse } from './custom-response';
import { Page } from './page';

export interface AppState {
  appState: string;
  appData?: CustomResponse<Page>;
  error?: HttpErrorResponse;
}
