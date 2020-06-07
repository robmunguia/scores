import { Periods } from './periods.model';

export class Games {
    constructor(
        public GameId: number = 0,
        public Season: number = 0,
        public Status: string = '',
        public Day: Date = new Date(),
        public DateTime: Date = new Date(),
        public AwayTeam: string = '',
        public HomeTeam: string = '',
        public AwayTeamID: number = 0,
        public HomeTeamID: number = 0,
        public AwayTeamScore: number = 0,
        public HomeTeamScore: number = 0,
        public PointSpread: number = 0,
        public OverUnder: number = 0,
        public AwayTeamMoneyLine: number = 0,
        public HomeTeamMoneyLine: number = 0,
        public IsClosed: boolean = false,
        // tslint:disable-next-line: no-shadowed-variable
        public Periods: Periods[] = null,
        public Quarters: Periods[] = null,
        public resultHome: number = null,
        public resultAway: number = null,
    ) { }
}
