/*
  Exercise 3
  DOM manipulation with vanilla JS
*/

// Task
// What does DOM stand for?
// The DOM stands for Document Object Model



// Task
// Open the file index.html in AWS Cloud9. Click "Preview" > "Preview File index.html". (Note that you can open it in a new window). What do you see?
// If you are working locally, navigate to the excercise directory and start a python http server `python3 -m http.server 900`, press Control-c to stop the server 



// Task
// Delete the div with the class rectangle from index.html and refresh the preview.



// Task
// What does the following code do?
const viz = document.body.querySelector(".viz");
const button = document.body.querySelector("#button");
//this defines the button element and viz class in the body of the dom so that we can manipulate them in javascript

console.log(viz, viz.children);

const addChildToViz = () => {
  const newChild = document.createElement("div");
  newChild.className = "rectangle";
  newChild.style.height = Math.random() * 100 + "px";
  viz.appendChild(newChild);
};
//this creates a new div that contains a rectangle and inserts it at the bottom of the viz class 



// Task
// Modify index.html to make this event listener work
button.addEventListener("click", addChildToViz);
//already works? 



// Task
// Where can you see the results of the console.log below? How is it different from in previous exercises?

function drawIrisData() {
  window
    .fetch("./iris_json.json")
    .then(data => data.json())
    .then(data => {
      console.log(data);
    });
}

drawIrisData();

// Task
// Modify the code above to visualize the Iris dataset in the preview of index.html.
// Feel free to add additional CSS properties in index.html, or using JavaScript, as you see fit.
