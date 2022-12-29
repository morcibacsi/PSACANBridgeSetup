import {Component,h, JSX} from 'preact';
import { ILocalizationService } from '../../services/LocalizationService';
import ToolTipIcon from '../../../icons/question-circle-regular.svg'

export interface ILabelInputProps {
    localizationService: ILocalizationService;
    id: string;
    value: string;
    minLength: number;
    maxLength: number;
    onchange: (id: string, value: string) => void;
}

interface ILabelInputState {
    value: string;
}

export class LabelInput extends Component<ILabelInputProps, ILabelInputState> {
    constructor(props: ILabelInputProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any){
        this.props.onchange(this.props.id, e.currentTarget.value);
    }

    render(props: ILabelInputProps, state: ILabelInputState): JSX.Element {
        return (
            <div class="columns is-mobile">
                <div class="column is-one-second">
                    <label>{props.localizationService.GetText(this.props.id)} {props.localizationService.GetTip(this.props.id) ? <span><a href="#" data-tooltip={props.localizationService.GetTip(this.props.id)}><ToolTipIcon fill='#f00' width='1rem'/></a></span> : ''}</label>
                </div>
                <div class="column is-one-second">
                    <input type="text" name={this.props.id} minLength={this.props.minLength} maxLength={this.props.maxLength} value={this.props.value} onKeyUp={e => this.handleChange(e)}/>
                </div>
            </div>
        );
    }
};
