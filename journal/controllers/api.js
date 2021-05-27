import Student from '../models/student.js';
import Teacher from '../models/teacher.js';
import Discipline from '../models/discipline.js';
import Document from '../models/document.js';
import Journal from '../models/journal.js';
import Lesson from '../models/lesson.js';

export const getJournal = async (req, res) => {
  try {
    const journal = await Journal.find();
    return res.status(200).json(journal);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
export const getTeacherInfo = async (req, res) => {
  try {
    const teacherId = req.body.teacherId;
    const teacher = await Teacher.findById(teacherId);
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res
        .status(404)
        .json(result(false, "Can't find this teacher", 'NOTEACHER'));
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getDisciplineInfo = async (req, res) => {
  try {
    const disciplineId = req.body.disciplineId;
    const discipline = await Discipline.fndById(disciplineId);
    if (discipline) {
      res.status(200).json(discipline);
    } else {
      res
        .status(404)
        .json(result(false, "Can't find this discipline", 'NODISCIPLINE'));
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getStudentInfo = async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const student = await Student.findById(studentId);
    if (student) {
      res.status(200).json(student);
    } else {
      res
        .status(404)
        .json(result(false, "Can't find this student", 'NOSTUDENT'));
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const addStudentToLesson = async (req, res) => {
  try {
    const user = await Student.findById(req.student._id);
    const isStarosta = user.isStarosta;
    const lessonId = req.body.lessonId;
    const attended = req.body.attended || 'false';
    const studentId = req.body.studentId;
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(400).json('Cant find student');
    }
    if (!isStarosta) {
      return res.status(400).json('You are not starosta');
    }
    const journal = await Journal.findOne();
    const newJournalLesson = journal.lessons.find(
      (lsn) => lsn._id.toString() === lessonId
    );
    if (
      newJournalLesson.attendedStudents.includes(studentId) ||
      newJournalLesson.missingStudents.includes(studentId)
    ) {
      return res
        .status(400)
        .json('You already set up attendance for this student');
    }
    if (attended === 'true') {
      newJournalLesson.attendedStudents.push(studentId);
    } else {
      student.missedLessons = student.missedLessons + 1;
      student.save();
      newJournalLesson.missingStudents.push(studentId);
    }
    const t = journal.lessons.filter((l) => l._id.toString() !== lessonId);
    t.push(newJournalLesson);
    journal.lessons = t;
    journal.save((err, savedJournal) => {
      if (!err) {
        return res.status(200).json(savedJournal);
      } else {
        return res.status(400).json(err.message);
      }
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
export const addLesson = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id);
    const lessonInfo = req.body.lessonInfo;
    if (!student.isStarosta) {
      return res.status(400).json('You are not starosta');
    }
    const journal = await Journal.findOne();
    journal.lessons.push(new Lesson(lessonInfo));

    journal.save((err, savedJournal) => {
      if (!err) {
        return res.status(200).json(savedJournal);
      } else {
        return res.status(400).json(err.message);
      }
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
export const addDocument = async (req, res) => {
  try {
    const starosta = await Student.findById(req.student._id);
    const isStarosta = starosta.isStarosta;
    const lessonId = req.body.lessonId;
    const documentInfo = req.body.documentInfo;
    if (!isStarosta) {
      return res.status(400).json('You are not starosta');
    }
    const journal = await Journal.findOne();

    const tempDocuments = journal.lessons.find(
      (l) => l._id.toString() === lessonId
    );
    tempDocuments.missingDocuments.push(new Document(documentInfo));

    const t = journal.lessons.filter((l) => l._id.toString() !== lessonId);
    t.push(tempDocuments);
    journal.lessons = t;
    journal.save((err, savedJournal) => {
      if (!err) {
        return res.status(200).json(savedJournal);
      } else {
        return res.status(400).json(err.message);
      }
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (students) {
      res.status(200).json(students);
    } else {
      res.status(404).json(result(false, "Can't find students", 'NOSTUDENTS'));
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    if (teachers) {
      res.status(200).json(teachers);
    } else {
      res.status(404).json(result(false, "Can't find teachers", 'NOTEACHERS'));
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getDisciplines = async (req, res) => {
  try {
    const disciplines = await Discipline.find();
    if (disciplines) {
      res.status(200).json(disciplines);
    } else {
      res
        .status(404)
        .json(result(false, "Can't find disciplines", 'NODISCIPLINES'));
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
