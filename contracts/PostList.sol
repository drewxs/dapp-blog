// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PostList {
    uint public postCount = 0;

    struct Post {
        uint id;
        string author;
        string body;
    }

    mapping(uint => Post) public posts;

    function createPost(string memory _author, string memory _body) public {
        postCount ++;
        posts[postCount] = Post(postCount, _author, _body);
    }

    function getPosts() public view returns (Post[] memory) {
        Post[] memory postArray = new Post[](postCount);
        for (uint i = 0; i < postCount; i++) {
            postArray[i] = posts[i+1];
        }
        return postArray;
    }
}