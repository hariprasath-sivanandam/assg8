const mongoose = require('mongoose');
// const studentModel = require('./student.model.server');
// const questionModel = require('./question.model.server');

const answerSchema = mongoose.Schema(
    {
        '_id': Number,
        'trueFalseAnswer': Boolean,
        'multipleChoiceAnswer': Number,
        'student': {type: mongoose.Schema.Types.Number, ref: 'StudentModel'},
        'question': {type: mongoose.Schema.Types.Number, ref: 'QuestionModel'}
    },
    {collection: 'answers'}
);
module.exports = answerSchema;
