function Book(bookName, author, pages, read){
    this.bookName=bookName;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
let i=0;
let library=[];
function addStyling(container, bName, aName, pName, rName, readToggle, del){

}
function addBookToLibrary(bookName, author, pages, read){
    let newBook=new Book(bookName, author, pages, read);
    library[i]=newBook;
    let container=document.createElement("div");
    container.dataset.index=i;
    newBook.container=container;  //for delete function, maps library[] to their dom element

    let bName=document.createElement("p");
    bName.textContent="Book Name: "+bookName;
    container.appendChild(bName);
    let aName=document.createElement("p");
    aName.textContent="Author Name: "+author;
    container.appendChild(aName);
    let pName=document.createElement("p");
    pages.textContent="Number of pages: "+pages;
    container.appendChild(pName);
    let rName=document.createElement("p");
    rName.textContent=read;
    container.appendChild(rName);

    let readToggle=document.createElement("button");
    readToggle.textContent="Read";
    container.appendChild(readToggle);
    let del=document.createElement("button");
    del.textContent="Delete";
    container.appendChild(del);
    container.addEventListener("click", (event)=>{handleClick(event)});
    newBook.container=container;
    shelf.appendChild(container);
    i++;
}
function handleClick(event){  
    let origTarget=event.target;
    let currentDiv=event.currentTarget;
    //discard if click is not from a button
    if(origTarget.tagName!="BUTTON"){
        return;
    }
    if(origTarget.textContent==="Read"){
        let read=currentDiv.childNodes[3];
        if(read.textContent.toLowerCase()==="yes"){
            read.textContent="no";
        }
        else{
            read.textContent="yes";
        }
        return;
    }
    //delete
    else if(origTarget.textContent==="Delete"){
        let index=currentDiv.dataset.index;
        for(let i=index+1; i<library.length; i++){
            //for each library book, make their index correct again
            let container=library[i].container;
            container.dataset.index=i; 
        }
        let elementToBeDeleted=currentDiv;
        library.splice(index, 1); //remove this from library
        //now clear the DOM
        while(elementToBeDeleted.firstChild){  //remove all children
            elementToBeDeleted.removeChild(elementToBeDeleted.firstChild);
        }
        elementToBeDeleted.parentNode.removeChild(elementToBeDeleted);  //finallt remove the container itlsef
    }
}




let shelf=document.querySelector(".shelf");
//selecting all the input fields
let nameInput=document.querySelector("#name");
let nameAuthor=document.querySelector("#author");
let pages=document.querySelector("#pages");
let read=document.querySelector("#read");
//selecting the dialogue control fields
let openButton=document.querySelector(".openDialog");
let dialogBox=document.querySelector(".dialogBox");
let closeDialog=document.querySelector(".closeDialog");
openButton.addEventListener("click",()=>{dialogBox.showModal();});
closeDialog.addEventListener("click", ()=>{dialogBox.close()});

//take input when dialogBox closes
dialogBox.addEventListener("close", (e)=>{
    if(dialogBox.returnValue==="cancel"){
        return; //dialog was closed using cancel button
    }
    if(((nameInput.value==="") || (nameAuthor.value==="") || (pages.value==="")) ||(read.value.toLowerCase()!="yes" && read.value.toLowerCase()!="no")){
        alert("Please enter proper values");
    }
    
    else{
        addBookToLibrary(nameInput.value , nameAuthor.value, pages.value, read.value);
    }
    nameInput.value="";
    nameAuthor.value="";
    pages.value="";
    read.value="";
});
