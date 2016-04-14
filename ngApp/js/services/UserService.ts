namespace app.Services {
    export class UserService {
        public status = { _id: null, firstName: null, lastName: null, lng: null, lat: null, maxDist: 80.5};

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
        }


        public update(id: string){
            let q = this.$q.defer();
            this.$http.put('/api/v1/users/' + id, null).then((res) => {
                q.resolve();
            });
            return q.promise;
        }

        public getLocation(){
            let q = this.$q.defer();
            navigator.geolocation.getCurrentPosition((position)=>{
                this.$timeout(()=>{
                    this.status.lat = position.coords.latitude;
                    this.status.lng = position.coords.longitude;
                    console.log(this.status);
                    console.log(position.coords.accuracy);
                    q.resolve();
                })
            });
            return q.promise;
        }

        public clearUser() {
          this.status._id = null;
          this.status.firstName = null;
          this.status.lastName = null;
          this.status.lng = null;
          this.status.lastName = null;
          this.status.maxDist = null;
        }


        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $window: ng.IWindowService,
            private $timeout: ng.ITimeoutService
        ){
            if(this.getToken()) this.setUser();
            console.log(this.status);
            this.getLocation();
        }
    }
    angular.module('app').service('UserService', UserService);
}
