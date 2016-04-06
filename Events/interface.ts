namespace app.i {
    export interface IEvent {
        _id: any;
        title: string;
        name: string;
        description: string;
        numGuests: any;
        /**
         * loc: [lng, lat]
         */
        loc: [number];
        eventAddress: string;
        dateTime: string;
        dateCreated: number;
        eventCreator: (string | IUser);
    }
}
