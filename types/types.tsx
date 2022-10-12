export interface WeatherData {
    base: string;
    clouds: {
        all: number;
    };
    cod: number;
    coord: {
        lon: number;
        lat: number;
    };
    dt: number;
    id: number;
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    name: string;
    sys: {
        country: string;
        id: number;
        sunrise: number;
        sunset: number;
        type: number;
    };
    timezone: number;
    visibility: number;
    weather: [{
        description: string;
        icon: string;
        id: number;
        main: string;
    }];
    wind: {
        speed: number;
        deg: number;
    };
}
  
export interface WeatherDataDaily {
    cod: number;
    message: number;
    cnt: number;
    list: [WeatherDataDList];
    city: {
        id: number;
        name: string;
        coord: {
        lat: number;
        lon: number;
        },
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    }
}

export type WeatherDataDList = {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    },
    weather: [
        {
        id: number;
        main: string;
        description: string;
        icon: string;
        }
    ],
    clouds: {
        all: number
    },
    wind: {
        speed: number;
        deg: number;
        gust: number;
    },
    visibility: number;
    pop: number;
    rain: {
        "3h": number;
    },
    sys: {
        pod: string;
    },
    dt_txt: string;
    lastWD: boolean;
}