import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  disciplineId: String,
  attendedStudents: Array,
  missingStudents: Array,
  missingDocuments: Array,
});

const Lesson = mongoose.model('lesson', lessonSchema);

export default Lesson;
