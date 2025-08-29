const container = document.getElementById("list");
let GlobalList = [];

const render = () => {
    const emptyTask = `
        <div id="task-${GlobalList.length}" class="task"> 
            <input 
                id="taskInput-${GlobalList.length}"
                class="taskItemContent" 
                placeholder="일정을 입력하세요."
            ></input> 
            <button id="add" class="taskBtn">+</button>
        </div>
    `;

    if (GlobalList.length < 1) {
        container.innerHTML = emptyTask; 
    } else {
        const inner = GlobalList.map((item, idx) => ` 
            <div id="task-${idx}" class="task">
                <input 
                    value="${item.text}"
                    id="taskInput-${idx}"
                    class="taskItemContent"
                ></input>
                <button
                    id="completeBtn-${idx}"
                    value="${item.isComplete}"
                    class="taskBtn"
                >
                -
                </button>
            </div>
        `).join("");
        
        container.innerHTML = inner + emptyTask;
    }
};

render(); 

container.addEventListener("click", e => {
    const id = e.target.id.split("-")
    if (e.target.id === "add") {
        const parentTask = e.target.closest(".task");
        if (!parentTask) return; 

        const taskIndex = parentTask.id.split('-')[1];
        
        const inputElement = document.getElementById(`taskInput-${taskIndex}`);
        
        if (inputElement && inputElement.value.trim() !== "") {
            const dto = {
                text: inputElement.value,
                isComplete: false
            };
            
            GlobalList.push(dto);
            render(); 
        }
    } else if( id[0] === "completeBtn" ) {
        GlobalList.splice(id[1], 1)
        render()
    }
});
