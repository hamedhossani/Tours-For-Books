import * as firebase from 'firebase';

exports.url = function(name){
    return firebase.storage().ref().child(name).getDownloadURL()
}