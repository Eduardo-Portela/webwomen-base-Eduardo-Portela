/* Desenvolva sua lógica aqui... */

const copyList = []


function LocalStorageAnalysis(){
    const filesLocalStorage = localStorage.getItem("VagasSelecionadas")
    if(filesLocalStorage){
        const filesConverted =  JSON.parse(filesLocalStorage)
        if(filesConverted.length > 0 ){
            copyList.push([...filesConverted])
        }
        console.log(copyList)
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
    
        const pModalite = document.createElement("p")
        const addButton = document.createElement("button")
    
        li.classList.add("vacancy")
        divTitle.classList.add("title")
        divCompanyCity.classList = "company-city"
        pDescription.classList = "description"
        divTypeButton.classList ="type-button"
        addButton.classList = "Button-add"
        addButton.id = id

       
    
        h3Title.innerText = `${title}`
        pCompany.innerText = `${enterprise}`
        pCity.innerText = `${location}`
        pDescription.innerText = `${descrition}`
        pModalite.innerText = `${modalities[0]}`
        addButton.innerText = "Candidatar"

        // console.log(getvacLocation(), addButton.id)
        // const newArray = vacAlreadyExist(element)
        // newArray.forEach((ele) => {

        //     if(ele.id == addButton.id){
        //         addButton.innerText = "Remover Candidatura"       
        //     }else{
        //         addButton.innerText = "Candidatar"
        //     }
            
        // })

        li.append(divTitle,pDescription,divTypeButton)
        divTitle.append(h3Title,divCompanyCity,)
        divCompanyCity.append(pCompany,pCity)
        divTypeButton.append(pModalite,addButton)
        
        
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
            })
    
    
            li.append(divTitleRemove,divCompanyCity)
            divTitleRemove.append(h4Title,buttonTrash)
            divCompanyCity.append(pCompany,pCity)

            listCardSelected.appendChild(li)
        
        
    })
}

    return listCardSelected
    
}


function addRemoveVacancies(list = jobsData){
    const buttonsAdd = [...document.querySelectorAll(".Button-add")]
    buttonsAdd.forEach((button) => {
        list.forEach((element) => {
            button.addEventListener("click", ()=>{
                if(button.id == element.id && button.innerText == "Candidatar"){
                    button.innerText = "Remover Candidatura"

                    copyList.push(element)
                    
                    const newList = [...copyList]

                    const listJSON = JSON.stringify(newList)
                    localStorage.setItem("VagasSelecionadas", listJSON)
                    
                    return createCardVacancy(copyList)

                }else if(button.id == element.id && button.innerText == "Remover Candidatura"){
                    button.innerText = "Candidatar"
                    let founded = copyList.findIndex((elementFound)=> {
                        return button.id == elementFound.id
                     })
                     copyList.splice(founded, 1)
                     
                    const newList = [...copyList]
                    
                    const listJSON = JSON.stringify(newList)
                    console.log(newList)

                    localStorage.setItem("VagasSelecionadas", listJSON)
                 
                     createCardVacancy(copyList)
                }
        })
        })
    })
}

addRemoveVacancies()


function RemoveSelectedCard(list = copyList){
    if (list.length > 0){
        const trashButton = document.querySelectorAll(".trash")
        console.log(trashButton)
        trashButton.forEach((button) => {
            button.addEventListener("click", () => {
                let founded = list.findIndex((element)=> {
                   return button.id == element.id
                })
                list.splice(founded, 1)
                let liRemove = button.parentElement.parentElement
                liRemove.remove()
            })
        })
    }
}

RemoveSelectedCard()


function getvacLocation(){
    return JSON.parse(localStorage.getItem("VagasSelecionadas") || [])
}

function vacAlreadyExist(vaga){
   const getVacancy =  getvacLocation().filter((element) => {
       return element.id == vaga.id
    })
    return getVacancy
}
 
