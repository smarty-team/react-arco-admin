import { useSelector } from "react-redux";
import { useParams, Form, useNavigate } from "react-router-dom";
import { selectTodoById } from "./store/todoSlice";

export default function EditTodo() {
  const { id } = useParams();

  // 从redux获取id对应的项
  const editedTodo = useSelector(state => selectTodoById(state, id))
  
  const navigate = useNavigate()
  
  return (
    <Form method="post">
      <p>
        <label>
          <span>name: </span>
          <input 
            type="text" 
            defaultValue={editedTodo.title} 
            name="title" />
        </label>
      </p>
      <p>
        <label>
          <span>completed: </span>
          <input
            type="checkbox"
            defaultChecked={editedTodo.completed}
            name="completed"
          />
        </label>
      </p>
      <p>
        <button type="submit">保存</button>
        <button type="button" onClick={()=>navigate('/')}>取消</button>
      </p>
    </Form>
  );
}
