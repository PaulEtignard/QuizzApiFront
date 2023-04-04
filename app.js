const getThemes = () => {
    return fetch('http://127.0.0.1:8000/api/themes')
        .then(response => {

            if (response.ok){
                return response.json()
            }
            throw new Error("Une erreur est survenue, vérifiez votre endpoint")
        })
}
getThemes()
    .then(result => displayThemes(result))
    .catch(error => console.log(error))

let questionPrint = document.getElementById("question")
const reponse1 = document.getElementById("reponse1")
const reponse2 = document.getElementById("reponse2")
const reponse3 = document.getElementById("reponse3")
const reponse4 = document.getElementById("reponse4")
const nbquestionsaffi = document.getElementById("nombreQuestion")
const checker1 = document.getElementById("1")
const checker2 = document.getElementById("2")
const checker3 = document.getElementById("3")
const checker4 = document.getElementById("4")
let boutonValider = document.getElementById("valider")
const affichageTheme = document.querySelector(".themes")
const displayThemes = (themes) =>{
    const listetheme = document.querySelector("#listetheme")
    let themess = document.getElementsByClassName("theme")
    //créer une ligne dans la table pour chaque utilisateur
    themes.forEach(theme => {
        const div = document.createElement("div")
        div.classList.add("theme")
        div.addEventListener("click",e=>{
            if (!div.classList.contains("choosed")){
                for (const theme of themess) {
                    theme.classList.remove("choosed")
                }
                div.classList.add('choosed')
            } else {
                div.classList.remove('choosed')
            }
        })
        const h2 = document.createElement("h2")
        h2.innerText = theme.intitule
        div.appendChild(h2)
        listetheme.appendChild(div)
    })
}

const confirmButton = document.querySelector("#sumbit")
confirmButton.addEventListener("click",e=>{
    const theme = document.querySelector(".choosed").textContent
    let trimmedtheme = theme.replaceAll(" ","-")
    const nbquestions = document.querySelector("#nbquestions").value
    getQuestions(trimmedtheme, nbquestions).then(result => AfficherQuestions(result)).catch(error => console.log(error))
})

const getQuestions = (theme, nbquestions) => {
    console.log(`http://127.0.0.1:8000/api/${theme}/${nbquestions}`)
    return fetch(`http://127.0.0.1:8000/api/${theme}/${nbquestions}`)
        .then(response => {
            if (response.ok){
                return response.json()
            }
            throw new Error("Une erreur est survenue, vérifiez votre endpoint")
        })
}
const affichagequestion = document.querySelector(".quizzalign")
const AfficherQuestions = (questions) =>{
    affichageTheme.setAttribute("style","display:none")
    affichagequestion.setAttribute("style","display:flex")
    let questionActuelle = 0
    let pointstotal = 0


    const chargerQuestion = (question) =>{
        questionPrint.innerText = question.insitutle
        nbquestionsaffi.innerText = `question : ${questionActuelle+1}/${nbquestiondispo}`
        reponse1.innerText = question.reponse[0]
        reponse2.innerText = question.reponse[1]
        reponse3.innerText = question.reponse[2]
        reponse4.innerText = question.reponse[3]
    }
    let nbquestiondispo = questions.length
    chargerQuestion(questions[questionActuelle])
    desactiverBouton()
    let reponseActuelle = ""
    boutonValider.addEventListener("click",e=>{
        if (checker1.checked || checker2.checked || checker3.checked || checker4.checked ){
            if (checker1.checked){
                reponseActuelle = reponse1.innerHTML
            }
            if (checker2.checked){
                reponseActuelle = reponse2.innerText
            }
            if (checker3.checked){
                reponseActuelle = reponse3.innerText
            }
            if (checker4.checked){
                reponseActuelle = reponse4.innerText
            }
            if (reponseActuelle ===questions[questionActuelle].reponseCorrecte ){
                pointstotal = pointstotal+1
            }
            console.log(pointstotal)
            questionActuelle = questionActuelle+1
            if (questionActuelle < nbquestiondispo){
                console.log("questionfinale")
                chargerQuestion(questions[questionActuelle])
                desactiverBouton()
                if (checker1.checked){
                    checker1.checked = false
                }
                if (checker2.checked){
                    checker2.checked = false
                }
                if (checker3.checked){
                    checker3.checked = false
                }
                if (checker4.checked){
                    checker4.checked = false
                }

            } else {
                chargerFinQuizz(pointstotal,nbquestiondispo)
            }

        }
    })

}

const chargerFinQuizz =(pointstotal, nbquestiondispo) =>{
    let affiFin = document.querySelector("#affifin")
    let affiscore = document.querySelector("#score")
    affichagequestion.setAttribute("style","display:none")
    affiFin.setAttribute("style","display:flex")
    affiscore.innerHTML = `Vous avez obtenu un score de ${pointstotal} sur ${nbquestiondispo}`

}
const restart = ()=>{
    location.reload()
}
const activerBouton = () =>{
    boutonValider.style.backgroundColor = "coral"
    boutonValider.style.pointerEvents = "initial"
}
const desactiverBouton = () =>{
    boutonValider.style.backgroundColor = "grey"
    boutonValider.style.pointerEvents = "none"
}

