var AWS=require('aws-sdk');
var uuid=require('uuid');
AWS.config.update({region:'ap-south-1'});
AWS.config.getCredentials(function(err) {
if(err) console.log(err.stack);
else{
console.log("Access key:", AWS.config.credentials.accessKeyId);
console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
}
});
console.log("Region: ", AWS.config.region);
var bucketName='mybucket-' + uuid.v4();
var keyName='sample.txt';
var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();
bucketPromise.then(
function(data) {
var objParams={Bucket:bucketName, Key:keyName, Body:'Madara you are successfull in deploying s3 bucket'};
var uploadPromise= new AWS.S3({apiVersion: '2006-03-01'}).putObject(objParams).promise();
uploadPromise.then(
function(data){
console.log(" Data was successfully uploaded to " + bucketName + "/" + keyName);
});
}).catch(
function(err) {
console.error(err,err.stack);
});