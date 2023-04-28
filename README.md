# Client DOM XSS Vulnerability and Remediation Demo

The purpose of this example is to show how a script can be embedded in `window.location.href` to perform a client side DOM XSS attack.

This demonstrates that `JSON.parse` can not be considered a proper sanitizer.  It also demonstrates a False-Negative static analysis detection miss when the data flow analysis ends in the scope of a lambda expression.


# How to Run

Assuming you have Node.JS installed, execute `npm install` followed by `npm run`.  Navigate to `http://localhost:3000` to see that application.





