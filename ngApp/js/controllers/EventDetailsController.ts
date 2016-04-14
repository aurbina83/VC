namespace app.Controllers {
    export class EventDetailController {
        public event: app.i.IEvent;
        public comment;
        public status;
        public edit = false;

        public attend(){
            this.EventService.attending(this.event._id).then(()=>{
                this.$state.go('Attending');
            })
        }

        public editComment(){
            this.edit = true;
        }

        public updateComment(c: app.i.IComment){
            this.CommentService.update(c).then(()=>{
                this.edit = false;
            });
        }

        public createComment() {
          this.comment.event = this.event._id;
          this.CommentService.create(this.comment).then((res) => {
            this.event.comments.push(res);
            this.comment.message = "";
          });
        }

        public deleteComment(c: app.i.IComment) {
          this.CommentService.remove(c._id).then(() => {
            this.event.comments.splice(this.event.comments.indexOf(c), 1);
          });
        }
        constructor(
            private EventService: app.Services.EventService,
            private CommentService: app.Services.CommentService,
            private $state: ng.ui.IStateService,
            private $stateParams: ng.ui.IStateParamsService
        ){
            this.event = EventService.getOne($stateParams['id']);
            this.status = EventService.status;
        }
    }
    angular.module('app').controller('EventDetailController', EventDetailController);
}
