const addTodo = document.querySelector(".addTodo");
// const todoUl = document.querySelector("ul.todos");
const digiClock = document.querySelector("div.digiClock span#ss");
const searchTodo = document.querySelector("form.search");
const todoList = document.querySelector("ul.todos");
let arr = [];

//console.log(addTodo);
function dis() {
  if (localStorage.todos) {
    arr = JSON.parse(localStorage.todos);
    arr.forEach((data) => {
      todoList.innerHTML += `<li class="list-group-item justify-content-between align-items-center">
            <span class="wShadow">${data}</span
            ><i class="far fa-trash-alt delete float-right redShadow"></i>
          </li>`;
    });
  }
}
dis();
let add = (arr) => {
  // location.reload();
  const lists = document.querySelectorAll(".list-group-item");
  lists.forEach((data) => {
    data.remove();
  });
  localStorage.setItem("todos", JSON.stringify(arr));
  dis();
};
addTodo.addEventListener("submit", (e) => {
  e.preventDefault();

  const formValue = addTodo.addTodos.value;
  if (formValue.length > 0) {
    arr.push(formValue);
    //console.log(arr);
    add(arr);
    addTodo.reset();
  } else {
    alert("Add something :/ ");
  }

  //console.log();
});
todoList.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.tagName == "I") {
    // console.log(e.target.previousSibling.textContent);
    if (confirm("Completed Task ??")) {
      arr = JSON.parse(localStorage.todos);
      const re = e.target.parentElement.children[0].textContent;
      arr = arr.filter((d) => d !== re);
      // console.log(arr);
      localStorage.setItem("todos", JSON.stringify(arr));
      const lists = document.querySelectorAll(".list-group-item");
      lists.forEach((data) => {
        data.remove();
      });
      dis();
    }
  }
});
searchTodo.addEventListener("keyup", (e) => {
  e.preventDefault();
  Array.from(todoList.children)
    .filter(
      (todo) =>
        !todo.textContent
          .trim()
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    )
    .forEach((ele) => ele.classList.add("filteredList"));
  Array.from(todoList.children)
    .filter((todo) =>
      todo.textContent
        .trim()
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    )
    .forEach((ele) => ele.classList.remove("filteredList"));
});

const tick = () => {
  return new Date();
};

const everyTick = async () => {
  setInterval(() => {
    let digi = tick().toLocaleString().split(" ");
    digiClock.innerHTML = `<span class="dateStyle">&nbsp;${digi[0]}</span> ${digi[1]}`;
  }, 1000);
};
everyTick();
