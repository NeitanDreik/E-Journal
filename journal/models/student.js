import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  dateOfBirth: Date,
  email: String,
  gender: String,
  missedLessons: {
    type: Number,
    default: 0,
  },
  isStarosta: {
    type: Boolean,
    default: false,
  },
  password: String,
  phoneNumber: String,
});

const Student = mongoose.model('student', studentSchema);

export default Student;
