import {Component, h, JSX, render} from 'preact';
import { BaseResponse } from '../../models/base-response.model';
import { Config } from '../../models/config.model';
import {IApiService} from '../../services/ApiService'
import ToolTipIcon from '../../../icons/question-circle-regular.svg'
import { ILocalizationService } from '../../services/LocalizationService';
import { CheckBox } from '../checkbox/CheckBox';
import { LabelInput } from '../input/LabelInput';
import { NumberInput } from '../input/NumberInput';
import { Select } from '../input/Select';

export interface IAdminProps {
    apiService: IApiService;
    localizationService: ILocalizationService;
    onLanguageChanged: (language: string) => void;
}

interface IAdminState {
    loading: boolean;
    saving: boolean;
    saveButtonEnabled: boolean;
    config: Config;
}

export class Admin extends Component<IAdminProps, IAdminState> {
    constructor(props: IAdminProps) {
        super(props);

        this.state =
        {
            loading: false,
            saving: false,
            saveButtonEnabled: false,
            config:
            {
                ORIGINAL_DISPLAY_PRESENT: true,
                MODIFY_217_WITH_CURRENT_SPEED: false,
                CONSUMPTION_UNIT: 0,
                DISTANCE_UNIT: 0,
                LANGUAGE: 1,
                VOLUME_UNIT: 0,
                TEMPERATURE_UNIT: 0,
                AMBIENCE_LEVEL: 6,
                SOUND_HARMONY: 0,
                USE_IGNITION_SIGNAL_FROM_CAN_BUS: true,
                FUEL_TANK_CAPACITY_IN_LITERS: 60,
                VIN_FOR_HEADUNIT: [],
                GENERATE_POPUP_FOR_DOOR_STATUS: false,
                HAS_RTC: false,
                DATETIME: this.getDateTime(new Date()),
                VERSION: '0.0.0',
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleVinChange = this.handleVinChange.bind(this)
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);

        this.loadConfig();
    }

    componentDidMount(): void {
        this.loadConfig();
    }

    evaluate(variable: any, type: string): any {
        switch (type)
        {
            case 'string': return String(variable);
            case 'number': return this.isNumber(variable) ? Number(variable) : -1;
            case 'boolean': {
                if (typeof variable === 'boolean')
                    return variable;

                if (typeof variable === 'string')
                    return (variable).toLowerCase() === 'true';

                if (typeof variable === 'number')
                    return variable !== 0;

                return false;
            }
            default: return null;
        }
    }

    isNumber(n: any): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    getDateTime(datetime: Date)
    {
        return `${datetime.getFullYear()}-${`${datetime.getMonth() +
            1}`.padStart(2, '0')}-${`${datetime.getDate() + 1}`.padStart(
            2,
            '0'
          )}T${`${datetime.getHours()}`.padStart(
            2,
            '0'
          )}:${`${datetime.getMinutes()}`.padStart(2, '0')}`;
    }

    handleTimeChange(event)
    {
        let prevValue;
        this.setState(prevState => {
            prevValue = prevState.config[event.target.name];

            prevState.config[event.target.name] = event.target.value;
            (
                {
                    config: prevState.config
                }
            )}
        );
        this.forceUpdate();
    }

    loadConfig() {
        this.showLoadProgress(true);
        this.props.apiService.LoadConfig(() => this.showLoadProgress(false)).then((_:Config) => {
            this.setState(prevState => (
                {
                    config: _
                })
            );
        })
    }

    deleteConfig() {
        this.showLoadProgress(true);
        this.props.apiService.DeleteConfig(() => this.showLoadProgress(false)).then(() => {
            this.showLoadProgress(false);
        })
    }

    showLoadProgress(showLoading: boolean) {
        this.setState(prevState => (
            {
                loading: showLoading,
                config: prevState.config
            })
        );
    }

    showSaveProgress(showSave: boolean) {
        this.setState(prevState => (
            {
                saving: showSave,
                config: prevState.config
            })
        );
    }

    saveConfig() {
        if (!(this.state.config.VIN_FOR_HEADUNIT.length == 17)) {
            alert("VIN incorrect");
        }
        else {
            this.showSaveProgress(true);
            //this.getVinAsBytes("LDC88888888888888");

            this.props.apiService.SaveConfig(this.state.config, (_: Response) => {
                if (_.status == 200) {
                    this.showSaveProgress(false);
                    this.loadConfig();
                }
                //console.log(_);
                //console.log(_.json);
            }).then((_: BaseResponse) => {
                if (_.success === "FAILED")
                {
                    let message = _.success + " at: " + _.failedAt + " trace: " + _.trace;
                    alert(message);
                }
                else
                {
                    alert(_.success);
                }
            });
        }
    }

    setTime()
    {
        let year = Number(this.state.config.DATETIME.substring(0, 4));
        let month = Number(this.state.config.DATETIME.substring(5, 7));
        let day = Number(this.state.config.DATETIME.substring(8, 10));
        let hour = Number(this.state.config.DATETIME.substring(11, 13));
        let minute = Number(this.state.config.DATETIME.substring(14, 16));
        let second = 0;

        /*
        console.log(this.state.config.DATETIME);
        console.log(year);
        console.log(month);
        console.log(day);
        console.log(hour);
        console.log(minute);
        console.log(second);
        */

        this.props.apiService.SetTime(year, month, day, hour, minute, second, (_: Response) => {
            if (_.status == 200) {
                //this.showSaveProgress(false);
                //this.loadConfig();
            }
            //console.log(_);
            //console.log(_.json);
        }).then((_: BaseResponse) => {
            if (_.success === "FAILED")
            {
                let message = _.success + " at: " + _.failedAt + " trace: " + _.trace;
                alert(message);
            }
            else
            {
                alert(_.success);
            }
        });

    }

    handleChange(event, type) {
        let prevValue;
        this.setState(prevState => {
            prevValue = prevState.config[event.target.name];
            if (event.target.type == "checkbox") {
                event.target.value = event.target.checked;
            }

            prevState.config[event.target.name] = this.evaluate(event.target.value, type);
            (
                {
                    config: prevState.config
                }
            )}
        );
        this.forceUpdate();
        //console.log(event.target.name + ":" + prevValue + "->"  + this.state.config[event.target.name]);

        //console.log(this.state.saveButtonEnabled);
        //this.setState({value: event.target.value});
    }

    handleCheckBoxChange(id: string, value: boolean) {
        let prevValue;
        this.setState(prevState => {
            prevValue = prevState.config[id];

            prevState.config[id] = value;
            (
                {
                    config: prevState.config
                }
            )}
        );
        this.forceUpdate();
    }

    handleInputChange(id: string, value: any) {
        let prevValue;
        this.setState(prevState => {
            prevValue = prevState.config[id];

            prevState.config[id] = value;
            (
                {
                    config: prevState.config
                }
            )}
        );
        this.forceUpdate();
    }

    handleVinChange(id: string, value: string) {
        //console.log(event.target.name);
        //console.log(event.target.value);

        let newVin = this.getVinAsBytes(value)

        this.setState(prevState => {
            prevState.config[id] = newVin;
            (
                {
                    config: prevState.config
                }
            )}
        );
    }

    getVinAsString(vinAsBytes: number[]): string {
        let result = "";

        for (let i = 0; i < vinAsBytes.length; i++) {
            //if we found non-ascii characters then we return
            if (vinAsBytes[i] < 48 || vinAsBytes[i] > 122) {
                result = ""
                return result;
            }
            result +=  String.fromCharCode(vinAsBytes[i]);
        }

        return result;
    }

    getVinAsBytes(vinAsString: string): number[]
    {
        let result = [];
        for (let i = 0; i < vinAsString.length; i++) {
            let asciiValue = vinAsString[i].charCodeAt(0);
            result.push(asciiValue);
        }
        //console.log(result);
        return result;
    }

    convertByteArrayToHex(id: number[]): string {
        let result = '';

        for (const value of id) {
            let hexString = value.toString(16);
            if (hexString.length < 2) {
                hexString = '0' + hexString;
            }
            result = result + hexString;
        }

        //console.log("uniqueid:" + result);
        return result;
    }

    convertHexToByteArray(hex: string): number[] {
        if (hex.indexOf("{") > -1) {
            hex = hex.replace(/{(.*)}/, "$1")
        }
        //hex = hex.replace("!", "");
        hex = hex.replace(/[^A-Fa-f0-9]/g, "")
        //console.log("hex: " + hex);
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));

