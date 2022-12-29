import { Component, h, JSX } from 'preact';
import { ILocalizationService } from '../../services/LocalizationService';
import ToolTipIcon from '../../../icons/question-circle-regular.svg'

export interface SelectOption {
    id: number;
    name: string;
}

export interface ISelectProps {
    localizationService: ILocalizationService;
    id: string;
    data: SelectOption[];
    value: number;
    onchange: (id: string, value: number) => void;
}

interface ISelectState {
    value: string;
}

export class Select extends Component<ISelectProps, ISelectState> {
    constructor(props: ISelectProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any){
        this.props.onchange(this.props.id, e.currentTarget.value);
    }

    render(props: ISelectProps, state: ISelectState): JSX.Element {
        return (
            <div class="columns is-mobile">
                <div class="column is-one-second">
                    <label>{props.localizationService.GetText(this.props.id)} {props.localizationService.GetTip(this.props.id) ? <span><a href="#" data-tooltip={props.localizationService.GetTip(this.props.id)}><ToolTipIcon fill='#f00' width='1rem'/></a></span> : ''}</label>
                </div>
                <div class="column is-one-second">
                    <select name={this.props.id} value={this.props.value} onChange={e => this.handleChange(e)}>
                        {
                        this.props.data.map( (x) =>
                        <option key={x.id} value={x.id}>{x.name}</option> )
                        }
                    </select>
                </div>
            </div>
        );
    }
};
