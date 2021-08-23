const User = require('../schema/User');
const valid = require('../validation/validate');

exports.getAllUsers = async(req, res, next) => {
  try{

    //check all users
    const users = await User.find({});

    //if users are not exist - return error
    if(users.length === 0) return res.json({message: 'Users are not exist'});
      
    return res.json(users);

  } catch (err){
    return next(err);
  }
};

exports.getUserById = async(req, res, next) => {
  try{

    //get user by id
    const user = await User.findById(req.params.id);

    //if user is not exist - return error
    if(!user) return res.json({message: 'User is not found'});
    
    //if user finded - return user
    return res.json({message: "Here is user", data: user });
    
  }catch(err){
    return next(err);
  }
};

exports.createUser = async(req, res) => {
  try{

    //check user data
    const checked = await valid.checkUserInfo(req, res);

    if(!checked.status) return res.json(checked);

    //get user data from request
    const { email, firstName, lastName, gender, dateOfBirth } = req.body;

    //get user by email
    const user = await User.findOne({email: email})

    //if user already exist - return info message
    if(user) return res.json({message: `User with email ${email} already exist`});

    //create user data
    const newUser = new User({
      email,
      firstName,
      lastName,
      gender,
      dateOfBirth
    });

    //save user in db
    const savedUser = await newUser.save();

    if(!savedUser) return res.json({ message: 'User is not saved !' });

    return res.json({ message: 'User is saved'});

  } catch (err) {
    return res.json({ message: 'Some error occurred while creating the User'});
  }
};

exports.editUser = async(req, res) => {
  try{

    //check user data
    const checked = await valid.checkUserInfo(req, res);

    if(!checked.status) return res.json(checked)

    // find and edit user with new data
    const editedUser = await User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });

    if(!editedUser) return res.json({ message: 'User is not edited !' });

    return res.json({ message: 'User is edited !' , data: editedUser});

  } catch (err) {
    return res.json({ message: 'Some error occurred while editing the User'});
  }
};

exports.deleteUser = async(req, res) => {
  try{

    //get user by id and remove
    const deletedUser = await User.findByIdAndRemove(req.params.id);

    if(!deletedUser) return res.json({ message: 'User is not deleted !' });

    return res.json({ message: 'User is deleted !' , data: deletedUser});
    
  }catch(err){
    return res.json({ message: 'Some error durring delete User'});
  }
};