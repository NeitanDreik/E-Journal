import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  dateOfBirth: Date,
  email: String,
  kafedraId: String,
  doljnost: String,
  phoneNumber: String,
});

const Teacher = mongoose.model('teacher', teacherSchema);

export default Teacher;
