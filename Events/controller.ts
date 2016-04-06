import * as express from 'express';
import { IEventModel } from './model';
import * as mongoose from 'mongoose';
import {IUserModel } from '../Users/model';

export function controller(Event: mongoose.Model<IEventModel>, User: mongoose.Model<IUserModel>) {
    return {
        getAll: getAll,
        findOne: findOne,
        findMine: findMine,
        create: create,
        update: update,
        attending: attending,
        notAttending: notAttending,
        remove: remove
    }

    // function getAll(req: express.Request, res: express.Response, next: Function){
    //     //Get max distance from user preference
    //     let maxDist = req['payload'].maxDist || 80.5;
    //
    //     //Convert distance to radians
    //     // the raduis of Earth is approximately 6371 kilometers
    //     maxDist /= 6371;
    //
    //     //Get Coordinates [lng, ltd]
    //     let coords = req['payload'].loc;
    //
    //     //Find Locations
    //     Event.find({
    //         loc: {
    //             $near: coords,
    //             $maxDistance: maxDist
    //         }
    //     })
    //     .populate('eventCreator', 'firstName lastName branchService')
    //     .exec((err, events) => {
    //         if (err) return next(err);
    //         res.json(200, events);
    //     });
    // }


    function getAll(req: express.Request, res: express.Response, next: Function) {
        Event.find({})
          .populate('eventCreator', 'firstName lastName branchService')
          .exec((err, events) => {
          if (err) return next(err);
          res.json(events);
        });
    }

    function findOne(req: express.Request, res: express.Response, next: Function){
        Event.findOne({_id: req.params.id})
        .populate('eventCreator', 'firstName lastName branchService')
        .exec((err, data) => {
            if(err) return next(err);
            res.json(data);
        });
    }

    function findMine(req: express.Request, res: express.Response, next: Function){
        Event.find({eventCreator: req['payload']._id})
        .populate('eventCreator', 'firstName lastName branchService')
        .exec((err, data) => {
            if(err) return next(err);
            res.json(data);
        });
    }

    function create(req: express.Request, res: express.Response, next: Function){
        req.body.datePosted = Date.now();
        let e = new Event(req.body);
        e.eventCreator = req['payload']._id;
        e.save((err, event: IEventModel) => {
            if(err) return next(err);
            res.json(event);
        });
    }

    function update(req: express.Request, res: express.Response, next: Function){
        Event.update({_id: req.params.id, eventCreator: req['payload']._id}, req.body, (err, numRows: any) => {
            if (err) return next (err);
            if(numRows.nModified ===0) return next({ message: "Could not update the requested event", status: 500});
            res.json({ message: 'Your event has been updated!'});
        })
    }

    function attending(req: express.Request, res: express.Response, next: Function){}

    function notAttending(req: express.Request, res: express.Response, next: Function){}

    function remove(req: express.Request, res: express.Response, next: Function) {
      Event.findOneAndRemove({ _id: req.params.id, eventCreator: req['payload']._id }, (err) => {
        if (err) return next(err);
        res.json({message: "Event Deleted"});
      });
    }
}
