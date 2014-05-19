var fs = require('fs');
var path = require('path');
var Batch = require('batch');

module.exports = function stat(dir, cb, concurrency) {
	if (!dir || !cb) throw new Error('stat(dir, cb[, concurrency])');

	fs.readdir(dir, function(err, files) {
		if (err) return cb(err);
		if (!files) return cb(new Error('Got null files array from fs.readdir'));

		var batch = new Batch();
		batch.concurrency(concurrency || 10);

		files.forEach(function(file) {
			batch.push(function(done) {
				fs.stat(path.join(dir, file), done);
			});
		});

		batch.end(function(err, stats) {
			cb(err, stats, files);
		});
	});
}
