import Sockette from 'sockette';

export interface IWebSocketService {
    Send(command: string, parameter: string);
    AssignReceiveCallback(receiveCallback: receiveCallback);
}

export interface receiveCallback { (data: string): void }

export class WebSocketService implements IWebSocketService {
    private receiveCallback: receiveCallback;
    private readonly ws: Sockette;

    private onMessage(e) {
        //console.log('onMessage:', e);
        if (this.receiveCallback){
            this.receiveCallback(e.data);
        }
    }

    public constructor(url: string) {
        //const Sockette = require('sockette');
        this.ws = new Sockette('ws://' + url, {
          //timeout: 5e3,
          timeout: 2000,
          maxAttempts: 10,
          onopen: e => console.log('Connected!', e),
          onmessage: e => this.onMessage(e),
          onreconnect: e => console.log('Reconnecting...', e),
          onmaximum: e => console.log('Stop Attempting!', e),
          onclose: e => console.log('Closed!', e),
          onerror: e => console.log('Error:', e)
        });
    }

    public Send(command: string, parameter: string) {
        console.log(command + " - " + parameter);
    }

    public AssignReceiveCallback(receiveCallback: receiveCallback)
    {
        this.receiveCallback = receiveCallback;
    }
}
