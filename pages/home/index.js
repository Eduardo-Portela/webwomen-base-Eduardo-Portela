/* Desenvolva sua lógica aqui... */

let copyList = []

function vacAlreadyExist(vaga){
   const getVacancy =  copyList.filter((element) => {
       return element.id == vaga.id
    })
    return getVacancy
}

function LocalStorageAnalysis(){
    const filesLocalStorage = localStorage.getItem("VagasSelecionadas")
    if(filesLocalStorage){
        const filesConverted =  JSON.parse(filesLocalStorage)
        if(filesConverted.length > 0 ){
            copyList = [...filesConverted]
        }
       return createCardVacancy(filesConverted)
    }
}

LocalStorageAnalysis()

function renderCards(list = jobsData){
    const listRender = list.map((element)=> element)

    const listCards = document.querySelector(".vacanciesList")
    listCards.innerHTML = ""
    
    listRender.forEach((element)=> {
        
    
        const li = document.createElement("li")

        const {id, title, enterprise, location,descrition,modalities} = element
    
    
        const divTitle = document.createElement("div")
        const h3Title = document.createElement("h3")
    
        const divCompanyCity = document.createElement("div")
        const pCompany = document.createElement("p")
        const pCity = document.createElement("p")
        
        
        const pDescription = document.createElement("p")
        
        const divTypeButton = document.createElement("div")

        const divTypeButtonModalites = document.createElement("div")
    
        const pModalite = document.createElement("p")
        const pModalite2 = document.createElement("p")
        const addButton = document.createElement("button")
    
        li.classList.add("vacancy")
        divTitle.classList.add("title")
        divCompanyCity.classList = "company-city"
        pDescription.classList = "description"
        divTypeButton.classList ="type-button"
        addButton.classList = "Button-add"
        addButton.id = id
        divTypeButtonModalites.classList.add("div-modalites")

       
    
        h3Title.innerText = `${title}`
        pCompany.innerText = `${enterprise}`
        pCity.innerText = `${location}`
        pDescription.innerText = `${descrition}`
        pModalite.innerText = `${modalities[0]}`
        pModalite2.innerText = `${modalities[1]}`
        addButton.innerText = "Candidatar"

        const newArray = vacAlreadyExist(element)
        newArray.forEach((ele) => {

            if(ele.id == addButton.id){
                addButton.innerText = "Remover Candidatura"       
            }else{
                addButton.innerText = "Candidatar"
            }
            
        })

        li.append(divTitle,pDescription,divTypeButton)
        divTitle.append(h3Title,divCompanyCity,)
        divCompanyCity.append(pCompany,pCity)
        divTypeButtonModalites.append(pModalite, pModalite2)
        divTypeButton.append(divTypeButtonModalites,addButton)
        
        
        listCards.appendChild(li)
    })
    return listCards

}

renderCards()


function createCardVacancy(list){
    const listCardSelected = document.querySelector(".list-selected")
    listCardSelected.innerHTML =""
    
    
    if(list.length > 0){
        list.forEach((element)=> {
            
            const li = document.createElement("li")
    
            const divTitleRemove = document.createElement("div")
    
            const h4Title =document.createElement("h4")
            const buttonTrash = document.createElement("button")
    
            const divCompanyCity = document.createElement("div")
            const pCompany = document.createElement("p")
            const pCity = document.createElement("p")
    
            li.classList.add("selected-vacancies")
            divTitleRemove.classList.add("title-remove")
            buttonTrash.classList.add("trash")
            buttonTrash.id = element.id
            divCompanyCity.classList.add("company-city")
    
            h4Title.innerText = `${element.title}`
            buttonTrash.innerHTML = `<img src="assets/img/trash.png" alt="Lixeira para excluir">`
            pCompany.innerText = `${element.enterprise}`
            pCity.innerText = `${element.location}`

            
            
            const buttonAdd = [...document.querySelectorAll(".Button-add")]
        
                buttonTrash.addEventListener("click", () =>{
                const removeVac = list.findIndex((vac)=> buttonTrash.id == vac.id)
                    buttonAdd.forEach((buttonAdd) => {
                        if(buttonTrash.id == buttonAdd.id && buttonAdd.innerText == "Remover Candidatura"){
                            buttonAdd.innerText = "Candidatar"
                        }
                    })

                list.splice(removeVac, 1)

                const newList = [...copyList]
                    
                const listJSON = JSON.stringify(newList)

                localStorage.setItem("VagasSelecionadas", listJSON)
                let liRemove = buttonTrash.parentElement.parentElement
                liRemove.remove()

                if(list.length == 0){
                    showEmpty()
                }
            })
    
    
            li.append(divTitleRemove,divCompanyCity)
            divTitleRemove.append(h4Title,buttonTrash)
            divCompanyCity.append(pCompany,pCity)

            listCardSelected.appendChild(li)
        
        
    })
}

    return listCardSelected
    
}


const emptyUl = document.querySelector(".list-selected")

function showEmpty(){
    const emptyLi = document.createElement("li")

    emptyLi.classList.add("empty-li")

    emptyLi.insertAdjacentHTML("beforeend", `
    <h4>Você ainda não aplicou para nenhuma vaga</h4>
        <div class="row-1"></div>
            <div class="row-2"></div>
            <div class="row-3">
                <div class="sub-row"></div>
                <div class="sub-row"></div>
                <div class="sub-row2"></div>
            </div>
    `)
    emptyUl.append(emptyLi)
    return emptyUl
}

if(copyList.length == 0){
    showEmpty()
}
