# Swizzle Sticks

Swizzle Sticks is a web app to track cocktails recipes, mark them as made, with notes to be written, recipes to be favorited, and spirits inventory to track.

## Getting Started

These instructions will get a copy of the project up and running on your local machine for development purposes.

### Prerequisites

This project uses MongoDB to store the data, and therefor requires that Mongo DB be installed. For more information on installing MongoDB locally, see [Installing MongoDB](https://docs.mongodb.com/manual/installation/#tutorial-installation).

### Installing

1. Install needed dependencies.

    `$ npm install`

1. Start the mongoDB server. ie:

    ```bash
    $ cd c:\Program Files\MongoDB\Server\3.4\bin
    $ mongod.exe --dbpath c:\Users\<USER>\mongoData
    ```

## Running the tests

Testing is done with mocha, expect, and supertest.

```bash
$ npm test
```

```bash
$ npm run test-watch
```


## Deployment

## Built With

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [mongoose](http://mongoosejs.com/) - MongoDB validation
- [Express](https://expressjs.com/)

## Contributing

No formal plan is in place for contributing.

## License

As of this moment in life, no license is in place for use of this code.

## Acknowledgments

- Inspired by [The Complete Node.js Developer Course (2nd Edition)](https://www.udemy.com/the-complete-nodejs-developer-course-2/learn/v4/overview)
