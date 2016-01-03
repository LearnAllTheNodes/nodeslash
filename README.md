# NodeSlash - The Learn All The Nodes running project

## Current Episode

* [Watch: https://www.learnallthenodes.com/episodes/48-babel](https://www.learnallthenodes.com/episodes/48-babel)

    const foo = () => console.log('Hello, ES6!')

Such confuse. Very not understand.

This code snippet looks like a programming language, and it has a few traces of JavaScript in it.  But that doesn't look like it will work!

And you're right.  Both your browser and Node.js are going to struggle if you try to run this.

But what if I told you the code above was equivalent to the following?:

    var foo = function () {
      console.log('Hello, ES6!')
    }

Well it is, and I think it reads much cleaner, and that's why in this episode, we're going to start learning how to take that first snippet and make it work in Node.js.

### Notes

The Babel logo is from [the Babel project](http://babeljs.io/) itself

[ECMAScript at Wikipedia](https://en.wikipedia.org/wiki/ECMAScript)

[`.babelrc` documentation](http://babeljs.io/docs/usage/babelrc/)

### The modules we need

    npm install --save babel-core babel-preset-s2015 babel-register
    
### `.babelrc`

    {
      "presets": [ "es2015" ]
    }
    
### Entry point file: `babelMain.js`

    require('babel-register')

    require('./babelDemo')
    
### File with our ES6: `babelDemo.js`

    // babelDemo.js
    const foo = () => console.log('Hello, ES6!')
    
    foo()

### Previous episodes' code

From Episode 17 on, all the NodeSlash code will be in 1 repo with a different tag for each episode.  To get the code for a particular episode, use the tags navigation above.
