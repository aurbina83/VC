namespace app.Services {
    export class UserService {
        public status = { _id: null, firstName: null, lastName: null, email: null, loc: null };

        public login(user){
            let q = this.$q.defer();
            this.$http.post('/api/v1/users/login', user).then((res) => {
                this.setToken(res.data['token']);
                this.setUser();
                q.resolve();
            })
            return q.promise;
        }

        public register(user: app.i.IUser) {
          let q = this.$q.defer();
          this.$http.post('/api/v1/users/register', user).then((res) => {
            this.setToken(res.data['token']);
            this.setUser();
            q.resolve();
          });
          return q.promise;
        }

        public getToken() {
          return this.$window.localStorage.getItem('token');
        }

        public setToken(token: string) {
          this.$window.localStorage.setItem('token', token);
        }

        public logout() {
          this.$window.localStorage.removeItem('token');
          this.clearUser();
        }

        public setUser() {
          let token = this.getToken();
          let u = JSON.parse( atob( token.split('.')[1] ) );
          this.status._id = u._id;
          this.status.firstName = u.firstName;
          this.status.lastName = u.lastName;
          this.status.email = u.email;
          this.status.loc = u.loc;
        }

        public updateLoc(user: app.i.IUser){
            let q = this.$q.defer();
            this.$http.put('/api/v1/users/:id', user.loc).then((res) => {
                q.resolve();
            });
            return q.promise;
        }

        public updateMaxDist(user: app.i.IUser){
            let q = this.$q.defer();
            this.$http.put('/api/v1/users', user.maxDist).then((res)=> {
                q.resolve();
            });
            return q.promise;
        }

        public clearUser() {
          this.status._id = null;
          this.status.firstName = null;
          this.status.lastName = null;
          this.status.email = null;
          this.status.loc = null;
        }


        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $window: ng.IWindowService
        ){
            if(this.getToken()) this.setUser();
        }
    }
    angular.module('app').service('UserService', UserService);
}
