namespace app.i {
    export interface IEvent {
        _id: any;
        title: string;
        numGuests: number;
        dateTime: number;
        dateCreated: number;
        branchService: string;
        eventCreator: (string | IUser);

        comments: [string | IComment];
        attendees: [string | IUser];
    }
}
