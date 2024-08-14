const todoList = [{name:'make dinner', dueDate:'2022-12-22'},
                  {name:'wash dishes', dueDate:'2022-12-22'}];
renderToDoList();
function renderToDoList(){
        let todoListHTML = '';
todoList.forEach((todoObject,index)=>{
    
            
            const {name, dueDate} = todoObject;
            const html = `
                <div>${name}</div>
                <div>${dueDate}</div>
                 <button class="delete-todo-button js-delete-todo-button">Delete</button>
                
            `;
            todoListHTML += html;

})
     
        document.querySelector('.js-todo-list')
            .innerHTML = todoListHTML;
    document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton,index)=>{
        deleteButton.addEventListener('click',()=>{
            todoList.splice(index,1);
            renderToDoList(); 
        })
    });
           
}   
document.querySelector('.js-add-todo-button')
.addEventListener('click',()=>{
addToDo();
}) 
function addToDo(){
    const inputElmnt = document.querySelector('.js-name-input').value;
    const name = inputElmnt;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;
    todoList.push({name:name,
                dueDate:dueDate}
    );
    console.log(todoList);

    document.querySelector('.js-name-input').value = '';
    renderToDoList();
}