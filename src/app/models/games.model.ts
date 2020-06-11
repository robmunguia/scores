
export interface BasketGames {
    event_key: string,
    event_date: string,
    event_time: string,
    event_final_result: string,
    event_status: string,
    event_home_team: string,
    home_team_key: string,
    event_home_team_logo: string,
    event_away_team: string,
    away_team_key: string,
    event_away_team_logo: string,
    scores: any,

    analizeHomeGames: HistoryGames[],
    analizeAwayGames: HistoryGames[],
    h2hGames: any[],
    homeTotalPoints: number,
    awayTotalPoints: number,
    homeAveragePoints: number,
    awayAveragePoints: number,
}

export class HistoryGames {
    constructor(
        public gameDate: string = '',
        public homeName: string = '',
        public awayName: string = '',
        public homeScore: number = 0,
        public awayScore: number = 0,
        public win: string = '',
    ) { }
}
