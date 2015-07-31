# NodeSlash - The Learn All The Nodes running project

## Current Episode

* [Watch:](http://www.learnallthenodes.com/episodes/42-dont-put-credentials-into-source-control)

Web apps these days tend to not implement everything that they appear to do.  There's a wealth of external services out there, such as Amazon's S3, SendGrid, and others.

Our apps can take advantage of these services, and to do so usually requires some sort of authentication credentials.  Especially if we're building an open-source project, it could be disastrous if we accidentally put those credentials into source control.  Imagine if the whole world were able to spin up Amazon servers using your credentials and consequently your credit card.  We don't want that.

In this episode, we're going to look at a nice way to make development easy while at the same time protecting our sensitive credentials.

### Notes

[Opening clipart](https://openclipart.org/detail/169128/simple-electronic-safety-vault)

[Twelve-factor app](http://12factor.net/)

[`dotenv`](https://www.npmjs.com/package/dotenv)

[`nodemailer-sendgrid-transport`](https://github.com/sendgrid/nodemailer-sendgrid-transport)

[Thief clipart](https://openclipart.org/detail/165656/burglar)

[Foot clipart](https://openclipart.org/detail/66679/foot)

### Previous episodes' code

From Episode 17 on, all the NodeSlash code will be in 1 repo with a different tag for each episode.  To get the code for a particular episode, use the tags navigation above.
