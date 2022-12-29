import {h, render} from 'preact';
import {Component, JSX} from 'preact';
import {router} from './router';
import {Log} from './components/log/Log';
import {Admin} from './components/admin/Admin';
import {Header} from './components/header/Header';
import {OTA} from './components/ota/OTA';

import {IWebSocketService, WebSocketService} from './services/WebSocketService'
import {IApiService, ApiService} from './services/ApiService'

import '@picocss/pico/css/pico.min.css';
import { ILocalizationService, LocalizationService } from './services/LocalizationService';

interface IAppProps {
}

interface IAppState {
    currentPage: number;
}

export class App extends Component<IAppProps, IAppState> {
    private readonly localizationService:ILocalizationService = new LocalizationService();
    //private readonly webSocketService:IWebSocketService = new WebSocketService("192.168.1.172/log");
    //private readonly apiService:IApiService = new ApiService("http://192.168.1.33")
    //private readonly apiService:IApiService = new ApiService("http://192.168.1.45")
    //private readonly apiService:IApiService = new ApiService("http://192.168.100.1")
    private readonly apiService:IApiService = new ApiService("")

    constructor(){
        super();
        this.setState(prevState => ({
            currentPage: 3
        }));
    }

    languageChanged(language: string) {
        this.forceUpdate();
    }

    headerButtonClicked(e, id) {
        this.setState(prevState => ({
            currentPage: id
        }));
    }

    getSelectedPage(id: number) : JSX.Element
    {
        //this.webSocketService.AssignReceiveCallback(null);
        switch (id){
            case 1: return this.otaUpdatePage();
            //case 2: return this.logPage();
            case 3: return this.adminPage();
            default: return this.noPage();
        }
    }

    otaUpdatePage(): JSX.Element {
        return (
            <div>
                <OTA apiService={this.apiService} localizationService={this.localizationService}></OTA>
            </div>
        );
    }

    logPage(): JSX.Element {
        return (
            <div></div>
            //<Log webSocketService={this.webSocketService}/>
        );
    }

    adminPage(): JSX.Element {
        return (
            <Admin apiService={this.apiService} localizationService={this.localizationService} onLanguageChanged={(e) => this.languageChanged(e)}/>
        );
    }

    noPage(): JSX.Element {
        return (
            <div>Page not found!</div>
        );
    }

    render(): JSX.Element {
        return(
            <div>
                <header>
                    <Header localizationService={this.localizationService} onButtonClick={(e, id) => this.headerButtonClicked(e, id)}/>
                </header>
                <main class="container">
                    {this.getSelectedPage(this.state.currentPage)}
                </main>
                <footer></footer>
            </div>
        );
        //return router(location);
    }
}
