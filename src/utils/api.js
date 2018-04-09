import {REF_POSTS, REF_CATEGORIES, REF_USERS, firebaseApp} from './firebase';

export function getPosts() {
    return REF_POSTS.get().then(formatData);
}


export function getCategories() {
    return REF_CATEGORIES.get().then(formatData);
}

export function createNewPost(userId, post) {
    const ref = REF_POSTS.doc();

    return ref.set(post).then(_=> ref.id);
}


export function loginUser(email, password) {
    return new Promise((resolve, reject) => {

        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                getUserData(data.uid).then(userData => resolve({id: data.uid, data: userData}));
            })
            .catch(error => reject(error));
    });
}

export function registerNewUser(user) {
    return new Promise((resolve, reject) => {
        REF_USERS.where("username", "==", user.username).get().then(function (querySnapshot) {
            if (querySnapshot.empty) {
                firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password)
                    .then(data => {
                        saveUserData(data.uid, user);
                        resolve(data.uid, user);
                    })
                    .catch(error => reject(error));
            } else {
                reject({
                    message: "Another user with this username already exists"
                })
            }

        });

    });

}

function getUserData(id) {
    return REF_USERS.doc(id).get().then(doc => doc.data());
}

function saveUserData(id, user) {
    REF_USERS.doc(id).set(user);
}

function formatData(snapshot) {
    let result = [];

    snapshot.forEach(doc => {
        result.push(doc.data());
    });

    return result;
}
