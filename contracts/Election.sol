pragma solidity ^0.4.2;

contract Election {
    // Candidate Model
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store candidates
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    

    uint public candidatesCount;

    constructor() public {
        addCandidate("Nguyen Van A");
        addCandidate("Nguyen Van B");
    }

    function addCandidate(string _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _id) public {
        require(!voters[msg.sender]);

        require(_id > 0 && _id <= candidatesCount);
        
        voters[msg.sender] = true;
        candidates[_id].voteCount++;
    }
}