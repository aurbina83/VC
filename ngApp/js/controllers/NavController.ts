namespace app.Controllers {
  export class NavController {
    public status: { _id: string, firstName: string, lastName: string, email: string };

    public logout() {
      this.UserService.logout();
      this.$state.go('Login');
    }


    constructor(
        private UserService: app.Services.UserService,
        private $state: ng.ui.IStateService
      ) {
        this.status = UserService.status;
    }
  }

  angular.module('app').controller('NavController', NavController)
}
