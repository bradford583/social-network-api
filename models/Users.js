const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trime: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})

//get friend count
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const Users = model('Users', UsersSchema);

module.exports = Users;