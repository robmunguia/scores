
export class Team {
    constructor(
        public TeamID: number = 0,
        public Key: string = '',
        public Active: boolean = false,
        public School: string = '',
        public Name: string = '',
        public Wins: number = 0,
        public Losses: number = 0,
        public ConferenceWins: number =  0,
        public ConferenceLosses: number =  0,
        public GlobalTeamID: number = 0,
        public ConferenceID: number = 0,
        public Conference: string = '',
        public TeamLogoUrl: string = '',
        public ShortDisplayName: string = '',
        public WikipediaLogoUrl: string = ''
    ) { }
}
