const mongoose = require('mongoose');
const questionSchema = require('./question.schema.server');

const quizWidgetSchema = mongoose.Schema(
    {
        '_id': Number,
        'questions': [
            {
                type: mongoose.Schema.Type.ObjectId,
                ref: 'QuestionModel'
            }
        ]
    },
    {collection: 'quiz-widgets'}
);

module.exports = quizWidgetSchema;