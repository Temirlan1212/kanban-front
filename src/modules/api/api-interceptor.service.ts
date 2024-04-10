import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable({ providedIn: 'root' })
export class ApiInterceptorService implements HttpInterceptor {
  private apiErrorCallback: (error: HttpErrorResponse) => Promise<boolean> =
    async (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.api.user.logOut();
      }

      return false;
    };

  constructor(private api: ApiService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.api.user.getLoggedInUser()?.token;
    let headers = new HttpHeaders();

    if (token != null) {
      headers = headers.append('Authorization', `token ${token}`);
    }

    const apiRequest = request.clone({
      url: `${environment.apiUrl}/${request.url}/`,
      headers,
    });

    return next
      .handle(request.context.get(BYPASS_LOG) ? request : apiRequest)
      .pipe(
        retry({
          count: 1,
          delay: async (error: HttpErrorResponse) => {
            const apiErrorCallbackResult = await this.apiErrorCallback(error);

            if (apiErrorCallbackResult) {
              return timer(1);
            }

            throw error;
          },
        })
      );
  }

  setApiErrorCallback(
    callback: (error: HttpErrorResponse) => Promise<boolean>
  ) {
    this.apiErrorCallback = callback;
  }
}
