
export class BasketUtil {

    static getLastGames( teamId: string, isHome: boolean, game: BasketGames, monthGames: BasketGames[], dateGames: string, divider: number ) {
        const homeGames: any[] = monthGames.filter(g => (g.home_team_key === teamId || g.away_team_key === teamId) && g.event_status === 'Finished' && g.event_date !== dateGames);
        let i: number = 0;
        let score: number = 0;
        homeGames.forEach( (item) => {
            if ( i < divider ) {
                const isHomeInGames: boolean = item.home_team_key === teamId ? true : false;
                score += this.getScores( isHomeInGames, item, )
                if ( isHome ) {
                    if ( !game.analizeHomeGames ) {
                        game.analizeHomeGames = [];
                    }
                    const _homeScore: number = this.getScores( true, item );
                    const _awayScore: number = this.getScores( false, item );
                    const _winLose = isHomeInGames && _homeScore > _awayScore ? 'W' : !isHomeInGames && _homeScore < _awayScore ? 'W' : 'L';
                    game.analizeHomeGames.push( new HistoryGames( item.event_date, item.event_home_team,
                        item.event_away_team, _homeScore, _awayScore, _winLose ) );
                } else {
                    if ( !game.analizeAwayGames ) {
                        game.analizeAwayGames = [];
                    }
                    const _homeScore: number = this.getScores( true, item );
                    const _awayScore: number = this.getScores( false, item );
                    const _winLose = isHomeInGames && _homeScore > _awayScore ? 'W' : 'L';
                    game.analizeAwayGames.push( new HistoryGames( item.event_date, item.event_home_team,
                        item.event_away_team, _homeScore, _awayScore, _winLose ) );
                }
                i++;
            }
        });
        if ( isHome) {
            game.homeTotalPoints = score;
            try {
                game.homeAveragePoints = score / (game.analizeHomeGames.length < divider ? game.analizeHomeGames.length : divider);
            }
            catch {
            }
        } else {
            game.awayTotalPoints = score;
            try {
                game.awayAveragePoints = score / (game.analizeAwayGames.length < divider ? game.analizeAwayGames.length : divider);
            }
            catch {
            }
        }
        return game;
    }

    static getScores( isHome: boolean, scores_result: any ): number {
        let points: number = 0;
        if ( isHome ) {
            if (scores_result.scores['1stQuarter'].length > 0) {
                points += Number(scores_result.scores['1stQuarter'][0].score_home);
                if (scores_result.scores['2ndQuarter'].length > 0) {
                    points += Number(scores_result.scores['2ndQuarter'][0].score_home);
                }
                if (scores_result.scores['3rdQuarter'].length > 0) {
                    points += Number(scores_result.scores['3rdQuarter'][0].score_home);
                }
                if (scores_result.scores['4thQuarter'].length > 0) {
                    points += Number(scores_result.scores['4thQuarter'][0].score_home);
                }
            } else {
                const _score = scores_result.event_final_result.split('-');
                points = Number(_score[0].trim());
            }
        } else {
            if (scores_result.scores['1stQuarter'].length > 0) {
                points += Number(scores_result.scores['1stQuarter'][0].score_away);
                if (scores_result.scores['2ndQuarter'].length > 0) {
                    points += Number(scores_result.scores['2ndQuarter'][0].score_away);
                }
                if (scores_result.scores['3rdQuarter'].length > 0) {
                    points += Number(scores_result.scores['3rdQuarter'][0].score_away);
                }
                if ( scores_result.scores['4thQuarter'].length > 0 ) {
                    points += Number(scores_result.scores['4thQuarter'][0].score_away);
                }
            } else {
                const _score = scores_result.event_final_result.split('-');
                points = Number(_score[1].trim());
            }
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
