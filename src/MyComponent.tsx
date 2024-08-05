import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
    data.example === "Mert" && data.exampleRequired === "123"
      ? navigate("/form")
      : alert("Hatalı giriş yapıldı. Şifrenizi mi unuttunuz?");

  return (
    <>
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          placeholder="Kullanıcı Adı"
          {...register("example", { required: true })}
        />
        {/* include validation with required or other standard HTML validation rules */}
        <input
          placeholder="Şifre"
          {...register("exampleRequired", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>Bu alan doldurulmak zorunda!</span>}
        <input type="submit" />
      </form>
    </>
  );
};

export default MyComponent;
