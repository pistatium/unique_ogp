var crypto = require('crypto');

exports.md5 = function(src) {
    var md5 = crypto.createHash('md5');
    md5.update(src, 'utf8');
    return md5.digest('hex');
};
