const form = document.querySelector('form')
const ul = document.querySelector('ul')
const submitB = document.getElementById('submit')
const input1 = document.getElementById('item1')
const input2 = document.getElementById('item2')
const input3 = document.getElementById('item3')
const edit1 = document.getElementById('item4')
const edit2 = document.getElementById('item5')
const edit3 = document.getElementById('item6')

const initArr = [
  {
      id: 1,
      title: "post1",
      date: "7/1",
      summary: "HTML is easy and hard",
  },
  {
    id: 2,
    title: "post2",
    date: "7/4",
    summary: "CSS is so fancy and easy to use",
  },
  {
    id: 3,
    title: "post3",
    date: "7/7",
    summary: "WHY JavaScript so hard!!!!",
  }
]

if(localStorage.length === 0){
  localStorage.setItem('arr', JSON.stringify(initArr));
}
let itemsArray = JSON.parse(localStorage.getItem('arr'));
let id  = itemsArray.length + 1;
var mode = "normal";

  // add all array of objects into li tag
  const addPost = (title, date, summary, id) => {
    const li = document.createElement('li');
    const editImg = document.createElement('img');
    const deleteImg = document.createElement('img');
    li.textContent = 'title: ' + title + ' date: ' + date +  ' summary: ' + summary;
    li.id = id;
    editImg.setAttribute("src", "/images/edit.png");
    deleteImg.setAttribute("src", "/images/trash.png");

    // edit editImg when click
    editImg.addEventListener('click', ()  => {
      itemsArray = JSON.parse(localStorage.getItem('arr'));
      const findInd = itemsArray.findIndex((element) => element.id == id)
      edit1.value = itemsArray[findInd].title;
      edit2.value = itemsArray[findInd].date;
      edit3.value = itemsArray[findInd].summary;
      editID = id;
      mode = "edit";
      document.getElementById("prompt").showModal();
      });

    //delete button when click
      deleteImg.addEventListener('click', () => {
      li.parentElement.removeChild(li);
      editImg.parentElement.removeChild(editImg);
      deleteImg.parentElement.removeChild(deleteImg);
      itemsArray = JSON.parse(localStorage.getItem('arr'));
      const findInd = itemsArray.findIndex((element) => element.id == id)
      itemsArray.splice(itemsArray.findIndex(item => item.id === id), 1)
      localStorage.setItem('arr', JSON.stringify(itemsArray));

      if(ul.childNodes.length === 0 || (ul.childNodes.length === 1 && !ul.childNodes[0].tagName)){
        document.getElementById("noPost").innerHTML = "No post currently listed";
        localStorage.clear();
        }
    });
    ul.appendChild(li);
    ul.appendChild(editImg);
    ul.appendChild(deleteImg);
  }

// add new object to array
itemsArray.forEach(item => {
addPost(item.title, item.date, item.summary, item.id);
});

//when click Add Post button to open dialog
submitB.addEventListener('click', function () {
  document.getElementById("prompt1").showModal();
  })

//when click submit button in add dialog
function addP () {
    const arr = {
      id: 0,
      title: "",
      date: "",
      summary: "",
    }
    arr.id = id; 
    arr.title = DOMPurify.sanitize(input1.value);
    arr.date = DOMPurify.sanitize(input2.value);
    arr.summary = DOMPurify.sanitize(input3.value);

    itemsArray.push(arr);
    localStorage.setItem('arr', JSON.stringify(itemsArray));
    addPost(arr.title, arr.date, arr.summary, arr.id);
    id++;
    document.getElementById("noPost").innerHTML = "";
    document.getElementById("addF").reset();
    document.getElementById("prompt1").close();
}

//when click cancel button in add dialog
function cancelConPrompt1() {
  document.getElementById("addF").reset();
  document.getElementById("prompt1").close();
}

//when click submit button in edit dialog
function editP () {
    if(mode === "edit")
    {
      itemsArray = JSON.parse(localStorage.getItem('arr'));
      const findInd = itemsArray.findIndex((element) => element.id == editID)
      itemsArray[findInd].title = DOMPurify.sanitize(edit1.value);
      itemsArray[findInd].date = DOMPurify.sanitize(edit2.value);
      itemsArray[findInd].summary = DOMPurify.sanitize(edit3.value);
      localStorage.setItem('arr', JSON.stringify(itemsArray));
      document.getElementById(editID).innerHTML = 'title: ' + DOMPurify.sanitize(edit1.value) + ' date: ' 
      + DOMPurify.sanitize(edit2.value) +  ' summary: ' + DOMPurify.sanitize(edit3.value);
      document.getElementById("editF").reset();
      mode = "normal";
      document.getElementById("prompt").close();
    }
}

//when click cancel button in edit dialog
function cancelConPrompt() {
  document.getElementById("editF").reset();
  document.getElementById("prompt").close();
}