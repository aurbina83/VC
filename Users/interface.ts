namespace app.i {
    export interface IUser {
        _id: any;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        /**
         * loc: [lng,lat]
         */
        loc: [number];
        branchService: string;
        campaign: string;
        imgUrl?: string;

        events?: Array<string | IEvent>
    }
}
