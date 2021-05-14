
export interface League {
    country_id: number;
    league_id: number;
    season_id?: number;
    name?: string;
    is_current?: boolean;
    start_date?: Date;
    end_date?: Date;
}

export interface SoccerGames {
    country: any;
    logo: string;
    name: string;
    short_code: string;
    team_id: number;
    group: string;
    home_team: any;
    away_team: any;
    league_id: number;
    match_id: number;
    match_start: Date;
    minute: string;
    referee_id: number;
    round: any;
    season_id: number;
    status_code: number;
    status: string;
    venue: any;
    stats: any;

    // custom
    analizeHomeGames: any[],
    analizeAwayGames: any[],
    homeGoals: number,
    awayGoals: number,
}
