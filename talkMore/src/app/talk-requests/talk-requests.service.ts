import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../config';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { tap } from 'rxjs/operators';
import { RequestsModel } from './models/requestsModel';


@Injectable({
    providedIn: "root"
})
export class TalkRequestsService {
    private _requestData: RequestsModel;
    private _route: string;
    private _headerOptions: HttpHeaders;

    
    constructor(private http: HttpClient) {
        this._route = Config.GetUrlItauTalkMore();
        this._headerOptions = new HttpHeaders({
            'applicationid': 'brunoBragancaMendes'
        });
    }

    ngOnInit(): void {
    }

    SaveRequest(request: any): Observable<any> {
        return this.http.post(this._route, request);
        // return this.http
        //     .post<any>(this._route, request)
        //     .pipe(
        //         map(data => {
        //             return data;
        //         })
        //     );
    }

    GetRequests(): Observable<any[]> {
        return this.http.get<any[]>(this._route).pipe(
          tap(data => {
            return data;
          })
        );
      }

    GetRequestsById(requestId: number): Observable<any>{
        return this.http
            .get<any>(`${this._route}${requestId}`)
            .pipe(
                map(data => {
                    return data;
                })
            );
    }

    UpdateRequest(requestId: number, request: any): Observable<any> {
        return this.http
            .put<any>(`${this._route}${requestId}`, request)
            .pipe(
                map(data => {
                    return data;
                })
            );
    }

    DeleteRequest(requestId: number): Observable<any> {
        return this.http
            .delete<any>(`${this._route}${requestId}`)
            .pipe(
                map(data => {
                    return data;
                })
            );
    }
}
