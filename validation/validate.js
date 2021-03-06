//check user email
function isValidEmail (data){

    const emailRegex= /^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,5})+$/;
  
    const _isValid = emailRegex.test(data.trim());
  
    if(!_isValid) return ({status: false, data});
  
    return ({status: true, data})
  }
  
  //check request data
  function isValidData (data){
  
    const reqDataRegex = /^([a-zA-Z0-9.])/;
  
    const _isValid = reqDataRegex.test(data.trim());
  
    if(!_isValid) return ({status: false, data});
  
    return ({status: true, data})
  }
  
  exports.checkUserInfo = async (req, res) => {
  
    //get user data
    let { email, firstName, lastName, gender, dateOfBirth } = req.body;
  
    if( gender == 'male' || gender == 'female')
    {
  
      //chechking all data
      const validEmail = await isValidEmail(email);
      if(!validEmail.status) return res.json({message: `${validEmail.data}_is incorrect`});
  
      const validFirstName = await isValidData(firstName);
      if(!validFirstName.status) return res.json({message: `${validFirstName.data}_is incorrect`});
  
      const validLastName = await isValidData(lastName);
      if(!validLastName.status) return res.json({message: `${validLastName.data}_is incorrect`});
  
      const validGender= await isValidData(gender);
      if(!validGender.status) return res.json({message: `${validGender.data}_is incorrect`});

      const validDateOfBirth = await isValidData(dateOfBirth);
      if(!validDateOfBirth.status) return res.json({message: `${validDateOfBirth.data}_is incorrect, type like this "DD.MM.YYYY"`});
      
      return {status: true};
      
      
    } else return res.json({message: 'Incorrect gender, Please type `male` or `female` fields'});
  };