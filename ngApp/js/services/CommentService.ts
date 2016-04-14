namespace app.Services {
  interface ICommentResourceClass extends app.i.IComment, ng.resource.IResource<ICommentResourceClass>{}
  interface ICommentResource extends ng.resource.IResourceClass<ICommentResourceClass> {
      update(params: Object, body: Object)
  }

  export class CommentService {
    private CommentResource: ICommentResource;

    public create(comment: app.i.IComment) {
      return this.CommentResource.save(comment).$promise;
    }

    public remove(id: string) {
      return this.CommentResource.remove({ id: id }).$promise;
    };

    public update(comment: app.i.IComment) {
        return this.CommentResource.update({ id: comment._id }, {message: comment.message}).$promise;
    }

    // public update(c: app.i.IComment) {
    //   let q = this.$q.defer();
    //   this.$http.put('/api/v1/comments/' + c._id, c.message).then((res) => {
    //     q.resolve();
    //   });
    //   return q.promise;
    // }


    constructor(private $resource: ng.resource.IResourceService, private $http: ng.IHttpService, private $q: ng.IQService) {
      this.CommentResource = <ICommentResource>$resource('/api/v1/comments/:id', null, {
          'update': {method: 'PUT'}
      });
    }
  }

  angular.module('app').service('CommentService', CommentService);
}
