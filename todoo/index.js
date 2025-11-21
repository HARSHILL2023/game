var todoList = []
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");


//  event listner for add and delete.


function updateList(){
    comdoList = todoList.filter((data) => {
        // if(data.complete == true){
        //     return data;
        // }
        return data.complete;
    });

    remList = todoList.filter((data) => {
        // if(data.complete == false){
        //     return data;
        // }
        return !data.complete;
    });

    document.querySelector('#c-count').textContent = comdoList.length;
    document.querySelector('#r-count').textContent =  todoList.length;

};

function addTask(){
    // Inpute <- Task(Value) -> Variable Store;
	var Task = todoInput.value;
	// User -- Compulsory --> Content neesded {Empty Content xxx} // Not emplty content is allowed
	if(Task == ""){
        alert("! Kuch Likh Le Bhai ! Content Needed");
        return ;
	}

    // each TAsk -> trace....

    todoList.push({
        content : Task,
        id : Date.now().toString(),
        complete: false
    });

    todoList.forEach((data) => {
        console.log(data);
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

    todoInput.value = "";


    updateList();  // Function -> Filter and complete refelex

    appendTask(todoList);

}

function appendTask(todoList){
    allTodos.innerHTML =""; //  empty --> Task
    
    todoList.forEach((element)=>{
        var x = `<li id=${element.id} class="todo-item">
        <p id="task">${element.complete ? `<strike>${element.content}</strike>` : element.content} </p>
        <div class="todo-actions">
            <button class="complete btn btn-success">
                <i class="ci bx bx-check bx-sm"></i>
            </button>
        
            <button class="delete btn btn-eror">
                <i class="di bx bx-trash bx-sm"></i>
            </button>
        </div>
    </li>`
    allTodos.innerHTML += x;
    })
}


addButton.addEventListener('click', addTask);



todoInput.addEventListener('keypress', (event) => {
    // console.log(event.key); 
    if(event.key === 'Enter'){
      addTask();`   `
    }
});


function deleteTask(event){
    console.log(event.target.parentElement);

    console.log(event.target.parentElement.parentElement);

    console.log(event.target.parentElement.parentElement.getAttribute('id'));
    
    var id = event.target.parentElement.parentElement.getAttribute('id');

    todoList = todoList.filter((data)=>{
        return data.id != id;
    });
    updateList();
    appendTask(todoList);
}

function complete(event){
    var id = event.target.parentElement.parentElement.getAttribute('id');

    todoList.forEach((data)=>{
        if(data.id == id){
            if(data.complete == false){
                data.complete = true;
                event.target.parentElement.parentElement.querySelector('#task').classList.add('line');
            }
            else{
                if(data.complete == true){
                    data.complete = false;
                    event.target.parentElement.parentElement.querySelector('#task').classList.add('line')
                }
            }
        }
    })

    updateList();
    appendTask(todoList);
}

document.addEventListener('click', (event)=>{
    if(event.target.classList.contains('delete') || event.target.classList.contains('di')){
        console.log(event.target);
        deleteTask(event);
    }
    if(event.target.classList.contains('complete')  || event.target.classList.contains('ci')){
        console.log(event.target);
        complete(event);
    }
})

function deleteAll(){
    todoList = [];
    updateList();
    appendTask(todoList);
}
deleteAllButton.addEventListener('click', deleteAll);

function deleteS(){
    todoList = todoList.filter((data)=>{
        return !data.complete;
    });
    updateList();
    appendTask(todoList);
}
deleteSButton.addEventListener('click',deleteS);


const allFilter = document.getElementById('all');
const remFilter = document.getElementById('rem');
const comFilter = document.getElementById('com');

function clearActiveFilter() {
    [allFilter, remFilter, comFilter].forEach(el => el && el.classList && el.classList.remove('active-filter'));
}

function applyFilter(listToShow, clickedEl) {
    // prevent anchor navigation
    appendTask(listToShow);
    clearActiveFilter();
    if (clickedEl && clickedEl.classList) clickedEl.classList.add('active-filter');
}

if (allFilter) allFilter.addEventListener('click', (e) => { e.preventDefault(); applyFilter(todoList, allFilter); });
if (remFilter) remFilter.addEventListener('click', (e) => { e.preventDefault(); updateList(); applyFilter(remList, remFilter); });
if (comFilter) comFilter.addEventListener('click', (e) => { e.preventDefault(); updateList(); applyFilter(comdoList, comFilter); });

// ensure the default view shows all todos and highlights All
applyFilter(todoList, allFilter);