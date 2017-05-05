import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Runs } from '../api/runs.js';
import { Spots } from '../api/spots.js';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import './main.html';

Router.route('/', function () {
  this.render('root');
});

Router.route('/add/', function () {
  this.render('add');
});

Router.route('/show/', function () {
  this.render('show');
});

Template.add.helpers({
    loggedIn() {
        return (Meteor.user() != null);
    },
    all() {
        return Runs.find({});
    },
    spots() {
        return Spots.find({});
    }
});

Template.add.events({
    'submit .addRun'(event) {
        event.preventDefault();

        Runs.insert({
            'spot_name' : event.target.spot.value,
            'user_id' : Meteor.userId(),
            'user_name' : Meteor.user().emails[0].address,
            'date' : new Date(),
            'hauteur' : parseInt(event.target.hauteur.value),
            'vitesse' : parseInt(event.target.vitesse.value)
        });
      event.target.hauteur.value="";
      event.target.vitesse.value="";

    }
});

Template.show.onCreated(function() {
    Session.set("sortedData",[]);
});

Template.show.helpers({
    sortedData() {
        return(Session.get("sortedData"));
    },
    spots() {
        return Spots.find({});
    }
});

Template.show.events({
    //'submit .sortRun, change .change'(event) {
    'submit .sortRun'(event) {
        Tracker.autorun(function() {
            event.preventDefault();
            console.log(event.target.criteria.value);
            console.log(event.target.spot.value);
            criteria = event.target.criteria.value;
            spot = event.target.spot.value;
            if(criteria == 'hauteur') {
                console.log("hauteur");
                cursor = Runs.find({'spot_name' : spot},{sort: {hauteur : 1}});
                data = cursor.fetch();
                console.log(data);
                Session.set("sortedData",data);
            }
            if(criteria == 'vitesse') {
                console.log("vitesse");
                cursor = Runs.find({'spot_name' : spot},{sort: {vitesse : 1}});
                data = cursor.fetch();
                console.log(data);
                Session.set("sortedData",data);
            }
        });
    }
});
