namespace app.Controllers {
    export class EventUpdateController {
        public event: app.i.IEvent;
        public place;
        public date;
        public lat;
        public lng;
        public show = false;

        public onTimeSet(newDate){
            this.date = newDate;
        }

        public locChange(){
            this.lat = this.place.geometry.access_points[0].location.lat;
            this.lng = this.place.geometry.access_points[0].location.lng;
            this.event.loc = [this.lng, this.lat];
            this.event.name = this.place.name;
            this.event.eventAddress = this.place.formatted_address;
            this.show = true;
            console.log(this.event);
        }

        public timeChange(){
            this.event.dateTime = this.date;
        }


        public update() {
          this.EventService.update(this.event).then((res) => {
            this.$state.go('My Events');
          });
        }

        constructor(
            private EventService: app.Services.EventService,
            private $state: ng.ui.IStateService,
            private $stateParams: ng.ui.IStateParamsService
        ){
            this.event = EventService.getOne($stateParams['id']);
        }
    }
    angular.module('app').controller('EventUpdateController', EventUpdateController);
}
