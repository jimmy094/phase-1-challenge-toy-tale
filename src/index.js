let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection')
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
    const cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    cardDiv.innerHTML = `<h2>${object.name}</h2> 
    <img src=${object.image} class='toy-avatar'/>
    <p>${object.likes} likes</p>
    <button class='like-btn' id = ${object.id}>like <3</button>`
    toyCollection.appendChild(cardDiv)
    const likeBtn = cardDiv.querySelector('button')
    const likeAmt = cardDiv.querySelector('p')
    likeBtn.addEventListener('click', (event) => addLikes(likeAmt, object))
  }
  
  const addToyForm = document.querySelector('form')
  
  addToyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    postToy(event)
  })
  
  
  function postToy(event){
    const newToy = {name: event.target.querySelectorAll('input')[0].value,
    image: event.target.querySelectorAll('input')[1].value}

    fetch('http://localhost:3000/toys/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then((newToyObj) => createCard(newToyObj))

  }
  function addLikes(likeAmt, object) {
    const newLikeAmt = {likes : object.likes += 1}
    fetch(`http://localhost:3000/toys/${object.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLikeAmt)
    })
    .then(res => res.json())
    .then((likesObj) => {
      //console.log(likesObj)
      likeAmt.innerText = `${likesObj.likes} likes`
})}
});