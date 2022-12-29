import {Component,h, JSX} from 'preact';
import { ILocalizationService } from '../../services/LocalizationService';
import ToolTipIcon from '../../../icons/question-circle-regular.svg'

export interface ICheckBoxProps {
    localizationService: ILocalizationService;
    id: string;
    value: boolean;
    onchange: (id: string, value: boolean) => void;
}

interface ICheckBoxState {
}

export class CheckBox extends Component<ICheckBoxProps, ICheckBoxState> {
    constructor(props: ICheckBoxProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){
        this.props.onchange(this.props.id, !this.props.value);
    }

    render(props: ICheckBoxProps, state: ICheckBoxState): JSX.Element {
        return (
            <fieldset>
            <label for={this.props.id}>
                <input type="checkbox" id={this.props.id} name={this.props.id} role="switch" checked={this.props.value} onChange={e => this.handleChange()}/>
                {props.localizationService.GetText(this.props.id)} { props.localizationService.GetTip(this.props.id) ? <span><a href="#" data-tooltip={props.localizationService.GetTip(this.props.id)}><ToolTipIcon fill='#f00' width='1rem'/></a></span> : '' }
            </label>
            </fieldset>
        );
    }
};
