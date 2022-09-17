function flip (){
    let card = document.querySelector(".card")

    if(card.classList=="card"){
        card.classList.add("flip")
    }
    else{
        card.classList.remove("flip")
    }
}

let card = document.querySelector(".card")

card.addEventListener("click", flip)
