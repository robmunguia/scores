
export class BasketUtil {

    static getLastGames( teamId: string, isHome: boolean, game: BasketGames, monthGames: BasketGames[], dateGames: string, divider: number ) {
        const homeGames: any[] = monthGames.filter(g => (g.home_team_key === teamId || g.away_team_key === teamId) && g.event_status === 'Finished' && g.event_date !== dateGames);
        let i: number = 0;
        let score: number = 0;
        homeGames.forEach( (item) => {
            if ( i < divider ) {
                const isHomeInGames: boolean = item.home_team_key === teamId ? true : false;
                score += this.getScores( isHomeInGames, item.scores )
                if ( isHome ) {
                    if ( !game.analizeHomeGames ) {
                        game.analizeHomeGames = [];
                    }
                    const _homeScore = this.getScores( true, item.scores );
                    const _awayScore = this.getScores( false, item.scores );
                    const _winLose = isHomeInGames && _homeScore > _awayScore ? 'W' : 'L';
                    game.analizeHomeGames.push( new HistoryGames( item.event_date, item.event_home_team,
                        item.event_away_team, _homeScore, _awayScore, _winLose ) );
                } else {
                    if ( !game.analizeAwayGames ) {
                        game.analizeAwayGames = [];
                    }
                    const _homeScore = this.getScores( true, item.scores );
                    const _awayScore = this.getScores( false, item.scores );
                    const _winLose = isHomeInGames && _homeScore > _awayScore ? 'W' : 'L';
                    game.analizeAwayGames.push( new HistoryGames( item.event_date, item.event_home_team,
                        item.event_away_team, _homeScore, _awayScore, _winLose ) );
                }
                i++;
            }
        });
        if ( isHome) {
            game.homeTotalPoints = score;
            game.homeAveragePoints = score / divider;
        } else {
            game.awayTotalPoints = score;
            game.awayAveragePoints = score / divider;
        }
        return game;
    }

    static getScores( isHome: boolean, scores_result: any ): number {
        let points: number = 0;
        if ( isHome ) {
            points += Number(scores_result['1stQuarter'][0].score_home);
            points += Number(scores_result['2ndQuarter'][0].score_home);
            points += Number(scores_result['3rdQuarter'][0].score_home);
            points += Number(scores_result['4thQuarter'][0].score_home);
        } else {
            points += Number(scores_result['1stQuarter'][0].score_away);
            points += Number(scores_result['2ndQuarter'][0].score_away);
            points += Number(scores_result['3rdQuarter'][0].score_away);
            points += Number(scores_result['4thQuarter'][0].score_away);
        }
        return points;
    }

}

interface BasketGames {
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

class HistoryGames {
    constructor(
        public gameDate: string = '',
        public homeName: string = '',
        public awayName: string = '',
        public homeScore: number = 0,
        public awayScore: number = 0,
        public win: string = '',
    ) { }
}