        return bytes;
    }

    isSaveButtonDisabled(): boolean {
        let result = false;

        return result;
    }

    isHidden(): boolean {
        return true;
    }

    changeLanguage(e) {
        this.props.localizationService.SetLanguage(e.target.value);
        this.props.onLanguageChanged(e.target.value);
        this.setState(prevState => {
            (
                {
                    config: prevState.config
                }
            )}
        );
        this.forceUpdate();
    }
/*
    loadVin()
    {
        this.props.apiService.GetVinForHu(() => {}).then((_: BaseResponse) => {
            this.loadConfig();
            //setTimeout(() => {  }, 1000);
        });
    }
*/
    render(props: IAdminProps, state: IAdminState): JSX.Element {
       return (
            <div>
                <div class="header">
                    <hgroup>
                        <h1>{this.props.localizationService.GetText('Settings')}</h1>
                        <h2>{this.state.config.VERSION}</h2>
                    </hgroup>
                </div>
                <div class="settings">
                    <div class="columns">
                        <div class="column is-one-second">
                            <select onChange={e => this.changeLanguage(e)} value={this.props.localizationService.GetLanguage()}>
                                <option value="pt-BR">{this.props.localizationService.GetText('LANG_pt-BR')}</option>
                                <option value="en">{this.props.localizationService.GetText('LANG_EN')}</option>
                                <option value="fr">{this.props.localizationService.GetText('LANG_FR')}</option>
                            </select>
                        </div>
                    </div>
                    <form autocomplete="off">
                        <CheckBox
                            id='USE_IGNITION_SIGNAL_FROM_CAN_BUS'
                            localizationService={this.props.localizationService}
                            value={this.state.config.USE_IGNITION_SIGNAL_FROM_CAN_BUS}
                            onchange={(i,v) => this.handleCheckBoxChange(i, v)}>
                        </CheckBox>

                        <CheckBox
                            id='ORIGINAL_DISPLAY_PRESENT'
                            localizationService={this.props.localizationService}
                            value={this.state.config.ORIGINAL_DISPLAY_PRESENT}
                            onchange={(i,v) => this.handleCheckBoxChange(i, v)}>
                        </CheckBox>

                        <CheckBox
                            id='MODIFY_217_WITH_CURRENT_SPEED'
                            localizationService={this.props.localizationService}
                            value={this.state.config.MODIFY_217_WITH_CURRENT_SPEED}
                            onchange={(i,v) => this.handleCheckBoxChange(i, v)}>
                        </CheckBox>

                        <CheckBox
                            id='GENERATE_POPUP_FOR_DOOR_STATUS'
                            localizationService={this.props.localizationService}
                            value={this.state.config.GENERATE_POPUP_FOR_DOOR_STATUS}
                            onchange={(i,v) => this.handleCheckBoxChange(i, v)}>
                        </CheckBox>

                        <CheckBox
                            id='HAS_RTC'
                            localizationService={this.props.localizationService}
                            value={this.state.config.HAS_RTC}
                            onchange={(i,v) => this.handleCheckBoxChange(i, v)}>
                        </CheckBox>

                        <NumberInput
                            id='FUEL_TANK_CAPACITY_IN_LITERS'
                            localizationService={this.props.localizationService}
                            value={this.state.config.FUEL_TANK_CAPACITY_IN_LITERS}
                            onchange={(id, value) => this.handleInputChange(id, value)}>
                        </NumberInput>

                        <Select
                            id='LANGUAGE'
                            localizationService={this.props.localizationService}
                            value={this.state.config.LANGUAGE}
                            data={[
                                { id: 0, name: 'French'},
                                { id: 1, name: 'English'},
                                { id: 2, name: 'German'},
                                { id: 3, name: 'Spanish'},
                                { id: 4, name: 'Italian'},
                                { id: 5, name: 'Portuguese'},
                                { id: 6, name: 'Dutch'},
                                { id: 7, name: 'Greek'},
                                { id: 8, name: 'Brazilian Portuguese'},
                                { id: 9, name: 'Polish'},
                                { id: 10, name: 'Traditional Chinese'},
                                { id: 11, name: 'Simplified Chinese'},
                                { id: 12, name: 'Turkish'},
                                { id: 13, name: 'Japanese'},
                                { id: 14, name: 'Russian'},
                                { id: 15, name: 'Czech'},
                                { id: 16, name: 'Croatian'},
                                { id: 17, name: 'Hungarian'},
                                { id: 18, name: 'Arabic'},
                                { id: 19, name: 'Bulgarian'},
                                { id: 20, name: 'Korean'},
                                { id: 21, name: 'Danish'},
                                { id: 22, name: 'Estonian'},
                                { id: 23, name: 'Farsi'},
                                { id: 24, name: 'Finnish'},
                                { id: 25, name: 'Hebrew'},
                                { id: 26, name: 'Norwegian'},
                                { id: 27, name: 'Romanian'},
                                { id: 28, name: 'Serbian'},
                                { id: 29, name: 'Swedish'},
                                { id: 30, name: 'Ukrainian'},
                                { id: 31, name: 'Vietnamese'}
                                ]}
                            onchange={(i,v) => this.handleInputChange(i, v)}>
                        </Select>

                        <Select
                            id='DISTANCE_UNIT'
                            localizationService={this.props.localizationService}
                            value={this.state.config.DISTANCE_UNIT}
                            data={[{ id: 0, name: 'km'}, { id: 1, name: 'miles'}]}
                            onchange={(i,v) => this.handleInputChange(i, v)}>
                        </Select>

                        <Select
                            id='CONSUMPTION_UNIT'
                            localizationService={this.props.localizationService}
                            value={this.state.config.CONSUMPTION_UNIT}
                            data={[{ id: 0, name: 'l/100 km'}, { id: 1, name: 'km/l'}]}
                            onchange={(i,v) => this.handleInputChange(i, v)}>
                        </Select>

                        <Select
                            id='VOLUME_UNIT'
                            localizationService={this.props.localizationService}
                            value={this.state.config.VOLUME_UNIT}
                            data={[{ id: 0, name: 'liter'}, { id: 1, name: 'gallon'}]}
                            onchange={(i,v) => this.handleInputChange(i, v)}>
                        </Select>

                        <Select
                            id='TEMPERATURE_UNIT'
                            localizationService={this.props.localizationService}
                            value={this.state.config.TEMPERATURE_UNIT}
                            data={[{ id: 0, name: '°C'}, { id: 1, name: '°F'}]}
                            onchange={(i,v) => this.handleInputChange(i, v)}>
                        </Select>

                        <Select
                            id='AMBIENCE_LEVEL'
                            localizationService={this.props.localizationService}
                            value={this.state.config.AMBIENCE_LEVEL}
                            data={[
                                { id: 0, name: 'Level 0'},
                                { id: 1, name: 'Level 1'},
                                { id: 2, name: 'Level 2'},
                                { id: 3, name: 'Level 3'},
                                { id: 4, name: 'Level 4'},
                                { id: 5, name: 'Level 5'},
                                { id: 6, name: 'Level 6'},
                                { id: 7, name: 'Invalid'},
                            ]}
                            onchange={(i,v) => this.handleInputChange(i, v)}>
                        </Select>

                        <Select
                            id='SOUND_HARMONY'
                            localizationService={this.props.localizationService}
                            value={this.state.config.SOUND_HARMONY}
                            data={[
                                { id: 0, name: 'Harmony 1'},
                                { id: 1, name: 'Harmony 2'},
                                { id: 2, name: 'Harmony 3'},
                                { id: 3, name: 'Harmony 4'},
                            ]}
                            onchange={(i,v) => this.handleInputChange(i, v)}>
                        </Select>

                        <LabelInput
                            id='VIN_FOR_HEADUNIT'
                            localizationService={this.props.localizationService}
                            minLength={17}
                            maxLength={17}
                            value={this.getVinAsString(this.state.config.VIN_FOR_HEADUNIT)}
                            onchange={(id, value) => this.handleVinChange(id, value)}>
                        </LabelInput>

                        {this.state.config.HAS_RTC &&
                        <div class="columns is-mobile">
                            <div class="column is-one-second">
                                <label>{props.localizationService.GetText("DATETIME")} {props.localizationService.GetTip("DATETIME") ? <span><a href="#" data-tooltip={props.localizationService.GetTip("DATETIME")}><ToolTipIcon fill='#f00' width='1rem'/></a></span> : ''}</label>
                            </div>
                            <div class="column is-one-second datetime-setup">
                                <div class="input-container">
                                    <input type="datetime-local" id="DATETIME" name="DATETIME" value={this.state.config.DATETIME} onChange={this.handleTimeChange} ></input>
                                </div>
                                <div class="button-container">
                                    <button type="button" onClick={(e) => this.setTime()}>Set time</button>
                                </div>
                            </div>
                        </div>
                        }

                        <div class="button-columns is-mobile">
                            <div class="column is-one-third">
                                <button type="button" class="button is-info is-fullwidth" disabled={this.state.loading} aria-busy={this.state.loading} onClick={(e) => this.deleteConfig()}>{this.props.localizationService.GetText('DELETE_BTN')}</button>
                            </div>
                            <div class="column is-one-third">
                                <button type="button" class="button is-info is-fullwidth" disabled={this.state.loading} aria-busy={this.state.loading} onClick={(e) => this.loadConfig()}>{this.props.localizationService.GetText('RELOAD_BTN')}</button>
                            </div>
                            <div class="column is-one-third">
                                <button type="button" class="button is-info is-fullwidth" aria-busy={this.state.saving} onClick={(e) => this.saveConfig()}>{this.props.localizationService.GetText('SAVE_BTN')}</button>
                            </div>
                        </div>
                        <div></div>
                    </form>
                </div>
            </div>
        );
    }
}

//export const DefaultAdmin = (): JSX.Element => <Admin/>;
