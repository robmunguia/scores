export class Periods {
    constructor(
        public PeriodID: number = 0,
        public GameID: number = 0,
        // tslint:disable-next-line: variable-name
        public Number: number = 0,
        public Name: string = '',
        public Type: string = '',
        public AwayScore: number = 0,
        public HomeScore: number = 0,
    ) { }
}
