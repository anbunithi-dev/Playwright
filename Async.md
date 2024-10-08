# JavaScript `setTimeout()` Method

The `setTimeout()` method is used to execute a block of code after a specified amount of time. It executes the code only once after the delay.

### Syntax
```javascript
setTimeout(function, milliseconds);
```

### Parameters
- **`function`**: A function containing the block of code to execute.
- **`milliseconds`**: The time (in milliseconds) after which the function will be executed.

### Example
```javascript
setTimeout(function() {
    console.log("Executed after 2 seconds");
}, 2000);
```

The `setTimeout()` method returns an `intervalID`, which is a positive integer representing the timer created.

---

# JavaScript Callback Function

A function in JavaScript is a block of code that performs a specific task when called.

### Example
```javascript
function greet(name) {
    console.log('Hi ' + name);
}

greet('Peter'); // Output: Hi Peter
```

You can also pass a function as an argument to another function. A function passed as an argument is known as a **callback function**.

### Example with Callback Function
```javascript
function greet(name, callback) {
    console.log('Hi ' + name);
    callback();
}

// Callback function
function callMe() {
    console.log('I am a callback function');
}

greet('Peter', callMe);
```

### Output
```
Hi Peter
I am a callback function
```

In this example, the `callMe()` function is passed as a callback to the `greet()` function.

---

# JavaScript Promises and Promise Chaining

A **Promise** is used to handle asynchronous operations in JavaScript. It allows you to execute code asynchronously and provides a way to handle the result once the operation is complete.

### States of a Promise:
- **Pending**: Initial state, the operation is not complete.
- **Fulfilled**: The operation is successfully completed.
- **Rejected**: The operation failed.

### Example of a Promise
```javascript
let promise = new Promise(function(resolve, reject) {
    // some asynchronous task
    let success = true;
    if (success) {
        resolve("Operation Successful");
    } else {
        reject("Operation Failed");
    }
});

promise.then(function(result) {
    console.log(result);
}).catch(function(error) {
    console.log(error);
});
```

### Output (if successful):
```
Operation Successful
```

### Promise Methods

1. **`Promise.resolve(value)`**
    - Returns a `Promise` that is resolved with the given value.
    ```javascript
    Promise.resolve("Resolved!").then((value) => console.log(value));
    // Output: Resolved!
    ```

2. **`Promise.reject(reason)`**
    - Returns a `Promise` that is rejected with the given reason.
    ```javascript
    Promise.reject("Error!").catch((error) => console.log(error));
    // Output: Error!
    ```

3. **`Promise.all(iterable)`**
    - Returns a single `Promise` that resolves when all promises in the iterable have resolved.
    ```javascript
    Promise.all([Promise.resolve(1), Promise.resolve(2)])
        .then((values) => console.log(values));
    // Output: [1, 2]
    ```

4. **`Promise.allSettled(iterable)`**
    - Returns a `Promise` that resolves after all promises have either resolved or rejected.
    ```javascript
    Promise.allSettled([Promise.resolve(1), Promise.reject("Error")])
        .then((results) => console.log(results));
    // Output: [{status: "fulfilled", value: 1}, {status: "rejected", reason: "Error"}]
    ```

5. **`Promise.race(iterable)`**
    - Returns a `Promise` that resolves or rejects as soon as one of the promises in the iterable resolves or rejects.
    ```javascript
    let p1 = new Promise((resolve) => setTimeout(resolve, 500, "One"));
    let p2 = new Promise((resolve) => setTimeout(resolve, 100, "Two"));

    Promise.race([p1, p2]).then((value) => console.log(value));
    // Output: Two
    ```

6. **`Promise.any(iterable)`**
    - Returns a `Promise` that resolves as soon as any of the promises in the iterable fulfill.
    ```javascript
    Promise.any([Promise.reject("Error"), Promise.resolve("Success!")])
        .then((value) => console.log(value));
    // Output: Success!
    ```

7. **`Promise.prototype.then(onFulfilled, onRejected)`**
    - Used to schedule actions when the promise is fulfilled or rejected.
    ```javascript
    Promise.resolve("Success!").then((value) => console.log(value));
    // Output: Success!
    ```

8. **`Promise.prototype.catch(onRejected)`**
    - Used to handle errors when the promise is rejected.
    ```javascript
    Promise.reject("Error!").catch((error) => console.log(error));
    // Output: Error!
    ```

9. **`Promise.prototype.finally(onFinally)`**
    - Executes a block of code when the promise is settled, regardless of whether it was resolved or rejected.
    ```javascript
    Promise.resolve("Success!")
        .finally(() => console.log("Cleanup!"));
    // Output: Cleanup!
    ```

---

### Key Takeaways:
- **`setTimeout()`**: Executes a function once after a delay.
- **Callback function**: A function passed as an argument to another function.
- **Promises**: Handle asynchronous operations with states of pending, fulfilled, or rejected.
- **Promise chaining**: Allows handling multiple promises and their results sequentially or concurrently.
