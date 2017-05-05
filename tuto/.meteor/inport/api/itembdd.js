import {Mongo} from 'meteor/mongo'; //je veux utiliser mongo db

//collection bdd creation
export const itembdd = new Mongo.Collection("itembdd");
// pour etre utiliser par les autres fichiersexport
