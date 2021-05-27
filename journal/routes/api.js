import express from 'express';
import {
  getJournal,
  getTeacherInfo,
  getDisciplineInfo,
  getStudentInfo,
  addStudentToLesson,
  addLesson,
  getStudents,
  getTeachers,
  getDisciplines,
  addDocument,
} from '../controllers/api.js';
import verifyToken from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/getJournal', verifyToken, getJournal);
router.post('/getTeacherInfo', verifyToken, getTeacherInfo);
router.post('/getDisciplineInfo', verifyToken, getDisciplineInfo);
router.post('/getStudentInfo', verifyToken, getStudentInfo);
router.post('/addStudentToLesson', verifyToken, addStudentToLesson);
router.post('/addLesson', verifyToken, addLesson);
router.post('/addDocument', verifyToken, addDocument);
router.get('/getStudents', verifyToken, getStudents);
router.get('/getTeachers', verifyToken, getTeachers);
router.get('/getDisciplines', verifyToken, getDisciplines);

export default router;
