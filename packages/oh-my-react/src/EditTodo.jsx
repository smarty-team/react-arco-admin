import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectTodoById, updateTodo } from "./store/todoSlice";
import { useForm } from "react-hook-form";
import { useTitle } from "ahooks";

// react-hook-form

export default function EditTodo() {
  const { id } = useParams();

  // 从redux获取id对应的项
  const editedTodo = useSelector((state) => selectTodoById(state, id));

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues: editedTodo});

  const dispatch = useDispatch()
  
  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateTodo(data))
    navigate('/')
  }
  
  useTitle(editedTodo.title + ' | Edit')
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        <label>
          <span>name: </span>
          <input type="text" {...register("title", { required: true })} />
          { errors.title && errors.title.type === 'required' && <p>title为必填项</p>}
        </label>
      </p>
      <p>
        <label>
          <span>completed: </span>
          <input
            type="checkbox"
             {...register("completed")}
          />
        </label>
      </p>
      <p>
        <button type="submit">保存</button>
        <button type="button" onClick={() => navigate("/")}>
          取消
        </button>
      </p>
    </form>
  );
}
