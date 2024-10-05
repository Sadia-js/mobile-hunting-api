//Fetching search
const stopSpinner = () => {
    setTimeout(()=> {
        document.getElementById('load-spinner').classList.remove = "flex justify-center";
        document.getElementById('load-spinner').classList = "hidden"; 

        const searchValue = document.querySelector('#input-value').value;
        phoneFetching(searchValue, false);
    }, 3000);

}

const searchHandler = () => {
    document.getElementById('load-spinner').classList = "flex justify-center";
    document.getElementById('load-spinner').classList.remove = "hidden";
    stopSpinner();
}


// load phone cards
const phoneFetching = (searchText, status = false) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText? searchText : 'iphone'}`)
    .then(res => res.json())
    .then(data => {
        allPhoneCards(status ? data.data : data.data.slice(0, 6));
    })
    .catch(err => console.log(err))
}

phoneFetching();

// cards here
const allPhoneCards = (phones) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = "";
    phones.forEach(phone => {
        const {image,brand, phone_name, slug} = phone;
        const div = document.createElement('div');
        div.classList = "card border-2 bg-gray-100";
        div.innerHTML = `
        <figure class="px-4 pt-10">
            <img
              src=${image} alt="phone-image"
              class="rounded-xl w-32" />
        </figure>
        <div class="card-body items-center text-center px-4">
          <h2 class="card-title font-bold text-2xl">${brand}</h2>
          <p class="text-xl font-medium">${phone_name}</p>
          <p>Phones are versatile devices for communication, internet browsing, gaming, photography, social media and managing personal tasks efficiently.
          </p>
          <div class="card-actions mt-4">
            <button onclick="showDetails('${slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `

        cardsContainer.append(div);
    })
}

const showDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => phoneFeatures(data.data))
    .catch(err => console.log(err))
}

const phoneFeatures = feature => {
    console.log(feature)
    const {image, name, releaseDate, mainFeatures,others} = feature;
    const featureContainer = document.getElementById('feature-container');
    featureContainer.innerHTML = `
      <div class="bg-green-100 rounded-lg p-4">
         <div class="w-[40px] md:w-[120px] mx-auto">
          <img class-"" src=${image} alt="image">
         </div>
      </div>
      <h1><span class="text-lg font-bold">Phone Name: </span>${name}</h1>
      <p><span class="text-lg font-bold">Release Date: </span>${releaseDate ? releaseDate : 'N/A'}</p>
      <p><span class="text-lg font-bold">Storage: </span>${mainFeatures.storage}</p>
      <p><span class="text-lg font-bold">Display Size: </span>${mainFeatures.displaySize}</p>
      <p><span class="text-lg font-bold">Chip-set: </span>${mainFeatures.chipSet}</p>
      <p><span class="text-lg font-bold">USB: </span>${others.USB}</p>
    `
    my_modal_5.showModal()
}

//show all phones
const showAllPhones = () =>{
    phoneFetching(document.querySelector('#input-value').value, true);
}

