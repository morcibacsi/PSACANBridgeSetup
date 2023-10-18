import {Component,h, JSX} from 'preact';
import { ILocalizationService } from '../../services/LocalizationService';
import ToolTipIcon from '../../../icons/question-circle-regular.svg'

export interface INumberInputProps {
    localizationService: ILocalizationService;
    id: string;
    value: number;
    onchange: (id: string, value: number) => void;
}

interface INumberInputState {
    value: string;
}

export class NumberInput extends Component<INumberInputProps, INumberInputState> {
    constructor(props: INumberInputProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any){
        this.props.onchange(this.props.id, e.currentTarget.value);
    }

    render(props: INumberInputProps, state: INumberInputState): JSX.Element {
        return (
            <div class="columns is-mobile">
                <div class="column is-one-second">
                    <label>{props.localizationService.GetText(this.props.id)} {props.localizationService.GetTip(this.props.id) ? <span class="tooltip" data-tooltip={props.localizationService.GetTip(this.props.id)}><ToolTipIcon fill='#f00' width='1rem'/></span> : ''}</label>
                </div>
                <div class="column is-one-second">
                    <input type="text" name={this.props.id} value={this.props.value} onKeyUp={e => this.handleChange(e)}/>
                </div>
            </div>
        );
    }
};
