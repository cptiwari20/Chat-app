[{
    id: 1234,
    name: "Vikas",
    room: "ABC"
}];

class Users {
    constructor() {
        this.users = []
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
    var user = this.getUser(id);
    if(user){
        this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
    }
    getUser(id){
        var user = this.users.filter((user) => user.id === id)[0];
        return user;
    }
    getUserList(room){
        var users = this.users.filter((user) => user.room === room);
        var nameArray = users.map((user)=>{
            return user.name;
        })
        return nameArray;
    }
};

module.exports = {Users};
//addUser(id, name, room);
// removeUser(id);
//getUser(id);
//getUsersList(room);

//Learning Classes
// class Person{
//     // constructor function
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//         // console.log(name, age)
//     }
//    // methods
//     getUserDescription () {
//         return `${this.name} is ${this.age} years old!`
//     }
// }
// var me = new Person("Vikas", 25);
// var description = me.getUserDescription();
// console.log(description)
