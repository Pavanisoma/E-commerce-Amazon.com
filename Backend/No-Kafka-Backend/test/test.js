var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

ROOT_URL="https://amazonbackend273.herokuapp.com"

it("Get all Products", function (done) {
    chai.request(ROOT_URL)
        .get('/read/products')
        .end(function (err, res) {
            console.log(res)
            expect(res).to.have.status(200);
            done();
        });
});


it("Get products by seller Id", function (done) {
    chai.request(ROOT_URL)
        .get('/read/seller/product/1/')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
});

it("Get customer Profile", function (done) {
    chai.request(ROOT_URL)
        .get('/read/customer/profile/1')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
});

it("Get All categories", function (done) {
    chai.request(ROOT_URL)
        .get('/read/admin/category')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
});

it("top 5 sllers", function (done) {
    chai.request(ROOT_URL)
        .get('/read/admin/stats/top/seller')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
});

it("Get Orders by Customer Id", function (done) {
    chai.request(ROOT_URL)
        .get('/read/customer/orders/1')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
});

it("Get Votes by product Id", function (done) {
    chai.request(ROOT_URL)
        .get('/read/customer/product/votes/1')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
});

it("Get Cart by customer Id", function (done) {
    chai.request(ROOT_URL)
        .get('/read/customer/cart/1')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
});

it("get All Sellers", function (done) {
    chai.request(ROOT_URL)
        .get('/read/seller/profile')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
});

it("Get category by Id", function (done) {
    chai.request(ROOT_URL)
        .get('/read/admin/category/1')
        .end(function (err, res) {
            expect(res).to.have.status(200);
            done();
        });
});