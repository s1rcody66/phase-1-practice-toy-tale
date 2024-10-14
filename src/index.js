let addToy = false;
const divName = document.querySelector('#div-collection')
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
});

const collectToys = () => {
  return fetch('http://localhost:3000/toys'
    
  )
  .then(response => response.json());
}
    


const postBoy = (toy_data) => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "img": toy_data.img.value,
      "likes": 0
    })
  })
    .then(response => response.json())
    .then((obj_toy) => {
      let newToy = makeToys(obj_toy)
      divName.append(newToy)
    })
}

const likes = (e) => {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innertext) + 1;
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "likes": more
    })
  })
    .then(response => response.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}
const makeToys = (toy) => {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  let img = document.createElement('img')
  img.setAttribute('src', toy.img)
  img.setAttribute('class', toy.character)
  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`
  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divName.append(divCard)

}

collectToys().then(toys => {
  toys.forEach(toy => {
    makeToys(toy)
  })
})
