namespace app.Controllers {
  export class UserLoginController {
    public user = {email: undefined, password: undefined};

    public login() {
      this.UserService.login(this.user).then(() => {
        this.$state.go('Home');
        this.user.email ='';
        this.user.password ='';
      });
    }

    constructor(private UserService: app.Services.UserService, private $state: ng.ui.IStateService) {}
  }

  angular.module('app').controller('UserLoginController', UserLoginController);
}
