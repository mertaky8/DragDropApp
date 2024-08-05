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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Kullanıcı Adı"
          {...register("example", { required: true })}
        />
        <input
          placeholder="Şifre"
          {...register("exampleRequired", { required: true })}
        />
        {errors.exampleRequired && <span>Bu alan doldurulmak zorunda!</span>}
        <input type="submit" />
      </form>
    </>
  );
};

export default MyComponent;
