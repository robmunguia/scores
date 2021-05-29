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

    static topTeams( games: basketGames[], game: basketGames ) {
        const maxGames = 8;
        let homeGames = games.filter(g => (g.teams.home.id === game.teams.home.id || g.teams.away.id === game.teams.home.id)
                                    && g.status.short === 'FT'
                                    && moment(new Date(g.date)).format('yyyy-MM-DD') < moment(new Date()).format('yyyy-MM-DD')
                                    );
        let awayGames = games.filter(g => (g.teams.home.id === game.teams.away.id || g.teams.away.id === game.teams.away.id)
                                    && g.status.short === 'FT'
                                    && moment(new Date(g.date)).format('yyyy-MM-DD') < moment(new Date()).format('yyyy-MM-DD')
                                    );
        homeGames.sort( function( a, b ) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        awayGames.sort( function( a, b ) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        // homeGames = homeGames.slice(0, maxGames);
        // awayGames = homeGames.slice(0, maxGames);

        homeGames.forEach(item => {
            if ( item.teams.home.id === game.teams.home.id ) { // lee el resultado del juego en casa
                if ( item.scores.home.total > item.scores.away.total ) {
                    game.localTopScoreTotal += 1;
                } else
                game.localTopScoreTotal -= 1;
            } else { // lee el resultado del juego de visita
                if ( item.scores.away.total > item.scores.home.total ) {
                    game.localTopScoreTotal += 1;
                } else
                    game.localTopScoreTotal -= 1;
            }
        });
        if(game.localTopScoreTotal >= maxGames ) {
            game.localIsTopScore = true;   
        }
        
        awayGames.forEach(item => {
            if ( item.teams.home.id === game.teams.away.id ) { // lee el resultado del juego de visita
                if ( item.scores.home.total > item.scores.away.total ) {
                    game.awayTopScoreTotal += 1;
                } else
                    game.localTopScoreTotal -= 1;
            } else { // lee el resultado del juego de visita
                if ( item.scores.away.total > item.scores.home.total ) {
                    game.awayTopScoreTotal += 1;
                } else
                    game.awayTopScoreTotal -= 1;
            }
        });
        if(game.awayTopScoreTotal >= maxGames ) {
            game.awayIsTopScore = true;   
        }
    }

}
