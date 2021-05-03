const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();
chai.use(chaiHttp);

describe('new board', () => {
    it('should return a valid easy board', (done) => {
        chai.request();
        chai.request(app)
            .get('/newBoard?difficulty=easy')
            .end((err, response) => {
                response.body.should.have.length(9);
                let count = 0;
                response.body.map(x => x.map(y => typeof(y) === 'number' ? count++ : null));
                count.should.eq(36);
                done();
            });
    });

    it('should return a valid medium board', (done) => {
        chai.request();
        chai.request(app)
            .get('/newBoard?difficulty=medium')
            .end((err, response) => {
                response.body.should.have.length(9);
                let count = 0;
                response.body.map(x => x.map(y => typeof(y) === 'number' ? count++ : null));
                count.should.eq(27);
                done();
            });
    });

    it('should return a valid hard board', (done) => {
        chai.request();
        chai.request(app)
            .get('/newBoard?difficulty=hard')
            .end((err, response) => {
                response.body.should.have.length(9);
                let count = 0;
                response.body.map(x => x.map(y => typeof(y) === 'number' ? count++ : null));
                count.should.eq(20);
                done();
            });
    });

    it('should return an error if no difficulty passed in', (done) => {
        chai.request();
        chai.request(app)
            .get('/newBoard')
            .end((err, response) => {
                response.body.status.should.eq('error');
                response.body.errorMessage.should.eq('no difficulty specified');
                done();
            });
    });
});

describe('Validate Board', () => {
    it('should return false for valid board and true for finished board', (done) => {
        chai.request();
        const board = {
            board: [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ]
        }
        chai.request(app)
            .post('/validate')
            .send(board)
            .end((err, response) => {
                response.body.valid.should.eq(false);
                response.body.complete.should.eq(true)
                done();
            });
    });

    it('should return false for valid board and false for finished board', (done) => {
        chai.request();
        const board = {
            board: [ [ 1, 2, 3, 4, 5, 6, 7, 8, null ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, null, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
            [ null, 2, 3, 4, 5, 6, 7, 8, 9 ] ]
        }
        chai.request(app)
            .post('/validate')
            .send(board)
            .end((err, response) => {
                response.body.valid.should.eq(false);
                response.body.complete.should.eq(false)
                done();
            });
    });

    it('should return true for valid board and true for finished board', (done) => {
        chai.request();
        const board = {
            board: [ [ 8, 2, 6, 3, 4, 7, 5, 9, 1 ],
            [ 7, 3, 5, 8, 1, 9, 6, 4, 2 ],
            [ 1, 9, 4, 2, 6, 5, 8, 7, 3 ],
            [ 3, 1, 7, 5, 8, 4, 2, 6, 9 ],
            [ 6, 5, 9, 1, 7, 2, 4, 3, 8 ],
            [ 4, 8, 2, 9, 3, 6, 7, 1, 5 ],
            [ 9, 4, 8, 7, 5, 1, 3, 2, 6 ],
            [ 5, 6, 1, 4, 2, 3, 9, 8, 7 ],
            [ 2, 7, 3, 6, 9, 8, 1, 5, 4 ] ]
        }
        chai.request(app)
            .post('/validate')
            .send(board)
            .end((err, response) => {
                response.body.valid.should.eq(true);
                response.body.complete.should.eq(true)
                done();
            });
    });

    it('should return true for valid board and false for finished board', (done) => {
        chai.request();
        const board = {
            board: [ [ 8, 2, 6, 3, 4, 7, 5, 9, 1 ],
            [ 7, 3, 5, 8, 1, 9, 6, 4, 2 ],
            [ null, 9, 4, 2, 6, 5, 8, 7, 3 ],
            [ 3, 1, 7, 5, null, 4, 2, 6, 9 ],
            [ 6, 5, 9, 1, 7, 2, 4, 3, 8 ],
            [ 4, 8, 2, 9, 3, 6, 7, 1, null ],
            [ 9, null, 8, 7, 5, 1, 3, 2, 6 ],
            [ 5, 6, 1, 4, 2, 3, 9, 8, 7 ],
            [ 2, 7, 3, 6, 9, 8, 1, 5, 4 ] ]
        }
        chai.request(app)
            .post('/validate')
            .send(board)
            .end((err, response) => {
                response.body.valid.should.eq(true);
                response.body.complete.should.eq(false)
                done();
            });
    });

    it('should return true for valid board and true for finished board w/ strings', (done) => {
        chai.request();
        const board = {
            board: [ [ 8, 2, 6, 3, 4, 7, '5', 9, 1 ],
            [ 7, 3, 5, '8', 1, 9, 6, 4, 2 ],
            [ '1', 9, 4, 2, 6, '5', 8, 7, 3 ],
            [ 3, 1, 7, 5, 8, 4, 2, 6, 9 ],
            [ 6, 5, 9, 1, 7, 2, 4, 3, 8 ],
            [ 4, 8, 2, 9, 3, 6, 7, 1, 5 ],
            [ 9, '4', 8, 7, '5', 1, 3, 2, '6' ],
            [ 5, 6, 1, 4, 2, 3, 9, 8, 7 ],
            [ 2, 7, 3, 6, 9, 8, 1, 5, '4' ] ]
        }
        chai.request(app)
            .post('/validate')
            .send(board)
            .end((err, response) => {
                response.body.valid.should.eq(true);
                response.body.complete.should.eq(true)
                done();
            });
    });

    it('should return error message if no board passed in', (done) => {
        chai.request();
        chai.request(app)
            .post('/validate')
            .send()
            .end((err, response) => {
                response.body.status.should.eq('error');
                response.body.errorMessage.should.eq('invalid board');
                done();
            });
    });
});