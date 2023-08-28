const form = document.querySelector('form');
const ul = document.querySelector('ul');

//전체 item들을 저장
let todos = [];

//새로운 아이템 추가될 때마다 로컬스토리지에 저장된 정보 업데이트 
const save = () =>{
  //('todos', todos) => 밸류에 쓴 글이 보이지 않음. 로컬스토리지에서 자바스크립트의 객체를 '객체' 형식 그 자체로 다루지 못해서 발생. => JSON 사용 자바스크립트의 객체를 문자열로 바꾸어줌.
  localStorage.setItem('todos', JSON.stringify(todos));
}

//삭제기능
const delItem = (event) =>{
  const target = event.target.parentElement;

  //화면에서 요소가 지워지면 todos 배열도 업데이트 되도록함.
  //각 요소에 필터를 적용해서 지우려는 타겟의 값과 같지 않은, 지울 요소가 아닌 것들을 모아 다시 todos에 저장함.
  //todo.id = 숫자, target.id = 문자열이기 때문에 타입을 제외한 값 비교만을 위해 !=사용
  //또는 parseInt() 사용
  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  save();

  target.remove();

};

//input창에서 입력받은 텍스트를 html의 새로운 요소로 만들어줌.
const addItem = (todo)=>{
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const button = document.createElement('button');
  const todotext = document.createElement('input');

  checkbox.type = 'checkbox';
  checkbox.className = 'todo-check';

  todotext.type = 'text';
  button.innerText = '삭제';
  button.addEventListener('click', delItem);
  li.className = 'todo-list';

  li.appendChild(checkbox);
  li.appendChild(todotext);
  li.appendChild(button);
  ul.appendChild(li);

  //문서의 id 값을 todo의 id 값으로 지정
  li.id = todo.id;
};

//handler는 event 객체를 받아온다. form이 제출, submit evevt가 일어날 때 새로고침 되지 않도록 함.
const handler = (event) =>{
  event.preventDefault();
  
  const todo = {
    id: Date.now(),
    //text: input.value,
  };

  todos.push(todo); 
  addItem(todo);
  save();
};

//새로고침할 때 로컬스토리지에 저장된 정보 있다면 불러오기
const init = () => {
  const userTodos = JSON.parse(localStorage.getItem('todos'));

  console.log(userTodos);

  if(userTodos){
    userTodos.forEach((todo) => {
      addItem(todo);
    });

    todos = userTodos;
  }
}

init();
form.addEventListener('submit', handler);