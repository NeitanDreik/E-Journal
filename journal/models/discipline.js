import mongoose from 'mongoose';

const disciplineSchema = new mongoose.Schema({
  teacherId: String,
  lectionHoursAmount: Number,
  practiceHoursAmount: Number,
  name: String,
});

const Discipline = mongoose.model('discipline', disciplineSchema);

export default Discipline;
