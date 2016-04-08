namespace app.Controllers {
    export class EventDetailController {
        public event: app.i.IEvent;

        public attend(){
            this.EventService.attending(this.event._id).then(()=>{
                this.$state.go('Attending');
            })
        }
        constructor(
            private EventService: app.Services.EventService,
            private $state: ng.ui.IStateService,
            private $stateParams: ng.ui.IStateParamsService
        ){
            this.event = EventService.getOne($stateParams['id'])
        }
    }
    angular.module('app').controller('EventDetailController', EventDetailController);
}
