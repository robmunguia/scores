
export class WNBAGames {
    constructor(
        public id: string = '',
        public status: string = '',
        public coverage: string = '',
        public scheduled: Date = new Date(),
        public home_points: number = 0,
        public away_points: number = 0,
        public track_on_court: boolean = true,
        public home: WNBATeam = null,
        public away: WNBATeam = null,
        // add fields
        public resultHome: number = 0,
        public resultAway: number = 0,
    ) { }
}

interface WNBATeam {
    name: string;
    alias: string;
    id: string;
}
