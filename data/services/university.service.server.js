const universityDao = require('../daos/university.dao.server');


module.exports = app => {
    const populateDatabase = (req, res) => {
        universityDao.populateDatabase()
            .then(res.send(true))
    };

    const truncateDatabase = (req, res) => {
        universityDao.truncateDatabase()
            .then(res.send(true))
    };

    const createStudent = (req, res) => {
        universityDao.createStudent(req.body)
            .then(student => res.send(student))
            .catch(err => res.send(err));
    };

    const findAllStudents = (req, res) => {
        universityDao.findAllStudents()
            .then(student => res.json(student))
            .catch(err => res.send(err));
    }

    const findStudentById = (req, res) => {
        universityDao.findStudentById(req.params.id)
            .then(std => res.json(std))
            .catch(err => res.send(err));
    }

    const updateStudentById = (req, res) => {
        universityDao.updateStudent(req.params.id,req.body)
            .then(std => res.json(std))
            .catch(err => res.send(err));
    }
    const deleteStudentById = (req, res) => {
        universityDao.deleteStudent(req.params.id)
            .then(student => res.json(student))
            .catch(err => res.send(err));
    }

    const createQuestion = (req, res) => {
        universityDao.createQuestion(req.body)
            .then(question => res.json(question))
            .catch(err => res.send(err));
    }

    const findAllQuestions = (req, res) => {
        universityDao.findAllQuestions()
            .then(stud => res.json(stud))
            .catch(err => res.send(err));
    }

    const findQuestionById = (req, res) => {
        universityDao.findQuestionById(req.params.id)
            .then(question => res.json(question))
            .catch(err => res.send(err));
    }

    const answerQuestion = (req, res) => {
        universityDao.answerQuestion(req.params.sid, req.params.qid, req.body)
            .then(a => res.send(a))
            .catch(err => res.send(err));
    }

    const updateQuestionById = (req, res) => {
        universityDao.updateQuestionById(req.params.id,req.body)
            .then(qst => res.json(qst))
            .catch(err => res.send(err));
    }

    const deleteQuestionById = (req, res) => {
        universityDao.deleteQuestion(req.params.id)
            .then(question => res.json(question))
            .catch(err => res.send(err));
    };

    const getAnswerByStudent = (req, res) => {
        universityDao.getAnswerByStudent(req.params.sid, req.params.qid)
            .then(a => res.send(a))
            .catch(err => res.send(err));
    }

    app.post('/api/populate', populateDatabase);
    app.delete('/api/all', truncateDatabase);
    app.post('/api/student', createStudent);
    app.get('/api/student', findAllStudents);
    app.get('/api/student/:id', findStudentById);
    app.put('/api/student/:id', updateStudentById);
    app.delete('/api/student/:id', deleteStudentById);

    app.post('/api/question', createQuestion);
    app.get('/api/question', findAllQuestions);
    app.get('/api/question/:id', findQuestionById);
    app.put('/api/question/:id', updateQuestionById);
    app.delete('/api/question/:id', deleteQuestionById);

    app.post('/api/student/:sid/question/:qid/answer', answerQuestion);
    app.get('/api/student/:sid/question/:qid/answer', getAnswerByStudent);
    app.get('/api/question/:qid/student/:sid/answer', getAnswerByStudent);

};
