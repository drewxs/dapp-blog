// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
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
}