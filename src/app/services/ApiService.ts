import 'whatwg-fetch'
import { BaseResponse } from '../models/base-response.model';
import { Config } from '../models/config.model';
import { UniqueIdRequest, UniqueIdResponse } from '../models/uniqueId-request.model';

export interface IApiService {
    LoadConfig(thenCallback: (_: Response) => any): Promise<Config>;
    SaveConfig(config: Config, thenCallback: (_: Response) => any): Promise<BaseResponse>;
    DeleteConfig(thenCallback: (_: Response) => any): Promise<BaseResponse>;
    SetTime(year: number, month: number, day: number, hour: number, minute: number, second: number, thenCallback: (_: Response) => any): Promise<BaseResponse>;
    Update(file: any, thenCallback: (_: Response) => any): Promise<BaseResponse>;
    KeepAlive(thenCallback: (_: Response) => any): Promise<BaseResponse>;
}

export class ApiService implements IApiService {
    public constructor(private apiUrl: string) {
        this.keepAliveTimer();
    }

    keepAliveTimer(): void {
        setTimeout(() => {
            this.KeepAlive((_: Response) => {
                if (_.status == 200) {
                    console.log("KeepAlive OK");
                } else {
                    console.log("KeepAlive failed");
                }
            })
            .then((_: BaseResponse) => { })
            .finally(() => {
                this.keepAliveTimer();
            });
        }, 1000);

    }

    getRequest(method: string, body: string): RequestInit{
        let request: RequestInit =
        {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (body) {
            request.body = body;
        }
        return request;
    }

    SaveConfig(config: Config, thenCallback: (_: Response) => any): Promise<BaseResponse> {
        const body = JSON.stringify(config);
        return fetch(this.apiUrl + '/api/config', this.getRequest('POST', body))
            .then( (_: Response) => {
                thenCallback(_);
                return _.json();
            });
    }

    LoadConfig(thenCallback: (_: Response) => any): Promise<Config>
    {
        return fetch(this.apiUrl + '/api/config', this.getRequest("GET", ""))
            .then( (_: Response) => {
                thenCallback(_);
                return _.json();
            });
    }

    DeleteConfig(thenCallback: (_: Response) => any): Promise<BaseResponse>
    {
        return fetch(this.apiUrl + '/api/config', this.getRequest("DELETE", ""))
            .then( (_: Response) => {
                thenCallback(_);
                return _.json();
            });
    }

    SetTime(year: number, month: number, day: number, hour: number, minute: number, second: number, thenCallback: (_: Response) => any): Promise<BaseResponse>
    {
        let formData = new FormData();
        formData.append('year', year.toString());
        formData.append('month', month.toString());
        formData.append('day', day.toString());
        formData.append('hour', hour.toString());
        formData.append('minute', minute.toString());
        formData.append('second', second.toString());

        return fetch(this.apiUrl + '/api/datetime', {
            method: 'post',
            body: formData,
        })
        .then((_: Response) => {
            thenCallback(_);
            return _.json();
        });
    }

    Update(file: any, thenCallback: (_: Response) => any): Promise<BaseResponse>
    {
        const data = new FormData();
        data.append('file', file);
        return fetch("otaupdate", {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
             },
             body: data
        })
        .then((_: Response) => {
            thenCallback(_);
            return _.json();
        });
    }

    KeepAlive(thenCallback: (_: Response) => any): Promise<BaseResponse>
    {
        return fetch(this.apiUrl + '/api/keepalive', this.getRequest("GET", ""))
            .then( (_: Response) => {
                thenCallback(_);
                return _.json();
            });
    }
}
