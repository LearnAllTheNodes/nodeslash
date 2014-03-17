# NodeSlash - The Learn All The Nodes running project

## Current Episode

* [Watch:](http://www.learnallthenodes.com/episodes/18-less-is-moar)

When I show up at a homepage like how NodeSlash's currently is, I know I'm just itching to whip out my payment card and send that company some money.  Everything about it screams professionalism and increases my trust factor.

Oh wait.  No, that's the exact opposite this homepage screams.  We need to clean this up so that NodeSlash doesn't look like a complete wasteland, or worse, a warez site.

Enter Less.  Less is what we call a CSS pre-processor.  Browsers for right now only understand CSS, yet writing raw CSS I think is a real pain sometimes.  Especially as a developer.  Let's have a look at some of the problems that Less solves.

### Notes

[Less homepage](http://lesscss.org/)

[less-middleware](https://github.com/emberfeather/less.js-middleware)

[less npm module](https://www.npmjs.org/package/less)

    // Configure less
    var lessMiddleware = require('less-middleware')
      , lessMiddlewareOptions = {
          dest: App.appPath('/public')
        , relativeUrls: true
        , force: App.env === 'development'
        , once: App.env !== 'development'
        , debug: App.env === 'development'
        , preprocess: {
            path: function(pathname,req) {
              console.log(pathname)
              return pathname.replace('/stylesheets', '')
            }
          }
        }
      , lessParserOptions = {
          dumpLineNumbers: 'mediaquery'
        }
      , lessCompilerOptions = {
          compress: App.env !== 'development'
        }
    
    App.app.use(lessMiddleware(
      App.appPath('app/stylesheets')
    , lessMiddlewareOptions
    , lessParserOptions
    , lessCompilerOptions
    ))

    // example of nesting styles and a variable
    @administrator-text-color: #00B4FF;
    
    .system_message {
      background-color: #EEE;
      padding: 15px;
    
      p {
        color: @administrator-text-color;
      }
    }

### Previous episodes' code

From Episode 17 on, all the NodeSlash code will be in 1 repo with a different tag for each episode.  To get the code for a particular episode, use the tags navigation above.
