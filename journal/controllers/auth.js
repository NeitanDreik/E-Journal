import Student from '../models/student.js';
import bcrypt from 'bcryptjs';
import validate, { result } from '../validators/validateLoginRegisterData.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const studentData = req.body;
  const validateResult = validate(req.body);
  if (validateResult.status === 'ERROR') {
    return res.status(409).json(validateResult);
  }
  try {
    const student = await Student.findOne({ email: studentData.email });
    if (!student) {
      return res
        .status(409)
        .json(
          result(
            false,
            "Student with this email doesn't exists",
            'STUDENTDONTEXIST'
          )
        );
    }

    let passwordCompare = await bcrypt.compare(
      studentData.password,
      student.password
    );

    if (!passwordCompare) {
      return res
        .status(400)
        .json(result(false, 'Invalid password', 'BADPASSWORD'));
    }
    let token = jwt.sign({ _id: student._id }, process.env.SECRET);
    res.header('auth-token', token).status(200).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const studentData = req.body;
  const validateResult = validate(req.body);
  if (validateResult.status === 'ERROR') {
    return res.status(400).json(validateResult);
  }
  const checkEmail = await Student.findOne({ email: studentData.email });
  if (checkEmail) {
    return res
      .status(409)
      .json(
        result(false, 'Student with this email already exists', 'STUDENTEXISTS')
      );
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(studentData.password, salt);
  const newStudent = new Student({ ...studentData, password });
  try {
    await newStudent.save();
    const token = jwt.sign({ _id: newStudent._id }, process.env.SECRET);
    res.header('auth-token', token).status(200).send();
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
