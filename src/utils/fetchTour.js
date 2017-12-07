import * as firebase from 'firebase';

exports.list = function(){
    return firebase.database().ref('tours')
}

exports.byId = function(id){
    return firebase.database().ref('/tours/' + id)
}