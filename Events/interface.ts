namespace app.i {
    export interface IEvent {
        _id: any;
        title: string;
        numGuests: number;
        /**
         * loc: [lng, lat]
         */
        loc: [number];
        eventAddress: string;
        dateTime: number;
        dateCreated: number;
        branchService: string;
        eventCreator: (string | IUser);
    }
}
