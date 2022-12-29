export interface ILocalizationService {
    GetText(key: string): string;
    GetTip(key: string): string;
    SetLanguage(lang: string);
    GetLanguage(): string;
}

export class LocalizationService implements ILocalizationService {
    dictionary = {
        "en": {
            "USE_IGNITION_SIGNAL_FROM_CAN_BUS": {
                "label": "C1. Use ignition signal from CAN bus",
                "tip": "It should be enabled in cars (disabled state meant only for testing)"
            },
            "ORIGINAL_DISPLAY_PRESENT": {
                "label": "C2. Original display (EMF-C) present",
                "tip": "Enable when you have the original AEE2004 display (EMF-C), or a telematics system RNEG, RTx"
            },
            "MODIFY_217_WITH_CURRENT_SPEED":{
                "label": "C3. Modify the odometer frame with the speed of the car",
                "tip": "When your car doesn't have support for MATT the speed of the car could be missing from frame 0x217"
            },
            "GENERATE_POPUP_FOR_DOOR_STATUS":{
                "label": "C4. Generate an info message from door status change",
                "tip": "In some cars (like 5008) there is no message displayed when a door is open, enabling this setting will add this message"
            },
            "HAS_RTC":{
                "label": "C5. RTC info available",
                "tip": "Enable if your board has a real time clock module (board needs to be restarted after changing this setting)"
            },
            "FUEL_TANK_CAPACITY_IN_LITERS": {
                "label": "E1. Fuel tank capacity in liters (0-127 l)",
                "tip": ""
            },
            "LANGUAGE": {
                "label": "S1. Language in the vehicle",
                "tip": ""
            },
            "DISTANCE_UNIT": {
                "label": "S2. Distance unit",
                "tip": ""
            },
            "CONSUMPTION_UNIT": {
                "label": "S3. Consumption unit",
                "tip": ""
            },
            "VOLUME_UNIT": {
                "label": "S4. Volume unit",
                "tip": ""
            },
            "TEMPERATURE_UNIT": {
                "label": "S5. Temperature unit",
                "tip": ""
            },
            "AMBIENCE_LEVEL": {
                "label": "S6. Ambience level",
                "tip": ""
            },
            "SOUND_HARMONY": {
                "label": "S7. Sound harmony",
                "tip": ""
            },
            "VIN_FOR_HEADUNIT": {
                "label": "E1. VIN for headunit",
                "tip": "We send this VIN number for the head-unit (to avoid anti-theft beeps)"
            },
            "DATETIME": {
                "label": "E2. Date & time",
                "tip": ""
            },
            "DELETE_BTN": {
                "label": "Delete config",
                "tip": ""
            },
            "RELOAD_BTN": {
                "label": "Reload",
                "tip": ""
            },
            "SAVE_BTN": {
                "label": "Save",
                "tip": ""
            },
            "UPLOAD_BTN": {
                "label": "Upload",
                "tip": ""
            },
            "UPDATE_BTN": {
                "label": "Update",
            },
            "SETTINGS_BTN": {
                "label": "Settings",
            },
            "Settings": {
                "label": "Gateway settings",
            },
            "OTA update": {
                "label": "OTA update",
                "tip": ""
            },
            "LANG_FR":{
                "label": "Français",
            },
            "LANG_EN":{
                "label": "English",
            }
        },
        "fr": {
            "USE_IGNITION_SIGNAL_FROM_VAN_BUS": {
                "label": "C1. Utilser le signal d'allumage depuis le réseau CAN",
                "tip": "Doit être activé dans les voitures (l'état désactivé ne sert qu'aux tests afin que le module laisse allumé l'autoradio)."
            },
            "ORIGINAL_DISPLAY_PRESENT": {
                "label": "C2. Afficheur d'origine présent",
                "tip": "Activé si vous laissez l'afficheur d'origine"
            },
            "MODIFY_217_WITH_CURRENT_SPEED":{
                "label": "C3. Modify the odometer frame with the speed of the car",
                "tip": "When your car doesn't have support for MATT the speed of the car could be missing from frame 0x217"
            },
            "GENERATE_POPUP_FOR_DOOR_STATUS":{
                "label": "C4. Generate an info message from door status change",
                "tip": "In some cars (like 5008) there is no message displayed when a door is open, enabling this setting will add this message"
            },
            "HAS_RTC":{
                "label": "C5. RTC info available",
                "tip": "Enable if your board has a real time clock module (board needs to be restarted after changing this setting)"
            },
            "FUEL_TANK_CAPACITY_IN_LITERS": {
                "label": "E1. Capacité du réservoir de carburant en litre (0-127 l)",
                "tip": "Capacité du réservoir en litre"
            },
            "LANGUAGE":{
                "label": "S1. Langue en cours dans le vehicule",
                "tip": ""
            },
            "DISTANCE_UNIT": {
                "label": "S2. Unite de distance",
                "tip": ""
            },
            "CONSUMPTION_UNIT": {
                "label": "S3. Unite de consommation",
                "tip": ""
            },
            "VOLUME_UNIT": {
                "label": "S4. Unite de volume",
                "tip": ""
            },
            "TEMPERATURE_UNIT": {
                "label": "S5. Unite de temperature choisie par le client",
                "tip": ""
            },
            "AMBIENCE_LEVEL": {
                "label": "S6. Niveau d'ambiance",
                "tip": ""
            },
            "SOUND_HARMONY": {
                "label": "S7. Harmonie sonore du vehicule",
                "tip": ""
            },
            "VIN_FOR_HEADUNIT": {
                "label": "E1. Numéro de série de l'autoradio",
                "tip": "Saisir le VIN de l'autoradio installé (sert pour l'antivol)"
            },
            "DATETIME": {
                "label": "E2. Date & time",
                "tip": ""
            },
            "DELETE_BTN": {
                "label": "Supprimer la configuration",
                "tip": ""
            },
            "RELOAD_BTN": {
                "label": "Rafraichir",
                "tip": ""
            },
            "SAVE_BTN": {
                "label": "Enregistrer",
                "tip": ""
            },
            "UPLOAD_BTN": {
                "label": "Télécharger",
                "tip": ""
            },
            "OTA update": {
                "label": "OTA update",
                "tip": ""
            },
            "UPDATE_BTN": {
                "label": "Update",
            },
            "SETTINGS_BTN": {
                "label": "Paramètres",
            },
            "Settings": {
                "label": "Gateway settings",
            },
        }
    }

    currentLanguage: string = "en";

    public constructor() {
        try { this.currentLanguage = localStorage.getItem('language'); } catch(e) { }
        if (!this.currentLanguage) {
            this.currentLanguage = "en";
        }
    }

    public GetText(key: string): string {
        if (this.dictionary[this.currentLanguage][key] && this.dictionary[this.currentLanguage][key].label) {
            return this.dictionary[this.currentLanguage][key].label;
        }
        if (this.dictionary['en'][key] && this.dictionary['en'][key].label) {
            return this.dictionary['en'][key].label;
        }
        return key;
    }

    public GetTip(key: string): string {
        if (this.dictionary[this.currentLanguage][key] && this.dictionary[this.currentLanguage][key].tip) {
            return this.dictionary[this.currentLanguage][key].tip;
        }
        if (this.dictionary['en'][key] && this.dictionary['en'][key].tip) {
            return this.dictionary['en'][key].tip;
        }
        return "";
    }

    public SetLanguage(lang: string) {
        this.currentLanguage = lang;
        try { localStorage.setItem('language', lang); } catch { }
    }

    public GetLanguage(): string {
        return this.currentLanguage;
    }
}
