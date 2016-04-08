namespace app.Controllers{
    export class EventsController{
        public events;
        public status;

        public distance;

        public setDistance(){
            this.status.maxDist = this.distance*1.6;
            console.log('changed');
        }

        constructor(private EventService: app.Services.EventService, private $scope: ng.IScope, private UserService: app.Services.UserService){
            this.status = EventService.status;
            $scope.$watch(()=> this.status, (newValue, oldValue)=>{
                console.log('watch');
                if(newValue !== oldValue){
                    this.events = EventService.getAll({lng: this.status.lng, lat: this.status.lat, maxDist: this.status.maxDist});
                }
            }, true);
        }
    }
    angular.module('app').controller('EventsController', EventsController);
}
