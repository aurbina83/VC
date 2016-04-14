import * as express from 'express';
import * as mongoose from 'mongoose';
import { ICommentModel } from './model';
import { IEventModel } from '../Events/model';

export function controller(Comment: mongoose.Model<ICommentModel>, Event: mongoose.Model<IEventModel>) {
    return {
        create: create,
        remove: remove,
        update: update
    }

    function create(req: express.Request, res: express.Response, next: Function) {
        let c = new Comment(req.body);
        c.datePosted = Date.now();
        c.user = req['payload']._id;
        c.save((err, comment) => {
            if (err) return next(err);
            Event.update({ _id: c.event }, { $push: { 'comments': c._id } }, (err, result) => {
                if (err) return next(err);
                res.json(c);
            });
        });
    }

    function remove(req: express.Request, res: express.Response, next: Function) {
      Comment.findOneAndRemove({ _id: req.params.id, user: req['payload']._id }, (err, comment) => {
        if (err) return next(err);
        // if a comment was found and deleted... update the blog
        if (comment) {
          Event.update({ comments: req.params.id }, { $pull: { comments: req.params.id } }, (err, numRows) => {
            if (err) return next(err);
            res.json({ message: "Your comment has been deleted!" });
          });
        // ... otherwise send an error message
        } else {
          next({ message: 'Could not delete the requested comment.', status: 500 });
        }
      });
    }

    function update(req: express.Request, res: express.Response, next: Function) {
      Comment.update({ _id: req.params.id, user: req['payload']._id }, req.body, (err, numRows: any) => {
        if (err) return next(err);
        if (numRows.nModified === 0) return next({ message: "Could not update the requested blog.", status: 500 });
        res.json({ message: 'Your blog entry has been updated!' });
    });
    }
}
