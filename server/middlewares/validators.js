const joi = require('@hapi/joi')

const { Response } = require('../helpers/utils');

const userResponse = new Response();


const onError = (error) => {
  if (error[0].type === 'any.required') {
    return new Error(`${error[0].path[0]} is required`);
  }

  return new Error(`${error[0].context.label}`);
};

const options = {
  language: {
    key: '{{key}} ',
  },
};

const validator = (req, res, schema, next) => {
  const { error } = joi.validate(req.body, schema, options)

  if (error) {

    userResponse.setError(400, error.message);
    return userResponse.send(res);
  }
  next();
}

class Validate {
  // Create new Property Validation
  static user(req, res, next) {
    const schema =
      joi.object().keys({
        firstname: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128)
          .required()
          .error(onError)
          .label('first name should have at least three alphabetic characters'),
        lastname: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128)
          .required()
          .error(onError)
          .label('last name should have at least three alphabetic characters'),
        email: joi.string().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required().error(onError)
          .label('please provide a valid email'),
        phoneNumber: joi.string().regex(/^[a-zA-Z0-9]+$/).min(10).max(13)
          .required()
          .error(onError)
          .label('please provide a valid phone number'),
        password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,128}$/)
          .required().error(onError)
          .label('password should have at least 6 characters, a uppercase,lowercase a number and a special character'),
        isAgent: joi.valid(true, false).label('isAgent can only be true or false').error(onError),

      })

    validator(req, res, schema, next);
  }

  static property(req, res, next) {
    // Update Property details validation
    const schema = joi.object().keys({
      state: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128)
        .required()
        .error(onError)
        .label('state should have at least three alphabetic characters'),
      city: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128)
        .required()
        .error(onError)
        .label('city should have at least three alphabetic characters'),
      price: joi.string().regex(/^[0-9]+$/).min(3).max(128)
        .required()
        .error(onError)
        .label('price should only include numbers'),
      type: joi.string().regex(/^[a-zA-Z]+$/).min(3).max(128)
        .required()
        .error(onError)
        .label('type should have at least three alphabetic characters'),
      address: joi.string().regex(/^[0-9]+$/).min(3).max(128)
        .required()
        .error(onError)
        .label('address should have at least three alphabetic or numeric characters')
    })
    validator(req, res, schema, next);
  }

  static priceUpdate(req, res, next) {
    const schema = joi.object().keys({
      price: joi.string().regex(/^[0-9]+$/).min(3).max(128)
        .required()
        .error(onError)
        .label('price should only include numbers'),
    })
    validator(req, res, schema, next);
  }


  static flag(req, res, next) {
    const schema = joi.object().keys({
      reason: joi.string().alphanum().required().error(onError)
        .label('please provide a valid reason'),
      description: joi.string().regex(/^[,. a-z0-9]+$/).required().error(onError)
        .label('please provide a valid description'),
    })
    validator(req, res, schema, next);
  }
}

module.exports = Validate;
