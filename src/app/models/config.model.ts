export interface Config {
    ORIGINAL_DISPLAY_PRESENT: boolean;
    MODIFY_217_WITH_CURRENT_SPEED: boolean;
    CONSUMPTION_UNIT: number;
    DISTANCE_UNIT: number;
    LANGUAGE: number;
    VOLUME_UNIT: number;
    TEMPERATURE_UNIT: number;
    AMBIENCE_LEVEL: number;
    SOUND_HARMONY: number;
    USE_IGNITION_SIGNAL_FROM_CAN_BUS: boolean;
    FUEL_TANK_CAPACITY_IN_LITERS: number;
    VIN_FOR_HEADUNIT: number[];
    GENERATE_POPUP_FOR_DOOR_STATUS: boolean;
    HAS_RTC: boolean;
    DATETIME: string;
    VERSION: string;
}