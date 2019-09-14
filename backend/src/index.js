const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const fs = require('fs')
const https = require('https')

const resolvers = {
  Query: {
    feed: (parent, args, context) => {
      return context.prisma.posts({ where: { published: true } })
    },
    drafts: (parent, args, context) => {
      return context.prisma.posts({ where: { published: false } })
    },
    post: (parent, { id }, context) => {
      return context.prisma.post({ id })
    },
  },
  Mutation: {
    createDraft(parent, { title, content }, context) {
      return context.prisma.createPost({
        title,
        content,
      })
    },
    deletePost(parent, { id }, context) {
      return context.prisma.deletePost({ id })
    },
    publish(parent, { id }, context) {
      return context.prisma.updatePost({
        where: { id },
        data: { published: true },
      })
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma
  },
})

server.start(() => {

  let host = 'askeus.azurewebsites.net';
  
  // NOTE: Replace this with a valid endpoint key.
  // This is not your subscription key.
  // To get your endpoint keys, call the GET /endpointkeys method.
  let endpoint_key = "0184cde1-e730-4d8b-91bf-25b31709eedb";

  // NOTE: Replace this with a valid knowledge base ID.
  // Make sure you have published the knowledge base with the
  // POST /knowledgebases/{knowledge base ID} method.
  let kb = "cc7ea634-3238-45dc-8445-5bc35dcb59cf";

  let method = "/qnamaker/knowledgebases/" + kb + "/generateAnswer";

  let question = {
      'question': 'how to get eu resident permit?',
      'top': 3
  };

  let pretty_print = function (s) {
    return JSON.stringify(JSON.parse(s), null, 4);
  }

  // callback is the function to call when we have the entire response.
  let response_handler = function (callback, response) {
      let body = '';
      response.on ('data', function (d) {
          body += d;
      });
      response.on ('end', function () {
  // Call the callback function with the status code, headers, and body of the response.
      callback ({ status : response.statusCode, headers : response.headers, body : body });
      });
      response.on ('error', function (e) {
          console.log ('Error: ' + e.message);
      });
  };

  // Get an HTTP response handler that calls the specified callback function when we have the entire response.
  let get_response_handler = function (callback) {
  // Return a function that takes an HTTP response, and is closed over the specified callback.
  // This function signature is required by https.request, hence the need for the closure.
    return function (response) {
      response_handler (callback, response);
    }
  }

  // callback is the function to call when we have the entire response from the POST request.
  let post = function (path, content, callback) {
    let request_params = {
      method : 'POST',
      hostname : host,
      path : path,
      headers : {
        'Content-Type' : 'application/json',
        'Content-Length' : Buffer.byteLength(content),
        'Authorization' : 'EndpointKey ' + endpoint_key,
      }
    };

    // Pass the callback function to the response handler.
    let req = https.request (request_params, get_response_handler (callback));
    req.write (content);
    req.end ();
  }

  // callback is the function to call when we have the response from the /knowledgebases POST method.
  let get_answers = function (path, req, callback) {
    console.log ('Calling ' + host + path + '.');
  // Send the POST request.
    post (path, req, function (response) {
      callback (response.body);
    });
  }

  // Convert the request to a string.
  let content = JSON.stringify(question);
  get_answers (method, content, function (result) {
  // Write out the response from the /knowledgebases/create method.
    console.log (pretty_print(result));
  });

  console.log('Server is running on http://localhost:4000');
})
