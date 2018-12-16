const mongoose = require('mongoose');
const studentModel = require('../models/student.model.server');
const questionModel = require('../models/question.model.server');
const answerModel = require('../models/answer.model.server');


const allStudents = [{
    '_id': 123,
    'username': 'alice',
    'password': 'alice',
    'firstName': 'Alice',
    'lastName': 'Wonderland',
    'gradYear': 2020,
    'scholarship': 15000
},
    {
        '_id': 234,
        'username': 'bob',
        'password': 'bob',
        'firstName': 'Bob',
        'lastName': 'Hope',
        'gradYear': 2021,
        'scholarship': 12000
    }];

const allQuestions =
    [{
        '_id': 321,
        'question': 'Is the following schema valid?',
        'points': 10,
        'questionType': 'TRUE_FALSE',
        'trueFalse': {
            '_id': 1,
            'isTrue': false
        }
    },{
        '_id': 432,
        'question': 'DAO stands for Dynamic Access Object',
        'points': 10,
        'questionType': 'TRUE_FALSE',
        'trueFalse': {
            '_id': 2,
            'isTrue': false
        }
    },
        {
            '_id': 543,
            'question': 'What does JPA stand for?',
            'points': 10,
            'questionType': 'MULTIPLE_CHOICE',
            'trueFalse': {
                '_id': 1,
                'choices': 'Java Persistence API, ' +
                'Java Persited Application, ' +
                'Javascript Persistence API,' +
                'JSON Persistent Associations',
                'correct': 1
            }
        },
        {
            '_id': 654,
            'question': 'What does ORM stand for?',
            'points': 10,
            'questionType': 'MULTIPLE_CHOICE',
            'trueFalse': {
                '_id': 2,
                'choices': 'Object Relational Model, ' +
                'Object Relative Markup, ' +
                'Object Reflexive Model,' +
                'Object Relational Mapping',
                'correct': 4
            }
        }
    ];

const allAnswers = [
    {
        '_id': 123,
        'student': 123,
        'question': 321,
        'trueFalseAnswer': true
    },
    {
        '_id': 234,
        'student': 123,
        'question': 432,
        'trueFalseAnswer': false
    },
    {
        '_id': 345,
        'student': 123,
        'question': 543,
        'multipleChoiceAnswer': 1
    },
    {
        '_id': 456,
        'student': 123,
        'question': 654,
        'multipleChoiceAnswer': 2
    },
    {
        '_id': 567,
        'student': 234,
        'question': 321,
        'trueFalseAnswer': false
    },
    {
        '_id': 678,
        'student': 234,
        'question': 432,
        'trueFalseAnswer': true
    },
    {
        '_id': 789,
        'student': 234,
        'question': 543,
        'multipleChoiceAnswer': 3
    },
    {
        '_id': 890,
        'student': 234,
        'question': 654,
        'multipleChoiceAnswer': 4
    }

];

populateDatabase = () => Promise.all(allAnswers.map(answer => answerQuestion(answer))
    .concat(allStudents.map(student => createStudent(student)))
    .concat(allQuestions.map(question => createQuestion(question))))
    .then(() => console.log("the database has been populated successfully...."));

truncateDatabase = () => Promise.all([truncateAnswers(), truncateQuestions(), truncateStudents()])
    .then(() => console.log("the database has been truncated successfully..."));

// ------------------Answer Model--------------------
answerQuestion = (answer) => answerModel.create(answer);

deleteAnswer = answerId => answerModel.remove({'_id': answerId});

deleteAnswerByQuestion = questionId => answerModel.remove({'question': questionId});

findAllAnswers = () => answerModel.find();

findAnswerById = answerId => answerModel.findById(answerId);

findAnswersByStudent = studentId => answerModel.find({'student': studentId});

getAnswerByStudent = (sid, qid) => answerModel.find({student: sid, question: qid}).populate('student').populate('question');

findAnswersByQuestion = questionId => answerModel.find({'question': questionId});

truncateAnswers = () => answerModel.remove({});

// --------------------------------------------------------


//----------------Question Model-----------------------------
createQuestion = question =>
    questionModel.create(question)
        .then(result => console.log("Que =>" + result))
        .catch(err => console.log(err));

findAllQuestions = () => questionModel.find();

findQuestionById = questionId => questionModel.findById(questionId);

deleteQuestion = questionId => questionModel.remove({'_id': questionId});

updateQuestionById = (qid, q) => questionModel.updateOne({_id: qid}, {$set: q});

truncateQuestions = () => questionModel.remove({});
//-----------------------------------------------------------



//----------------Student Model-----------------------------
createStudent = student =>
    studentModel.create(student).then(result => console.log(result))
        .catch(err => console.log(err));

findAllStudents = () =>
    studentModel.find();

findStudentById = studentId =>
    studentModel.findById(studentId);

updateStudent = (studentId, student) =>
    studentModel.update({'_id': studentId}, {$set: student});

deleteStudent = studentId => studentModel.deleteOne({_id: studentId});

truncateStudents = () =>
    studentModel.remove({});
//-----------------------------------------------------------


module.exports =
    {createStudent, truncateStudents, findAllStudents, findStudentById, updateStudent, deleteStudent,
        truncateQuestions, findAllQuestions, findQuestionById, createQuestion, deleteQuestion,
        getAnswerByStudent, updateQuestionById, answerQuestion, deleteAnswer, deleteAnswerByQuestion,  findAllAnswers, findAnswerById, findAnswersByStudent, findAnswersByQuestion, truncateAnswers,
        populateDatabase, truncateDatabase,
        };
