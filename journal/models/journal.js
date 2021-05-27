import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  lessons: Array,
});

const Journal = mongoose.model('journal', journalSchema);

export default Journal;
