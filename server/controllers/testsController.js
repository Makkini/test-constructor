const {Completed_test} = require('../models/models')
const {Question, Test} = require('../models/models')
class testsController {

    async createTest(req, res) {
        try {
            const { title, questions, author_id } = req.body;

            const test = await Test.create({ title, author_id });

            for (const questionData of questions) {
                const { description, type, order } = questionData;

                const question = await Question.create({
                    description,
                    type,
                    order,
                    test_id: test.id,
                });
            }

            return res.json(test);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to create test', details: error.message });
        }
    }


    async getTestById(req, res) {
        try {
            const { id } = req.params;
            const test = await Test.findByPk(id);
            if (!test) {
                return res.status(404).json({ error: 'Test not found' });
            }
            return res.json(test);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to retrieve test 1' });
        }
    }

    async getAllTestsByUserId(req, res) {
        try {
            const { author_id } = req.query;
            if (!author_id) {
                return res.status(400).json({ error: 'Author ID is required' });
            }

            const tests = await Test.findAll({
                where: {
                    author_id: author_id
                }
            });

            return res.json(tests);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to retrieve tests 2' });
        }
    }



    async refreshTest(req, res) {
        try {
            const { id } = req.body; // Получаем ID теста из тела запроса
            const test = await Test.findByPk(id);

            if (!test) {
                return res.status(404).json({ error: 'Test not found' });
            }

            return res.json({ test, editMode: true });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to refresh test' });
        }
    }

    async deleteTestById(req, res) {
        try {
            const { id } = req.params;
            const deletedRowCount = await Test.destroy({
                where: {
                    id: id
                }
            });
            if (deletedRowCount === 0) {
                return res.status(404).json({ error: 'Test not found 3' });
            }
            return res.json({ message: 'Test deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to delete test' });
        }
    }

    async getCompletedTestByUser(req, res) {
        try {
            const userId = req.user.id;

            const completedTests = await Completed_test.findAll({
                where: {
                    userId: userId
                }
            });

            return res.json(completedTests);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to retrieve completed tests' });
        }
    }

    async getCompletedDetailedTestByUserId(req, res) {
        //NONE
    }
}

module.exports = new testsController()

