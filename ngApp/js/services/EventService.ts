namespace app.Services {
    interface IEventResourceClass extends ng.resource.IResource<IEventResourceClass>, app.i.IEvent{ }

    interface IEventResource extends ng.resource.IResourceClass<IEventResourceClass> {
        update(params: Object, body: Object)
    }

    export class EventService {
        private EventResource: IEventResource;
        public status;

        public getAll({lng, lat, maxDist}) {
            return this.EventResource.query({lng: lng, lat: lat, maxDist: maxDist});
        }

        public getOne(id: string) {
            return this.EventResource.get({id: id});
        }

        public getMine(id: string) {
            return this.EventResource.query({id: 'myevents'});
        }

        public getAttending(id: string) {
            return this.EventResource.query({id: 'attending'});
        }

        public createEvent(event: app.i.IEvent) {
            return this.EventResource.save(event).$promise;
        }

        public update(event: app.i.IEvent) {
            return this.EventResource.update({ id: event._id }, {title: event.title, description: event.description, numGuests: event.numGuests, loc: event.loc, eventAddress: event.eventAddress, dateTime: event.dateTime, name: event.name}).$promise;
        }

        public attending(id: string){
            let q = this.$q.defer();
            this.$http.put('/api/v1/events/attending/' +id, null).then(()=>{
                q.resolve();
            });
            return q.promise;
        }

        public notAttending(id: string){
            let q = this.$q.defer();
            this.$http.put('/api/v1/events/notattending/' +id, null).then(()=>{
                q.resolve();
            });
            return q.promise;
        }

        public remove(id: string) {
            return this.EventResource.remove({ id: id}).$promise;
        }

        constructor(private $resource: ng.resource.IResourceService,
            private $http: ng.IHttpService,
            private $q: ng.IQService,
            private UserService: app.Services.UserService
        )
            {
            this.EventResource = <IEventResource>$resource('/api/v1/events/:id', null, {
                'update': {method: 'PUT'}
            });
            this.status = UserService.status;
        }
    }
    angular.module('app').service('EventService', EventService);
}
