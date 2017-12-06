import * as firebase from 'firebase';

exports.list = function(){
    return firebase.database().ref('tours')
}