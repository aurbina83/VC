namespace app.Controllers {
    export class HomeController {
        public status;
        public user;
        public lat;
        public lng;
        public loc;


        constructor(private UserService: app.Services.UserService, private $state: ng.ui.IStateService, private $http: ng.IHttpService) {
            this.user = UserService.status;
            // navigator.geolocation.getCurrentPosition((position)=>{
            //     this.lat = position.coords.latitude;
            //     this.lng = position.coords.longitude;
            //     this.user.loc = [this.lng, this.lat];
            // });
        }
    }
    angular.module('app').controller('HomeController', HomeController);
}
