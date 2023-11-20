export interface ILocalizationService {
    GetText(key: string): string;
    GetTip(key: string): string;
    SetLanguage(lang: string);
    GetLanguage(): string;
}

export class LocalizationService implements ILocalizationService {
    dictionary = {
        "USE_IGNITION_SIGNAL_FROM_CAN_BUS": {
            "en": {
                "label": "C1. Use ignition signal from CAN bus",
                "tip": "It should be enabled in cars (disabled state meant only for testing)"
            },
            "fr": {
                "label": "C1. Utilser le signal d'allumage depuis le réseau CAN",
                "tip": "Doit être activé dans les voitures (l'état désactivé ne sert qu'aux tests afin que le module laisse allumé l'autoradio)."
            },
            "pt-BR": {
                "label": "C1. Use o sinal de ignição vindo da CAN bus",
                "tip": "Deve ser ativado em carros (desativado apenas para teste)"

            }
        },
        "ORIGINAL_DISPLAY_PRESENT": {
            "en": {
                "label": "C2. Original display (EMF-C) present",
                "tip": "Enable when you have the original AEE2004 display (EMF-C), or a telematics system RNEG, RTx"
            },
            "fr": {
                "label": "C2. Afficheur d'origine présent",
                "tip": "Activé si vous laissez l'afficheur d'origine"
            },
            "pt-BR": {
                "label": "C2. Tela Original (EMF-C) presente",
                "tip": "Ativar quando você tiver o visor AEE2004 original (EMF-C) ou um sistema de telemática RNEG, RTx"
            }
        },
        "MODIFY_217_WITH_CURRENT_SPEED": {
            "en": {
                "label": "C3. Modify the odometer frame with the speed of the car",
                "tip": "When your car doesn't have support for MATT the speed of the car could be missing from frame 0x217"
            },
            "fr": {
                "label": "C3. Modify the odometer frame with the speed of the car",
                "tip": "When your car doesn't have support for MATT the speed of the car could be missing from frame 0x217"
            },
            "pt-BR": {
                "label": "C3. Modificar o frame 217 incluindo a velocidade do carro",
                "tip": "Quando seu carro não tem suporte para MATT, a velocidade do carro pode estar faltando no quadro 0x217"
            }
        },
        "GENERATE_POPUP_FOR_DOOR_STATUS": {
            "en": {
                "label": "C4. Generate an info message from door status change",
                "tip": "In some cars (like 5008) there is no message displayed when a door is open, enabling this setting will add this message"
            },
            "fr": {
                "label": "C4. Generate an info message from door status change",
                "tip": "In some cars (like 5008) there is no message displayed when a door is open, enabling this setting will add this message"
            },
            "pt-BR": {
                "label": "C4. Gerar uma mensagem de informação de mudança de estado da porta ",
                "tip": "Em alguns carros (como o 5008) não há mensagem exibida quando uma porta é aberta, ativar esta configuração adicionará esta mensagem"
            }
        },
        "HAS_RTC": {
            "en": {
                "label": "C5. RTC info available",
                "tip": "Enable if your board has a real time clock module (board needs to be restarted after changing this setting)"
            },
            "fr": {
                "label": "C5. RTC info available",
                "tip": "Enable if your board has a real time clock module (board needs to be restarted after changing this setting)"
            },
            "pt-BR": {
                "label": "C5. Informações RTC disponíveis (modulo RTC instalado)",
                "tip": "Ative se sua placa tiver um módulo de relógio em tempo real (a placa precisa ser reiniciada após alterar esta configuração)"
            }
        },
        "REPLACE_REMOTE_MODE_BTN_WITH_SRC": {
            "en": {
                "label": "C6. Replace MODE with SRC on the remote stalk",
                "tip": "Enable if you would like to replace the MODE button with SRC on the remote stalk"
            },
            "fr": {
                "label": "C6. Replace MODE with SRC on the remote stalk",
                "tip": "Enable if you would like to replace the MODE button with SRC on the remote stalk"
            },
            "pt-BR": {
                "label": "C6. Replace MODE with SRC on the remote stalk",
                "tip": "Enable if you would like to replace the MODE button with SRC on the remote stalk"
            }
        },
        "FUEL_TANK_CAPACITY_IN_LITERS": {
            "en": {
                "label": "E1. Fuel tank capacity in liters (0-127 l)",
                "tip": ""
            },
            "fr": {
                "label": "E1. Capacité du réservoir de carburant en litre (0-127 l)",
                "tip": "Capacité du réservoir en litre"
            },
            "pt-BR": {
                "label": "E1. Capacidade do tanque de combustível em litros (0-127 l)",
                "tip": ""
            }
        },
        "LANGUAGE": {
            "en": {
                "label": "S1. Language in the vehicle",
                "tip": ""
            },
            "fr": {
                "label": "S1. Langue en cours dans le vehicule",
                "tip": ""
            },
            "pt-BR": {
                "label": "S1. Idioma do veículo",
                "tip": "Normalmente: 308=60l 3008=53l RCZ=55l"
            }
        },
        "DISTANCE_UNIT": {
            "en": {
                "label": "S2. Distance unit",
                "tip": ""
            },
            "fr": {
                "label": "S2. Unite de distance",
                "tip": ""
            },
            "pt-BR": {
                "label": "S2. Unidade de distância",
                "tip": ""
            }
        },
        "CONSUMPTION_UNIT": {
            "en": {
                "label": "S3. Consumption unit",
                "tip": ""
            },
            "fr": {
                "label": "S3. Unite de consommation",
                "tip": ""
            },
            "pt-BR": {
                "label": "S3. Unidade de consumo",
                "tip": ""
            }
        },
        "VOLUME_UNIT": {
            "en": {
                "label": "S4. Volume unit",
                "tip": ""
            },
            "fr": {
                "label": "S4. Unite de volume",
                "tip": ""
            },
            "pt-BR": {
                "label": "S4. Unidade de volume",
                "tip": ""
            }
        },
        "TEMPERATURE_UNIT": {
            "en": {
                "label": "S5. Temperature unit",
                "tip": ""
            },
            "fr": {
                "label": "S5. Unite de temperature choisie par le client",
                "tip": ""
            },
            "pt-BR": {
                "label": "S5. Unidade de temperatura",
                "tip": ""
            }
        },
        "AMBIENCE_LEVEL": {
            "en": {
                "label": "S6. Ambience level",
                "tip": ""
            },
            "fr": {
                "label": "S6. Niveau d'ambiance",
                "tip": ""
            },
            "pt-BR": {
                "label": "S6. Nível de ambiente",
                "tip": ""
            }
        },
        "SOUND_HARMONY": {
            "en": {
                "label": "S7. Sound harmony",
                "tip": ""
            },
            "fr": {
                "label": "S7. Harmonie sonore du vehicule",
                "tip": ""
            },
            "pt-BR": {
                "label": "S7. Harmonia sonora",
                "tip": ""
            }
        },
        "VIN_FOR_HEADUNIT": {
            "en": {
                "label": "E1. VIN for headunit",
                "tip": "We send this VIN number for the head-unit (to avoid anti-theft beeps)"
            },
            "fr": {
                "label": "E1. Numéro de série de l'autoradio",
                "tip": "Saisir le VIN de l'autoradio installé (sert pour l'antivol)"
            },
            "pt-BR": {
                "label": "E1. VIN para a MATT e NAC",
                "tip": "Enviamos este número VIN para a unidade principal (para evitar bipes anti-roubo)"
            }
        },
        "DATETIME": {
            "en": {
                "label": "E2. Date & time",
                "tip": ""
            },
            "fr": {
                "label": "E2. Date & time",
                "tip": ""
            },
            "pt-BR": {
                "label": "E2. Data e hora",
                "tip": ""
            }
        },
        "DELETE_BTN": {
            "en": {
                "label": "Delete config",
                "tip": ""
            },
            "fr": {
                "label": "Supprimer la configuration",
                "tip": ""
            },
            "pt-BR": {
                "label": "Excluir configuração",
                "tip": ""
            }
        },
        "RELOAD_BTN": {
            "en": {
                "label": "Reload",
                "tip": ""
            },
            "fr": {
                "label": "Rafraichir",
                "tip": ""
            },
            "pt-BR": {
                "label": "Recarregar",
                "tip": ""
            }
        },
        "SAVE_BTN": {
            "en": {
                "label": "Save",
                "tip": ""
            },
            "fr": {
                "label": "Enregistrer",
                "tip": ""
            },
            "pt-BR": {
                "label": "Salvar",
                "tip": ""
            }
        },
        "REBOOT_BTN": {
            "en": {
                "label": "Reboot",
                "tip": ""
            },
            "fr": {
                "label": "Reboot",
                "tip": ""
            },
            "pt-BR": {
                "label": "Reboot",
                "tip": ""
            }
        },
        "UPLOAD_BTN": {
            "en": {
                "label": "Upload",
                "tip": ""
            },
            "fr": {
                "label": "Télécharger",
                "tip": ""
            },
            "pt-BR": {
                "label": "Enviar",
                "tip": ""
            }
        },
        "UPDATE_BTN": {
            "en": {
                "label": "Update",
            },
            "fr": {
                "label": "Update",

            },
            "pt-BR": {
                "label": "Atualizar",
            }
        },
        "SETTINGS_BTN": {
            "en": {
                "label": "Settings",
            },
            "fr": {
                "label": "Paramètres",
            },
            "pt-BR": {
                "label": "Configurações",
            }
        },
        "Settings": {
            "en": {
                "label": "Gateway settings",
            },
            "fr": {
                "label": "Gateway settings",
            },
            "pt-BR": {
                "label": "Configurações",
            }
        },
        "OTA update": {
            "en": {
                "label": "OTA update",
                "tip": ""
            },
            "fr": {
                "label": "OTA update",
                "tip": ""
            },
            "pt-BR": {
                "label": "OTA update",
                "tip": ""
            }
        },
        "LANG_FR": {
            "en": {
                "label": "Français",
            },
            "fr": {},
            "pt-BR": {
                "label": "Français",
            }
        },
        "LANG_EN": {
            "en": {
                "label": "English",
            },
            "fr": {},
            "pt-BR": {
                "label": "English",
            }
        },
        "LANG_pt-BR": {
            "en": {
                "label": "Brazilian Portuguese",
            },
            "fr": {},
            "pt-BR": {
                "label": "Portugues Brasil",
            }
        }
    };

    currentLanguage: string = "en";

    public constructor() {
        try { this.currentLanguage = localStorage.getItem('language'); } catch(e) { }
        if (!this.currentLanguage) {
            this.currentLanguage = "en";
        }
    }

    public GetText(key: string): string {
        if (this.dictionary[key][this.currentLanguage] && this.dictionary[key][this.currentLanguage].label) {
            return this.dictionary[key][this.currentLanguage].label;
        }
        if (this.dictionary[key]['en'] && this.dictionary[key]['en'].label) {
            return this.dictionary[key]['en'].label;
        }
        return key;
    }

    public GetTip(key: string): string {
        if (this.dictionary[key][this.currentLanguage] && this.dictionary[key][this.currentLanguage].tip) {
            return this.dictionary[key][this.currentLanguage].tip;
        }
        if (this.dictionary[key]['en'] && this.dictionary[key]['en'].tip) {
            return this.dictionary[key]['en'].tip;
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
