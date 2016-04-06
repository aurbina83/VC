namespace app.Controllers{
    export class EventsController{
        public events

        constructor(private EventService: app.Services.EventService){
            this.events = EventService.getAll();
        }
    }
    angular.module('app').controller('EventsController', EventsController);
}
