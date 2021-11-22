//require users model
const { Users } = require('../models');

//set up users controller
const usersController = {

    //create user
    createUsers({ body }, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },

    // get all users
    getAllUsers(req, res) {
        Users.find({})
        //populate users thoughts
        .populate({path: 'thoughts', select: '-__v'})
        //populate user friends
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getUsersById({ params }, res) {
        Users.findOne({ _id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    updateUsers({ params }, res) {
        Users.findOneAndUpdate({ _id: params.id })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found with this id!' })
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    deleteUsers({ params }, res) {
        Users.findOneAndDelete({ _id: params.id })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found with this id!' })
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    addFriend({ params }, res) {
        Users.findOneAndUpdate({ _id: params.id }, {$push: {friends: params.friendId}}, { new: true })
        .populate({ path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found with this id!' })
                return
            }
            res.json(dbUsersData)
        })
        .catch(err => res.json(err))
    },

    deleteFriend({ parmas }, res) {
        Users.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId } }, { new: true })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found with this id' })
                return
            }
            res.json(dbUsersData)
        })
        .catch(err => res.status(400).json(err))
    }
};

module.exports = usersController;