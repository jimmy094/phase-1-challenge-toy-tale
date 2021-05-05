let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys/')
  .then(res => res.json())
  .then(toyArray => {
    toyArray.forEach((cardObj) => createCard(cardObj)
  )})


  function createCard (object) {
    const toyCollection = document.querySelector('#toy-collection')
    const cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    cardDiv.innerHTML = `<h2>${object.name}</h2> 
    <img src=${object.image} class='toy-avatar'/>
    <p>${object.likes} likes</p>
    <button class='like-btn' id = ${object.id}>like <3</button>`
    toyCollection.appendChild(cardDiv)
  }
});
