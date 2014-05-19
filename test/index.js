var should = require('should');
var assert = require('assert');
var Mode = require('stat-mode');
var stat = require('../index');

var testdir = require('path').join(__dirname, 'files');
var nodir = require('path').join(__dirname, 'hello-world');
function noop() {}

describe('folder-stat', function() {
	it('should fail when arguments are missing', function() {
		(function() { stat(); }).should.throw();
		(function() { stat(testdir); }).should.throw();
	});

	it('should not fail when arguments are not missing', function() {
		(function() { stat(testdir, noop); }).should.not.throw();
		(function() { stat(testdir, noop, 10); }).should.not.throw();
	});

	it('should fail when given a nonexistant directory', function(done) {
		stat(nodir, function(err, stats) {
			err.should.be.an.Error;
			(stats === undefined).should.be.true;
			done();
		});
	});

	it('should return the correct stats', function(done) {
		stat(testdir, function(err, stats, files) {
			(err === null).should.be.true;
			stats.should.be.an.Array;
			files.should.be.an.Array;
			stats.length.should.eql(files.length).and.eql(2);

			files.should.containEql('dir1').and.containEql('file1');
			var dir1Idx = files.indexOf('dir1');
			var file1Idx = files.indexOf('file1');
			var dir1Stat = stats[dir1Idx];
			var file1Stat = stats[file1Idx];
			var dir1Mode = new Mode(dir1Stat);
			var file1Mode = new Mode(file1Stat);

			dir1Stat.should.be.an.Object;
			file1Stat.should.be.an.Object;

			dir1Mode.isDirectory().should.be.true;
			dir1Mode.isFile().should.be.false;
			file1Mode.isDirectory().should.be.false;
			file1Mode.isFile().should.be.true;

			// This doesn't verify any part of the mode except for the type
			// because on other platforms/filesystems they may not be the same.
			done();
		});
	});
});
