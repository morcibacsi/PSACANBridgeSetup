import {Component, h, JSX} from 'preact';
import {Counter} from '../counter/Counter';
import {IWebSocketService, WebSocketService} from '../../services/WebSocketService';

export interface ILogProps {
    webSocketService: IWebSocketService;
}

class ILogState {
    data: string[] = []; //Array<string> = new Array<string>();
	logCount: number = 0;
}

export class Log extends Component<ILogProps, ILogState> {
    constructor(props: ILogProps) {
       super(props);
       //this.state.data = new Array<string>();
       //this.state.data = [];
       this.onWebSocketDataReceived = this.onWebSocketDataReceived.bind(this);
    }

    componentDidMount(): void {
        this.props.webSocketService.AssignReceiveCallback(this.onWebSocketDataReceived);
    }

    componentWillMount(): void {
        console.log("Log unmount");
        this.props.webSocketService.AssignReceiveCallback(null);
    }

    onWebSocketDataReceived(incomingData: string){

        this.setState(prevState => (
            {
                logCount: prevState.data ? prevState.data.length + 1 : 0,
                data: prevState.data ? prevState.data.concat(incomingData) : []
            }));
        //console.log("onWebSocketDataReceived: " + incomingData);
    }

    saveButtonClick(){
        let csvContent = "data:text/csv;charset=utf-8," + this.state.data.map(e => e).join("");
        //var encodedUri = encodeURI(csvContent);
        //window.open(encodedUri);

        var d = new Date();

        //2011-10-05T14:48:00.000Z
        let fileName = "van_log_" + d.toISOString().replace(":", "_").replace("T", "_").replace(".", "_").replace("Z", "") + ".txt";

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName);
        document.body.appendChild(link); // Required for FF

        link.click(); // This will download the data file named "my_data.csv".
    }

    startStopLogClick(){
        this.props.webSocketService.Send("log", "toggle")
    }

    render(props: ILogProps, state: ILogState): JSX.Element {
       return (
            <div>
                <div class="columns">
                    <div class="column">
                        Data received: {this.state.logCount}
                    </div>
                </div>
                <div class="columns">
                    <div class="column">
                        <button class="button is-info is-fullwidth" onClick={(e) => this.startStopLogClick()}>Start/Stop log</button>
                    </div>
                    <div class="column">
                        <button class="button is-info is-fullwidth" onClick={(e) => this.saveButtonClick()}>Save log</button>
                    </div>
                </div>
            </div>
        );
	}
}

//export const DefaultLog = (): JSX.Element => <Log/>;
