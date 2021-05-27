import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  type: String,
  documentPhoto: String,
  studentId: String,
  expirationDate: Date,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Document = mongoose.model('document', documentSchema);

export default Document;
