export interface LaunchesResponse {
  docs: Launch[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}


export interface Launch {
  id: string;
  flight_number: number;
  name: string;
  upcoming: boolean;
  success?: boolean | null;
  details?: string | null;

  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: "half" | "quarter" | "year" | "month" | "day" | "hour";

  rocket?: string | null; 
  launchpad?: string | null; 

  failures?: {
    time?: number;
    altitude?: number;
    reason?: string;
  }[];

  fairings?: {
    reused?: boolean | null;
    recovery_attempt?: boolean | null;
    recovered?: boolean | null;
    ships?: string[]; 
  };

  crew?: string[]; 
  ships?: string[]; 
  capsules?: string[]; 
  payloads?: string[]; 

  cores?: {
    core?: string | null; 
    flight?: number | null;
    gridfins?: boolean | null;
    legs?: boolean | null;
    reused?: boolean | null;
    landing_attempt?: boolean | null;
    landing_success?: boolean | null;
    landing_type?: string | null;
    landpad?: string | null; 
  }[];

  links?: {
    patch?: { small?: string | null; large?: string | null };
    reddit?: { campaign?: string | null; launch?: string | null; media?: string | null; recovery?: string | null };
    flickr?: { small?: string[]; original?: string[] };
    presskit?: string | null;
    webcast?: string | null;
    youtube_id?: string | null;
    article?: string | null;
    wikipedia?: string | null;
  };

  auto_update?: boolean;
  tdb?: boolean;
  net?: boolean;
  window?: number | null;
}

export interface HistoryLinks {
  article?: string | null; 
}

export interface History {
  title?: string | null;
  event_date_utc?: string | null;
  event_date_unix?: number | null;
  details?: string | null;
  links?: HistoryLinks | null; 
}



export interface Rocket {
  id:string;
  name?: string;
  type?: string;
  active?: boolean;
  stages?: number;
  boosters?: number;
  cost_per_launch?: number;
  success_rate_pct?: number;
  first_flight?: string;
  country?: string;
  company?: string;
  height?: { meters?: number; feet?: number };
  diameter?: { meters?: number; feet?: number };
  mass?: { kg?: number; lb?: number };
  payload_weights?: { id?: string; name?: string; kg?: number; lb?: number }[];
  first_stage?: {
    reusable?: boolean;
    engines?: number;
    fuel_amount_tons?: number;
    burn_time_sec?: number;
    thrust_sea_level?: { kN?: number; lbf?: number };
    thrust_vacuum?: { kN?: number; lbf?: number };
  };
  second_stage?: {
    reusable?: boolean;
    engines?: number;
    fuel_amount_tons?: number;
    burn_time_sec?: number;
    thrust?: { kN?: number; lbf?: number };
    payloads?: {
      option_1?: string;
      composite_fairing?: {
        height?: { meters?: number; feet?: number };
        diameter?: { meters?: number; feet?: number };
      };
    };
  };
  engines?: {
    number?: number;
    type?: string;
    version?: string;
    layout?: string;
    isp?: { sea_level?: number; vacuum?: number };
    engine_loss_max?: number;
    propellant_1?: string;
    propellant_2?: string;
    thrust_sea_level?: { kN?: number; lbf?: number };
    thrust_vacuum?: { kN?: number; lbf?: number };
    thrust_to_weight?: number;
  };
  landing_legs?: { number?: number; material?: string | null };
  flickr_images?: string[];
  wikipedia?: string;
  description?: string;
}


export type RootStackParamList = {
    HomePage : undefined;
    RocketDetail: {rocket : Rocket};
    LaunchesList:undefined;
    LaunchDetail: {launch : Launch};
    HistoryList: undefined; 
    HistoryDetail: { history: History };
    RocketsList : undefined;
}

// types/drawer.ts
export type DrawerParamList = {
  RootStack: undefined; // your stack navigator
  HistoryList: undefined;
  LaunchesList: undefined;
};