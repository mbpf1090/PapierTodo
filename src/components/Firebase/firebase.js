import app from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: "1:841489098233:web:b0158dd930c5cbc2",

  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.firestore();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
    
    doAddUserToDB = email => this.db.collection("User").doc(email).set({email: email});

    getTodosFromDB = email => this.db.collection("Todos").doc(email).collection("Todos").get();

    addTodoToDB = (email, todo) => this.db.collection("Todos").doc(email).collection("Todos").add({
      title: todo.title,
      done: todo.done,
    })

    removeTodoFromDB = (email, id) =>  this.db.collection("Todos").doc(email).collection("Todos").doc(id).delete();

    toggleDoneInDB = (email, id) => this.db.collection("Todos").doc(email).collection("Todos").doc(id).update({done: true});
  }



  export default Firebase;