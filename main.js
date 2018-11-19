const SHA256=require('crypto-js/sha256');

//the following are very basic parts of blocks

var index1 = 1;
var timestamp1 = "11/18/18";
var data1 = "First piece of data!";
var previousHash = 0;

//next line creates the hash by first adding all the "data"s together
//then running the SHA256 method on it, and toString-ing it.
var hash1 = SHA256(index1+timestamp1+data1+previousHash).toString();

//you can test it by changing some data; you'll get a diff hash.

console.log(hash1);

//in Terminal (this folder): node main.js