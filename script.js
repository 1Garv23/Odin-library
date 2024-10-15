function Book(bookName, author, pages, read){
    this.bookName=bookName;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
function addBookToLibrary(bookName, author, pages, read){
    console.log(bookName+author+pages+read);
}
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

dialogBox.addEventListener("close", (e)=>{
    if(dialogBox.returnValue==="cancel"){
        console.log("This was hit");
        return; //dialog was closed using cancel button
    }
    addBookToLibrary(nameInput.value , nameAuthor.value, pages.value, read.value);
});
