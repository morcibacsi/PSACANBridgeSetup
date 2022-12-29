import {Component, h, JSX} from 'preact';
import {IApiService} from '../../services/ApiService'
import { ILocalizationService } from '../../services/LocalizationService';

export interface IOTAProps {
    apiService: IApiService;
    localizationService: ILocalizationService;
}

interface IOTAState {
    selectedFile: null;
    loading: boolean;
}

export class OTA extends Component<IOTAProps, IOTAState> {
    constructor(props: IOTAProps) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this)
        this.buttonClick = this.buttonClick.bind(this)
    }

    componentDidMount(): void {
        //this.setState({selectedFile: null, loading: true});
    }

    buttonClick(event: any)
    {
        this.setState({loading: true});
        this.props.apiService.Update(this.state.selectedFile, () => {
            this.setState({loading: false});
            alert('Update complete');
        });
    }

    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
    };

    render(props: IOTAProps, state: IOTAState): JSX.Element {
       return (
            <div>
                <div class="columns level">
                    <div class="column level-item has-text-centered">
                        <h1>{this.props.localizationService.GetText("OTA update")}</h1>
                    </div>
                </div>

                {this.state.loading &&
                <progress></progress>
                }

                <div class="columns is-mobile">
                    <form method='POST' action='/doUpdate' encType='multipart/form-data'>
                        <input type="file" name='update' accept=".bin" class="form-input file-input" onChange={this.onFileChange}/>
                        <button type="button" onClick={(e) => this.buttonClick(e)} disabled={this.state.loading} aria-busy={this.state.loading}>{this.props.localizationService.GetText("UPLOAD_BTN")}</button>
                    </form>
                </div>
            </div>
        );
    }
}

//export const DefaultDisplayControl = (): JSX.Element => <DisplayControl/>;
