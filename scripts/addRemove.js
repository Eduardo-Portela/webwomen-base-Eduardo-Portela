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

                    localStorage.setItem("VagasSelecionadas", listJSON)
                 
                    createCardVacancy(copyList)
                    if(copyList.length == 0){
                        showEmpty()
                    }
                }
        })
        })
    })
}

addRemoveVacancies()


function RemoveSelectedCard(list = copyList){
        const trashButton = document.querySelectorAll(".trash")
        const buttonsAdd = [...document.querySelectorAll(".Button-add")]
        
        trashButton.forEach((button) => {
            button.addEventListener("click", () => {
                buttonsAdd.forEach((buttonAdd) => {
                    if(button.id == buttonAdd.id){
                        buttonAdd.innerText = "Candidatar"
                        if(copyList.length == 0){
                        showEmpty()
                    }
                    }
                })
                let founded = list.findIndex((element)=> {
                   return button.id == element.id
                })
                console.log(founded)
                
                list.splice(founded, 1)
                
                const newList = [...list]
                
                const listJSON = JSON.stringify(newList)
                
                localStorage.setItem("VagasSelecionadas", listJSON)

            })
        })
  
}

RemoveSelectedCard()

