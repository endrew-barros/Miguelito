const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util')
const s3 = new aws.S3({
    accessKeyId: "AKIAW6IL6H7YPHSBURMU",
    secretAccessKey: "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",
    region: "us-east-1",
});
const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
PostSchema.pre('save', function () {
    if (!this.url) {
        this.url = `http://localhost:3333/file/${this.key}`;
    }
});
PostSchema.pre('remove', function () {
    if (storageTypes["s3"] === 's3') {
        return s3.deleteObject({
            bucket: "uploadmiguelito",
            key: this.key,
        }).promise()
    } else {
        return promisify(fs.unlink)(path.resolve(__dirname, "..", "tmp", "uploads", this.key))
    }
})
module.exports = mongoose.model('Post', PostSchema);