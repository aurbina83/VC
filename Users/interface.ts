namespace app.i {
    export interface IUser {
        _id: any;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        age?: number;
        currentLocation: string;
        branchService: string;
        paygrade: string;
        theater: string;
        imgUrl: string;
        mos: string;

        events: Array<string | IEvent>
    }
}
