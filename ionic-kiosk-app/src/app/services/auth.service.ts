import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  prefix = "user";

  constructor(
    public httpClient: HttpClient,
    private router: Router,
  ) {}

  public init() {
    this.httpClient.get(``).subscribe();
  }

  public login(data) {
      return this.httpClient.post(`${environment.baseUrl}/${this.prefix}/login`, data).subscribe(result => {
        if(result){
          this.router.navigate(['/home'])
        }
      })
  }


}
