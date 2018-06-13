const expect = require('expect');

const {Users} = require('./users');

beforeEach(() =>{
    users = new Users();
    users.users = [ {
        id: "1",
        name: 'xyz',
        room: "friends"
    },{
        id: "2",
        name: 'abc',
        room: "friends"
    },{
        id: "3",
        name: 'cpt',
        room: "frew"
    }
]
})

describe('Users', () =>{
    it('should add new User', () =>{
        var users = new Users();
        var user = {
            id: '123',
            name: "Vikas",
            room: "Room1"
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user])
    });
    it('should remove a user', () =>{
        var id = "3";
        var exUser = users.removeUser(id);
        expect(exUser.id).toBe(id)
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user', () =>{
        var id = "99";
        var exUser = users.removeUser(id);
        expect(exUser).toBeFalsy();
        expect(users.users.length).toBe(3);
    })

    it('should return a user', () =>{
        var user = users.getUser('2');
        expect(user.id).toEqual('2')
    });
    it('should not return a user', () =>{
        var user = users.getUser('99');
        expect(user).toBeFalsy();
    })

    it('should return name lists of users of friends room', () =>{
        var userList = users.getUserList('friends');
        expect(userList).toEqual(['xyz', 'abc']);
    });
    it('should return name lists of users of frew room', () =>{
        var userList = users.getUserList('frew');
        expect(userList).toEqual(['cpt']);
    })

})