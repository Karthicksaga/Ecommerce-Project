import { Injectable } from '@angular/core';


@Injectable({
    'providedIn' : 'root'
})
export class IPService{

    ipAddress = "localhost";
    port = '3000';

    public getTargetHost(){
        return "http://" + this.ipAddress+':' + this.port;
    }

}