namespace app.Controllers {
    export class HomeController {
        public status;

        constructor(private UserService: app.Services.UserService, private $state: ng.ui.IStateService, private $http: ng.IHttpService) {
            this.status = UserService.status;
        }
    }
    angular.module('app').controller('HomeController', HomeController);
}
