//** ---Code START ---

const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema( //for MongoDB schema
  {
    loanNumber: {
        type: Number,
        required: [true, 'A loan must have an id'],
        maxlength: [5, 'A loan number must have 5 digits'],
        minlength: [5, 'A loan number must have 5 digits'],
        unique: true,
    },
    loanType: {
        type: String,
        required: [true, 'A loan must have a loan type'],
        trim: true,
        maxlength: [40, 'A loan type must have less than or equal to 40 characters'],
        minlength: [4, 'A loan type must have greater than or equal to 4 characters']
    },
    loanAmount: {
        type: Number,
        required: [true, 'A loan must have a loan amount'],
        max: [600000, 'A loan must be less than or equal to $600,000'],
        min: [100, 'A loan must be greater than or equal to $100']
    },
    interestRate: {
        type: Number,
        required: [true, 'A loan must charge interest'],
        max: [.30, 'Interest must be less than or equal to 30%'],
        min: [.02, 'Interest must be greater than or equal to 2%']
    },
    loanTerm: {
        type: Number,
        required: [true, 'A loan must have a term'],
        max: [30, 'A loan term must be less than or equal to 30 years'],
        min: [1, 'A loan term must be greater than or equal to 1 year']
    },
    startDate: {
        type: String,
        required: [true, 'A loan must have a start date'],
        trim: true,
        maxlength: [20, 'A start date must have less than or equal to 20 characters'],
        minlength: [7, 'A start date must have greater than or equal to 10 characters']
    },
    customer_id: {
        type: Number,
        required: [true, 'A loan must have a customer id'],
        unique: true,
    },
    createdDate: { type: Date }, //set up for autopopulation
    modifiedDate: { type: Date }
});
loanSchema.pre('save', function(next){  // from Stack Overflow "add created_at and updated_at fields to mongoose schemas"
    now = Date();
    this.modifiedDate = now;
    if ( !this.createdDate ) {
      this.createdDate = now;
    }
    next();
  });
  loanSchema.pre('findOneAndUpdate', function(next){  // from Stack Overflow "add created_at and updated_at fields to mongoose schemas"
    this.set({ modifiedDate: new Date() });
    next();
  });

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
//** code  END