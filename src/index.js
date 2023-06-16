let dogBreeds = []

document.addEventListener("DOMContentLoaded", () => {
    loadDogImages()
    loadDogBreeds()
})

function attachBreedsListener() {
    const breedDropdown = document.getElementById("breed-dropdown")
    breedDropdown.addEventListener("change", (event) => {
        event.target.value
        // based on the value for the selection
        // filter the list of breeds
        // to only show breeds that start with that letter
        const filteredBreeds = dogBreeds.filter(breed => breed.startsWith(event.target.value))
        addBreeds(filteredBreeds)
    })
}

// just fetch the data
async function loadDogBreeds() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const breedData = await response.json()

    dogBreeds = Object.keys(breedData.message)
    addBreeds(dogBreeds)
    attachBreedsListener()
}

// add the fetched data to the DOM
function addBreeds(dogBreeds) {
    const dogUl = document.getElementById("dog-breeds")
    dogUl.innerHTML = ''
    dogBreeds.forEach((breed) => {
        const dogLi = document.createElement("li")
        dogLi.innerText = breed
        dogLi.addEventListener("click", (e) => {
            e.target.style.cursor = 'pointer'
            e.target.style.color = 'pink'
        })
        dogUl.append(dogLi)
    })
}



function loadDogImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then(dogData => {
            dogData.message.forEach(dogImage => addDogImage(dogImage))
        }
    )
}

function addDogImage(dogImageURL) {
    // select the image container
    const dogImageContainer = document.getElementById("dog-image-container")
    // create an img element
    const dogImage = document.createElement("img")
    // give img src attribute
    dogImage.src = dogImageURL
    // append the img element to the image container
    dogImageContainer.append(dogImage)
}