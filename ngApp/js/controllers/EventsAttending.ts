namespace app.Controllers {
    export class AttendingEvents {
        public status;
        public events;

        public notAttending(e: app.i.IEvent){
            this.EventService.notAttending(e._id).then(()=>{
                this.events.splice(this.events.indexOf(e), 1);
            })
        }

        constructor(private EventService: app.Services.EventService, private UserService: app.Services.UserService){
            this.status = UserService.status;
            this.events = EventService.getAttending(this.status._id)
        }
    }
    angular.module('app').controller('AttendingEvents', AttendingEvents);
}
