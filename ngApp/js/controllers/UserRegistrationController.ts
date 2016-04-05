namespace app.Controllers {
    export class UserRegistrationController {
        public user: app.i.IUser = {
            _id: undefined,
            email: undefined,
            password: undefined,
            firstName: undefined,
            lastName: undefined,
            loc: undefined,
            branchService: undefined,
            campaign: undefined,
            imgUrl: undefined
        }

        public email = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        public password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;

        public register() {
            this.UserService.register(this.user).then(()=>{
                this.$state.go('Home');
            });
        }
        constructor(private UserService: app.Services.UserService, private $state: ng.ui.IStateService)
        {}
    }
    angular.module('app').controller('UserRegistrationController', UserRegistrationController);
}
