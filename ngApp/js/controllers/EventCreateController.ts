namespace app.Controllers {
    export class EventCreateController {
        public event: app.i.IEvent;
        public place;
        public date;
        public utc;
        public lat;
        public lng;

        public onTimeSet (newDate) {
            this.date = newDate;
            this.lat = this.place.geometry.access_points[0].location.lat;
            this.lng = this.place.geometry.access_points[0].location.lng;
        }

        public autocompleteOptions = {
            types: ['establishment']
        }

        public create(){
            this.event.dateTime = this.date;
            this.event.loc = [this.lng, this.lat];
            this.event.name = this.place.name;
            this.event.eventAddress = this.place.formatted_address;
            console.log(this.event);

            this.EventService.createEvent(this.event).then((res)=>{
                this.$state.go('Home');
            });
        }

        public dates(){
            console.log(this.date);
        }
        constructor(
            private EventService: app.Services.EventService,
            private $state: ng.ui.IStateService
        ){}
    }
    angular.module('app').controller('EventCreateController', EventCreateController);
}
