import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);
  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string): Observable<UsernameAvailableResponse> {
    return this.http.post<UsernameAvailableResponse>(
      this.rootUrl + '/auth/username', {
      username
    });
  }

  signup(credentials: SignupCredentials): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(this.rootUrl + '/auth/signup', credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth(): Observable<SignedinResponse> {
    return this.http.get<SignedinResponse>(this.rootUrl + '/auth/signedin')
    .pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    );
  }

  signout(): Observable<{}> {
    return this.http.post<{}>(this.rootUrl + '/auth/signout', {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      );
  }

  signin(credentials: SigninCredentials): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(this.rootUrl + '/auth/signin', credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
