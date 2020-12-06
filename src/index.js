const someData = ['foo', 'bar', 'baz', 'fizz']; // raw data

someData.forEach(str => {                  // Iterate over our data with forEach
  const div = divMaker(str, 'dodgerblue'); // Invoke our divMaker for each array item
  // document.body.prepend(div);           // Prepend to the DOM
});

// The component is a function that takes raw data and returns DOM element(s)
function divMaker(text, color) {
  const newDiv = document.createElement('div'); //instantiation
  newDiv.classList.add('nice-div');             // adding attributes
  newDiv.textContent = text;                    // adding text
  newDiv.style.color = color;                   // adding inline styles
  return newDiv                                 // return
}

const div = divMaker('hello, friend', 'red');   // invoke function and pass arguments
// document.body.prepend(div);                  // append to the DOM
// console.log(div);

// function DivMaker(data) {         // React version of divMaker
//   const { text, color } = data    // Destructured assignment
//   return <div style={{ color: color }}>{text}</div>
// }

// TASK 0- Motivate demoing a small makeImage component
//  that takes an { imgURL } and returns an img element.
//  Then loop over these URLs making images as you go:
const imageData = [
  { imageURL: 'https://images.dog.ceo/breeds/mastiff-tibetan/n02108551_978.jpg' },
  { imageURL: 'https://images.dog.ceo/breeds/mastiff-bull/n02108422_3398.jpg' },
  { imageURL: 'https://images.dog.ceo/breeds/mastiff-bull/n02108422_2947.jpg' },
]

function makeImage(obj) {
  const img = document.createElement('img');
  img.src = obj.imageURL;
  return img // Component needs to return
}

// function ImageMaker(data) {             // React version
//   return <img src={data.src} />
// }

imageData.forEach(img => {
  // 1 - make an image by invoking our newImage component
  const newImage = makeImage(img);
  // 2 - attach it to the DOM
  // document.body.prepend(newImage);
});

// TASK 1- Import the data we need to "hydrate" our component.
//  On the one hand, the default export from data/panelData.js
//  On the other hand, the default export from data/constants.js
//  Destructure `open` and `close` from the constants
import panelData from './data/panelData';
import arrows from './data/constants';

// const open = arrows.open;      // Old way
// const close = arrows.close;

const { open, close } = arrows;   // New way in ES6 (destructuring)

// // TASK 2- Verify our imports using log statements
console.log(panelData); // log the panelData
console.log(arrows.open); // log the open arrow
console.log(arrows.close); // log the close arrow

// TASK 3- Comment out the div.panel from index.html and grab its parent element.
//  We will generate the panel with code, and we'll need the parent
//  so we can append the code-generated panel to the DOM.
const accordion = document.querySelector('.accordion');

// // TASK 4- Create a function 'makePanel' that creates a panel exactly as you see it in the HTML.

function panelMaker(title, content) {

  // TASK 5- Instantiate all the elements needed for a panel
  const panel = document.createElement('div');
  const panelBar = document.createElement('div');
  const panelContent = document.createElement('div');
  const panelTitle = document.createElement('h3');
  const panelButtons = document.createElement('div');
  const openButton = document.createElement('button');
  const closeButton = document.createElement('button');

  // TASK 6- Setup the structure of our elements
//     <div>                        // panel
//       <div>                      // panelBar
//         <h3></h3>                // panelTitle
//         <div>                    // panelButtons 
//           <button></button>      // openButton
//           <button></button>      // closeButton
//         </div>
//       </div>
//       <div></div>                // panelContent
//     </div>
//   */
  panel.appendChild(panelBar);
  panel.appendChild(panelContent);

  panelBar.appendChild(panelTitle);
  panelBar.appendChild(panelButtons);

  panelButtons.appendChild(openButton);
  panelButtons.appendChild(closeButton);

// TASK 7- Add proper class names to our elements (See index.html for reference)
// paying attention to the elements that need to start out hidden
 panel.classList.add('panel');
 panelBar.classList.add('panel-bar');
 panelContent.classList.add('panel-content');
 panelButtons.classList.add('panel-buttons');
 openButton.classList.add('panel-btn-open');
 closeButton.classList.add('panel-btn-close', 'hide-btn');

  // TASK 8- Set text content using arguments as raw material
  //  and also using the open and close arrows imported at the top of the file
  panelTitle.textContent = title;
  panelContent.textContent = content;
  openButton.textContent = open;
  closeButton.textContent = close;

  // TASK 9- When the 'open' or 'close' buttons are clicked, the content is toggled on/off:
  //  - the open button needs to go away (the 'hide-btn' class name controls this)
  //  - the close button needs to show (the 'hide-btn' class name controls this)
  //  - the contents need to show (the 'toggle-on' class name controls this)
  panelButtons.addEventListener('click', (evt) => {
    openButton.classList.toggle('hide-btn');
    closeButton.classList.toggle('hide-btn')
    panelContent.classList.toggle('toggle-on');
  });

  return panel; // don't forget to return the panel!
}

// TASK 10- Loop through the panelData we imported from the data folder
//  creating panels for each content and title and append them to the DOM.
//  We can do this with a single forEach, or with a map and a forEach.
panelData.forEach(panel => {
  const newPanel = panelMaker(panel.title, panel.content);
  accordion.appendChild(newPanel);
  
  // ALTERNATIVELY
  // const { title, content } = panel;
  // const newPanel = panelMaker(title, content);
  // accordion.appendChild(newPanel)
})

// [STRETCH] Comment out the links inside the nav and
// write a linkMaker that takes { href, className, text }
// and returns an anchor tag with the right href, class and textContent.
// Loop over the 'linkData' in the data folder, generate anchor tags
// and append them to the nav.
