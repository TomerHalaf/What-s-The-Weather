export class HeadlineModel {
    constructor(
        public EffectiveDate: string = "",
        public EffectiveEpochDate: number = 0,
        public Severity: number = 0,
        public Text: string = "",
        public Category: string = "",
        public EndDate: string = "",
        public EndEpochDate: number = 0,
        public MobileLink: string = "",
        public Link: string = ""
    ) { }
}