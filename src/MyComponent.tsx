import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Usage in a React Component
const MyComponent = () => {
  interface Inputs {
    example: string;
    exampleRequired: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    data.exampleRequired === "123" && data.example === "Mert"
      ? navigate("/form")
      : alert("Hatalı giriş yapıldı. Şifrenizi mi unuttunuz?");

  return (
    <>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input placeholder="Kullanıcı Adı" {...register("example")} />
        {/* include validation with required or other standard HTML validation rules */}
        <input
          placeholder="Şifre"
          {...register("exampleRequired", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </>
  );
};

export default MyComponent;
