import {Template} from 'meteor/templating';
import {Items} from '../api/items.js';
import './body.html';

Template.body.onCreated(function () {
    Meteor.subscribe('allItems');
});

Template.body.helpers({
    items() {
        return Items.find({});
    },
    loggedIn() {
        return Meteor.userId();
    }
});

Template.body.events({
    'submit .new'(event) {
        event.preventDefault();
        console.log("insertion");

        Meteor.call('createVote',event.target.itemOne.value,event.target.itemTwo.value)

        event.target.itemOne.value = '';
        event.target.itemTwo.value = '';
    },
    'click .vote1'(event) {
        console.log("1");
        Meteor.call('voteForOne',this._id,this.itemOne.value);
    },
    'click .vote2'(event) {
        console.log("2");
        Meteor.call('voteForTwo',this._id,this.itemTwo.value);
    },
    'click .delete'(event) {
        console.log("delete");
        Meteor.call('deleteVote',this._id);
    }
});
