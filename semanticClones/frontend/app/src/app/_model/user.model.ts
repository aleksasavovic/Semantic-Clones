export class User{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    numberOfRatedCodes: number;
    numberOfValidRates:number;
    startedReviews:Array<Object>;
    finishedReviews:Array<Object>;
    activeCodesProgress:Array<Object>;
}