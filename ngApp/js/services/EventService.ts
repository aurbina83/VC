namespace app.Services {
    interface IEventResourceClass extends ng.resource.IResource<IEventResourceClass>, app.i.IEvent{ }

    interface IEventResource extends ng.resource.IResourceClass<IEventResourceClass> {
        update(params: Object, body: Object)
    }

    export class EventService {
        private EventResource: IEventResource;

        public getAll() {
            return this.EventResource.query();
        }

        public getOne(id: string) {
            return this.EventResource.get({id: id});
        }

        public getMine(id: string) {
            return this.EventResource.query({id: 'myevents'});
        }

        public createEvent(event: app.i.IEvent) {
            return this.EventResource.save(event).$promise;
        }

        public update(event: app.i.IEvent) {
            return this.EventResource.update({ id: event._id }, {title: event.title, description: event.description, numGuests: event.numGuests, loc: event.loc, eventAddress: event.eventAddress, dateTime: event.dateTime, name: event.name}).$promise;
        }

        public remove(id: string) {
            return this.EventResource.remove({ id: id}).$promise;
        }

        constructor(private $resource: ng.resource.IResourceService){
            this.EventResource = <IEventResource>$resource('/api/v1/events/:id', null, {
                'update': {method: 'PUT'}
            });
        }
    }
    angular.module('app').service('EventService', EventService);
}
