/**
 *@author dejijaye
 */

let moduleId = 'password/password';

let waterfall = require('async').waterfall;
let crypto = require('crypto');
let User = require('../../../models/user').User;
let response = require("../../../../utils/response");
let http = require("../../../../utils/HttpStats");
let mailer = require('../../../../utils/nodemailer');

/**
 * Route handler to reset password
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<*>}
 */
exports.forgotPassword = (req, res, next) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  waterfall([
    async () => {
      try {
        let buff = await crypto.randomBytes(20);
        if(buff) {
          let token = buff.toString('hex');
          console.log(token)
          // done(null, token);
          return token
        }
      } catch(err) {
        throw new Errow(err);
      }
    },
    async (token) => {
      if(req.body.email) {
        try{
          let user = await User.findOne({email: req.body.email}).exec();
          // console.log(user);
          if(!user) respondErr(http.BAD_REQUEST, 'User not found');
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          let updatedUser = await user.save();
          if(updatedUser) return {token, user};
        } catch(err) {
          throw new Error(err);
        }

      } else respondErr(http.BAD_REQUEST, 'Email cannot be blank');
    },
    (obj, done)  => {
      let {token, user} = obj;
      let subject = `Password Reset`;
      let body = `You are receiving this because you (or someone else) have requested the reset of the password for your account.<br/><br/>
      Please click on the following link, or paste this into your browser to complete the process:<br/><br/>
      http://${req.headers.host}/password/reset/${token} <br/><br/> If you did not request this, please ignore the email and your password will remain unchanged.<br/><br/>The Storapp Team`
      
      mailer.send(
        subject,
        body,
        user.email,
        [],
        [],
        '<donotreply@releaf.ng>',
        (err) => {
            if(!err) respond(http.OK, `Reset password email successfully sent to ${user.email}`, res);
            else done(err);
        }
      );
    }
  ], (err) => {
    if(err) return next(err);
  })
}

exports.validate = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  try {
    let user = await User.findeOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }).exec();
    if(!user) return respondErr(http.BAD_REQUEST, 'Password reset token is either invalid or has expired');
    res.redirect(`/password/reset/${req.params.token}`);
  } catch(err){
    respondErr(http.SERVER_ERROR, 'Oops! The server returned an error', err); 
  }
}

exports.reset = (req, res, next) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let pwdDetails = req.body;
  waterfall([
    async () => {
      try{
        let user = await User.findOne({ resetPasswordToken: req.param.token, resetPasswordExpires: { $gt: Date.now() } }).exec();
        if(user && pwdDetails.newPwd === pwdDetails.verifyPwd) {
          user.password = pwdDetails.newPwd;
          await user.save();
          user.resetPasswordToken = null;
          user.resetPasswordExpires = null;
          await user.save();
          return user
        }
        
      } catch(err) {
        console.log(err)
        respondErr(http.BAD_REQUEST, 'Something went wrong', err);
      }
    },
    (user, done) => {
      // Todo: Create a template for the email
      const subject = 'Your password has been changed';
      const body = `Hello.<br/><br/>This is a confirmation that the password for your account ${user.email} has just been changed.<br/><br/>The Storapp Team`
      
      mailer.send(
          subject,
          body,
          user.email,
          [],
          [],
          '<donotreply@releaf.ng>',
          (err) => {
              if(!err) respond(http.OK, 'Password successfully changed', res);
              else done(err);
          }
      );
    }
  ], (err) => {
    if(err) next(err);
  })
}

exports.change = async (req, res) => {
  console.log('change password');
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let pwdDetails = req.body;
  // console.log(req);
  if(!req.user) respondErr(http.UNAUTHORIZED, 'User not signed in');
  else {
    if(!pwdDetails.newPwd) respondErr(http.BAD_REQUEST, 'Please provide a password');
    else if(pwdDetails.oldPwd === pwdDetails.newPwd) respondErr(http.BAD_REQUEST, 'New password cannot be same as current');
    else if(pwdDetails.newPwd !== pwdDetails.verifyPwd) return respondErr(http.BAD_REQUEST, 'Password do not match');
    else {
      try{
        let user = await User.findById({_id: req.user._id}).exec();
        console.log(user.password, 'before save');
        if(!user) return respondErr(http.BAD_REQUEST, 'Account not found');
        // TODO: refactor
        user.validPass(pwdDetails.oldPwd).then(match => {
          if(!match) return respondErr(http.BAD_REQUEST, 'Current password is incorrect');
          else {
            user.password = pwdDetails.newPwd;
            user.save(err => {
              if(err) return respondErr(http.SERVER_ERROR, 'Saving failed');
              else {
                console.log(user.password, 'after save')
                req.login(user, err => {
                  if(err) return respondErr(http.SERVER_ERROR, 'login failed');
                  return respond(http.OK, 'Password successfully changed');
                })
              }
            });
            
          }
        }).catch(err => {
          console.log(err);
        })
      } catch(err) {
        console.log(err)
        respondErr(http.SERVER_ERROR, 'Something went wrong')
      }
    }
  }
}
