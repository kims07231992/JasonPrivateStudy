import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SessionStorage } from 'ngx-store';
import { GatewayService } from '../shared/gateway.service';

@Injectable()
export class UserService {
    @SessionStorage() private jwtTokenSession?: string;
    @SessionStorage() private isSignInSession?: boolean;
    @SessionStorage() private signInTimeSession?: Date;
    @SessionStorage() private userSession?: User;

    get getJwtToken(): string | undefined {
        return this.jwtTokenSession;
    }

    get getIsSignIn(): boolean | undefined {
        return this.isSignInSession;
    }

    get getSignInTime(): Date | undefined {
        return this.signInTimeSession;
    }

    get getUser(): User | undefined {
        return this.userSession;
    }

    constructor(private gatewayService: GatewayService) {

    }

    signUp(user: User) {
        return this.gatewayService.post('users/signup', user)
            .pipe(map(res => res));
    }

    signIn(user: User) {
        return this.gatewayService.post('users/signin', user)
            .pipe(map(res => res));
    }

    signOut() {
        this.clearUserSession();
        this.navigateHome();
    }

    setUserSession(user: User, jwtToken: string) {
        this.isSignInSession = true;
        this.signInTimeSession = new Date();
        this.jwtTokenSession = jwtToken;
        this.userSession = user;
    }

    clearUserSession() {
        this.isSignInSession = undefined;
        this.signInTimeSession = undefined;
        this.jwtTokenSession = undefined;
        this.userSession = undefined;
    }

    navigateHome() {
        this.gatewayService.navigateHome();
    }
}
