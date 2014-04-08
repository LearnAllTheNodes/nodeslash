# NodeSlash - The Learn All The Nodes running project

## Current Episode

* [Watch:](http://www.learnallthenodes.com/episodes/19-bootstrap-and-node) Bootstrap and Node

Well, last, wee... episode, I mean, we integrated Less with NodeSlash, which we used to awesomely display a message in administrator blue.  That was a fun start, but this time we're going to kick it into high gear by integrating with Twitter Bootstrap.

### Notes

[Twitter Bootstrap](http://getbootstrap.com/)

#### Direct links to the bundles used in the episode (but it is highly recommended to actually go to the Bootstrap site so you get the latest versions!)
* [Bootstrap distribution (as of 8 April 2014)](https://github.com/twbs/bootstrap/releases/download/v3.1.1/bootstrap-3.1.1-dist.zip)
* [Bootstrap source (as of 8 April 2014)](https://github.com/twbs/bootstrap/archive/v3.1.1.zip)

    // Our navbar
    nav.navbar.navbar-default(role="navigation")
      .navbar-header
        button.navbar-toggle(type="button",data-toggle="collapse",data-target="#main_site_nav")
          span.sr-only Toggle navigation
          span.icon-bar
          span.icon-bar
          span.icon-bar
        a.navbar-brand(href="/")
          | NodeSlash

     .collapse.navbar-collapse#main_site_nav
       ul.nav.navbar-nav
         li
           a(href="/about") About
         li
           a(href="/sign_in") Sign in
         li
           a(href="/sign_up") Sign up

[Episode code](https://github.com/LearnAllTheNodes/nodeslash)

### Previous episodes' code

From Episode 17 on, all the NodeSlash code will be in 1 repo with a different tag for each episode.  To get the code for a particular episode, use the tags navigation above.
