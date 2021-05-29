export interface basketCountry {
    id: number,
    name: string,
    code: string,
    flag: string
    
}
 
export interface basketLeagues {
    id: number,
    name: string,
    type: string,
    logo: string,
    currentSeason: string,
    country: basketCountry,
    seasons: any[],
}


export interface basketGames {
    id: number,
    date: Date,
    time: string,
    timestamp: number,
    timezone: string,
    stage: string,
    week: string,

    status: basketStatus,
    teams: basketTeams,
    scores: basketScores,
    league: basketLeagues,

    // custom properties
    analizeHomeGames: any,
    analizeAwayGames: any,
    homeGoals: number,
    awayGoals: number,

    // topScores
    localIsTopScore: boolean,
    localTopScoreTotal: number,
    awayIsTopScore: boolean,
    awayTopScoreTotal: number,
}

export interface basketTeam {
    id: number,
    name: string,
    logo: string,
}

interface basketTeams {
    home: basketTeam,
    away: basketTeam
}
interface basketScores {
    home: basketScore,
    away: basketScore
}

interface basketStatus {
    long: string,
    short: string,
    timer: string,
}
interface basketScore {
    quarter_1: number,
    quarter_2: number,
    quarter_3: number,
    quarter_4: number,
    over_time: string,
    total: number,
}

