let inputData = []
const inputEl = document.getElementById("input-el")
const inputListEl = document.getElementById("list-el")
const inputDataLocalStorage = JSON.parse(localStorage.getItem('inputData'))
const saveButtonEl = document.getElementById("save-button-el")
const deleteButtonEl = document.getElementById("delete-button-el")
const tabButtonEl = document.getElementById("tab-button-el")


if(inputDataLocalStorage) {
    inputData = inputDataLocalStorage
    addlistData()
}
tabButtonEl.addEventListener('click', function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        inputData.push(tabs[0].url)
        localStorage.setItem("inputData",JSON.stringify(inputData))
        addlistData()
    })
})
saveButtonEl.addEventListener("click",function(){
    inputData.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem('inputData',JSON.stringify(inputData))
    addlistData()
})
deleteButtonEl.addEventListener("dblclick",function(){
   
   localStorage.clear()
   inputData=[]
   addlistData()

})

function addlistData() {
    let items = ""
  for (let i = 0; i < inputData.length; i++) {
    items += `<li id="li-item"><a  target='_blank' href='"${inputData[i]}"'>${inputData[i]}</a></li>`
  }
  inputListEl.innerHTML = items
}
