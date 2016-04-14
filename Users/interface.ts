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
        maxDist?: number;

        events?: Array<string | IEvent>
        attending?: Array<string | IEvent>
    }
}
