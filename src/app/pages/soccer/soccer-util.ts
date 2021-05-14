import { SoccerGames } from '../../models/soccer/league.model';

export class SoccerUtil {

    static avgGames( game: SoccerGames, isHome: boolean, games: SoccerGames[] ) {
        const divider = 5;
        const teamId: number = isHome ? game.home_team.team_id : game.away_team.team_id;
        let goals: number = 0;
        let homeGames = games.filter(g => (g.home_team.team_id === teamId || g.away_team.team_id === teamId) && g.status_code === 3);
        homeGames.sort( function( a, b ) {
        return new Date(b.match_start).getTime() - new Date(a.match_start).getTime();
        });
        homeGames = homeGames.slice(0, divider);
        isHome ? game.analizeHomeGames = homeGames : game.analizeAwayGames = homeGames;
        homeGames.forEach( item => {
        const isHomeInGames: boolean = item.home_team.team_id === teamId ? true : false;
        isHomeInGames ?
            goals += item.stats.home_score : goals += item.stats.away_score;
        });
        isHome ? game.homeGoals = ( goals / divider ) :
                 game.awayGoals = ( goals / divider );
    }

}
