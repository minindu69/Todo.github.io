const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const fullList = document.getElementById("fullList");
let allTodos = []; // Use this array for managing todos in memory
const localStorageKey = "savedTodos";
const imgUrl = 'url("./assets/images/plain.png")';

// Function to save todos to localStorage
const saveTodosToLocalStorage = () => {
    localStorage.setItem(localStorageKey, JSON.stringify(allTodos));
};

// Function to display saved todos
const displaySavedTodos = () => {
    fullList.innerHTML = ""; // Clear existing list

    allTodos.forEach((todo,index) => {
        const list = document.createElement("li");
        const task = document.createElement("span");
        const doneBtn = document.createElement("button");
        const delBtn = document.createElement("button");
        const imgDiv = document.createElement("div");
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const img = document.createElement("img");

        //Add classes for styles
        imgDiv.classList.add("imgDiv");
        div1.classList.add("txt");
        div2.classList.add("btn");
        task.classList.add("task");
        doneBtn.classList.add("doneBtn");
        delBtn.classList.add("delBtn");

        img.src = "./assets/images/todo.png"; // add image for todo item

        task.innerText = todo.text;
        delBtn.innerText = "Delete";
        
        if(todo.status === "pending"){

            doneBtn.innerText = "Done";
            task.style.color = "rgb(98, 98, 98)";  
            task.style.textDecoration = "none";  
            
        }else{

            doneBtn.innerText = "Undo";
            task.style.color = "rgb(147, 0, 220)";  
            task.style.textDecoration = "line-through";

        }

        doneBtn.addEventListener("click",()=>{
             
            console.log("done clicked");

            if(allTodos[index].status === "pending"){

                allTodos[index].status = "done"
                doneBtn.innerText = "Undo";
                task.style.color = "rgb(147, 0, 220)";  
                task.style.textDecoration = "line-through";  
                console.log("pending");  
                
            }else{
                allTodos[index].status = "pending"
                doneBtn.innerText = "Done";     
                task.style.color = "rgb(98, 98, 98)";  
                task.style.textDecoration = "none";  
                console.log("else");     
            }
            
            saveTodosToLocalStorage();

        });
        
        delBtn.addEventListener("click",()=>{
            allTodos.splice(index,1);// Remove the todo at the specified index
            saveTodosToLocalStorage();
            displaySavedTodos(); // display update todos after deleting
            console.log("del clicked");

            if(allTodos.length == 0){
                document.body.style.backgroundImage = 'url("./assets/images/welcome-bg.png")';
                console.log("No Todos");
            }
        });

        imgDiv.appendChild(img);
        div1.appendChild(task);
        div2.appendChild(doneBtn);
        div2.appendChild(delBtn);
        list.appendChild(imgDiv);
        list.appendChild(div1);
        list.appendChild(div2);

        fullList.appendChild(list);
    });
};

// Function to get saved todos from localStorage
const getSavedTodos = () => {
    const storedTodos = localStorage.getItem(localStorageKey);

    if (storedTodos && storedTodos !== "[]") {
        document.body.style.backgroundImage = imgUrl;
        setTimeout(()=>{
            allTodos = JSON.parse(storedTodos);
            displaySavedTodos();
        },1500)
        console.log(typeof storedTodos);
        console.log("stored todo");
    }else{      
        console.log("No Stored Todos Yet!");
    }
    input.focus();
    input.value = "";
};

// Function to add a new todo
const addTodo = () => {
    
    const trimmedInput = input.value.trim();
    
    if(trimmedInput.length>0){
       
        document.body.style.backgroundImage = imgUrl;
        
        const newTodo = {
            text: trimmedInput,
            status: "pending",
            deleted: false
        };
    
        allTodos.push(newTodo);
        saveTodosToLocalStorage();
        displaySavedTodos();
    
        input.value = "";
        input.focus();
        console.log("trimmed");

    }else{

        // e.preventDefault();
        input.value = "";
        input.focus();
        console.log("else");

    }
};

// Event listener for the Enter key
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

// Event listeners
window.addEventListener("load", getSavedTodos);
addBtn.addEventListener("click", addTodo);
