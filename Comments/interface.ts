namespace app.i {
    export interface IComment {
        _id: any;
        message: string;
        datePosted: number;
        event: (string | IEvent);
        user: (string | IUser);
    }
}
