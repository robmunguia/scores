import * as moment from 'moment';
import { basketGames } from '../../models/basket/league.model';


export class BasketUtil {

    static avgGames( game: basketGames, isHome: boolean, games: basketGames[] ) {
        const divider = 5;
        const teamId: number = isHome ? game.teams.home.id : game.teams.away.id;
        let points: number = 0;
        // get home games
        let homeGames = games.filter(g => (g.teams.home.id === teamId || g.teams.away.id === teamId)
                                    && g.status.short === 'FT'
                                    && moment(new Date(g.date)).format('yyyy-MM-DD') < moment(new Date()).format('yyyy-MM-DD')
                                    );
        // sort descending to get last games
        homeGames.sort( function( a, b ) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        homeGames = homeGames.slice(0, divider);
        isHome ? game.analizeHomeGames = homeGames : game.analizeAwayGames = homeGames;
        homeGames.forEach( item => {
            const isHomeInGames: boolean = item.teams.home.id === teamId ? true : false;
            isHomeInGames ?
                points += item.scores.home.quarter_1 + item.scores.home.quarter_2 + item.scores.home.quarter_3 + item.scores.home.quarter_4:
                            points += item.scores.away.quarter_1 + item.scores.away.quarter_2 + item.scores.away.quarter_3 + item.scores.away.quarter_4;
        });
        isHome ? game.homeGoals = ( points / divider ) :
                 game.awayGoals = ( points / divider );
    }

}
