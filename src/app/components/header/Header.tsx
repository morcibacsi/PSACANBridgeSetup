import {Component, h, JSX} from 'preact';
import { ILocalizationService } from '../../services/LocalizationService';

export interface IHeaderProps {
    localizationService: ILocalizationService;
    onButtonClick: (e: any, buttonId: number) => void;
}

interface IHeaderState {
	title: string
}

export class Header extends Component<IHeaderProps, IHeaderState> {
	public state = {
		title: 'local state'
	};

	constructor(props: IHeaderProps) {
		super(props);
	}

	componentDidMount(): void {

	}

	render(props: IHeaderProps, state: IHeaderState): JSX.Element {
		return (
            <div>
                <div>
                    {
                        /*
                        <a href="#" role="button" onClick={(e) => this.props.onButtonClick(e, 2)}>Log</a>
                    <a href="#" role="button" onClick={(e) => this.props.onButtonClick(e, 1)}>Display</a>
                */}
                        <a href="#" role="button" style="margin-right: 2px;" onClick={(e) => this.props.onButtonClick(e, 1)}>{this.props.localizationService.GetText("UPDATE_BTN")}</a>
                        <a href="#" role="button" style="margin-right: 2px;" onClick={(e) => this.props.onButtonClick(e, 3)}>{this.props.localizationService.GetText("SETTINGS_BTN")}</a>
                </div>
            </div>
        );
	}
}

//export const DefaultHome = (): JSX.Element => <Home/>;
