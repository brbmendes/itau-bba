import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../config';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class TalkRequestsService {
    private _route: string;
    private _headerOptions: HttpHeaders;
    private _pageMode: string;
    private _requestData: any

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
    }

    GetRequests(): Observable<any[]> {
        return this.http.get<any[]>(this._route);
    }

    GetRequestsById(requestId: string): Observable<any> {
        return this.http.get<any>(`${this._route}/${requestId}`);
    }

    UpdateRequest(requestId: string, request: any): Observable<any> {
        return this.http.put<any>(`${this._route}/${requestId}`, request);
    }

    DeleteRequest(requestId: string): Observable<any> {
        return this.http.delete(`${this._route}/${requestId}`);
    }
}
