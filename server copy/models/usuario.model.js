const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UsuarioSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    lastName:{
        type:String,
        required: [true, "lastName is required"],

    },
    email: {
        type: String,
        required: [true, "email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minglength: [3, "Password must be 8 characters or longer"]
  },
  rol: {
    type: String,
    required: [true],
},
  // isVerified : {
  //   type: Boolean, default: false
  // },
  // emailToken : {type: String},

},  { timestamps: true });

UsuarioSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

  UsuarioSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });
UsuarioSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

module.exports.Usuario = mongoose.model('Usuario', UsuarioSchema);

