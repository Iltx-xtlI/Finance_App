import '@testing-library/jest-dom'

const Response = require('node-fetch').Response;
const Request = require('node-fetch').Request;

// Add json method to Response prototype if it doesn't exist
if (!Response.prototype.json) {
  Response.prototype.json = function() {
    return JSON.parse(this.body);
  };
}

global.Request = Request;
global.Response = Response;
global.NextResponse = {
  json: (body) => {
    const response = new Response(JSON.stringify(body), {
      headers: { 'content-type': 'application/json' },
    });
    // Add json method to this specific response instance
    response.json = () => Promise.resolve(body);
    return response;
  }
};