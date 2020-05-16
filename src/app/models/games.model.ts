
export class Games {
    constructor(
        public id: string = '',
        public status: string = '',
        public scheduled: Date = new Date(),
        public home_points: number = 0,
        public away_points: number = 0,
        public home: Team = null,
        public away: Team = null,

        // to calculate the average
        public resultHome: number = 0,
        public resultAway: number = 0,
    ) { }
}

interface Team {
    name: string;
    alias: string;
    id: string;
}
