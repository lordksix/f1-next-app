import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label: string,
  name: string,
  type?: string,
  required?: boolean,
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  required = false,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="">
      <label htmlFor={name} className="block mb-3 text-ct-blue-600">
        {label}
      </label>
      <input
        type={type}
        id={name}
        className="block w-full px-4 py-2 text-black appearance-none rounded-2xl focus:outline-none"
        {...register(name, { required })}
        aria-invalid={errors[name] ? "true" : "false"}
      />
      {errors[name] && (
        <span className="block pt-1 text-xs text-red-500">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
