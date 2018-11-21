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
//that all was just a very simple sample of making a block
//below is the "real" code


//The Blockchain Class:
class propertyBlockChain{

    //the only thing the constructor will do is createGenesisBlock
    //(and "add" it to the chain in first spot)
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    //first block needs to be created by itself
    createGenesisBlock(){
        return new propertyBlock(0, "01-01-1905", "This property was created by deed.", "0");
    }

    //the most recent block added to the chain
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    //creates a new block
    addBlock(newBlock){
        //assign the last block's hash to this block's PreviousHash
        newBlock.previousHash = this.getLatestBlock().hash;
        //this hash will be created with method calculateHash
        newBlock.hash = newBlock.calculateHash();
        //add it to the chain
        this.chain.push(newBlock);

    }
}

//the Block Class:
class propertyBlock{
    //constructor includes all the "stuff" of the block
    //4 of 5 items are passed to it; current hash is created here
    construtor(index, timestamp, data, previousHash){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        //this property has to call a method to create it:
        this.hash = this.calculateHash();
    }

    //this method creates the block's hash (using SHA256 method)
    calculateHash(){
        return SHA256(this.index + this.previousHash +
            this.timestamp + this.data)
    }
}

//create your chain:
let myBlockChain = new propertyBlockChain;

//add two blocks (the first was genesis, created by the program)
myBlockChain.addBlock(new propertyBlock(1, "07-01-2005", "Property sold to M."));
myBlockChain.addBlock(new propertyBlock(2, "05-03-2015", "Property sold to S."));

//output the chain to the console:
console.log(JSON.stringify(myBlockChain, null, 4));