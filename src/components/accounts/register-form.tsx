"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { apiRegisterUser } from "@/lib/api-requests";
import FormInput from "@/components/accounts/FormInput";
import Link from "next/link";
import { LoadingButton } from "@/components/accounts/LoadingButton";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function RegisterForm() {
  const router = useRouter();
  const [requestLoading, setRequestLoading] = useState(false);
  const methods = useForm<FormDataRegister>();

  const {
    reset, handleSubmit, formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function RegisterUserFunction(credentials: FormDataRegister) {
    try {
      await apiRegisterUser(JSON.stringify(credentials));
      setRequestLoading(true);
      return router.push("/login");
    } catch (error: any) {
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
        console.log("Error message:", error.message);
      }
    } finally {
      setRequestLoading(false);
    }
  }

  const onSubmitHandler: SubmitHandler<FormDataRegister> = (values) => {
    RegisterUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full max-w-md p-8 mx-auto space-y-5 overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl"
      >
        <FormInput label="Name" name="name" />
        <FormInput label="Username" name="username" />
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Password" name="userpassword" type="password" />
        <FormInput
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
        />
        <span className="block">
          Already have an account?{" "}
          <Link href="/login" className="text-ct-blue-600">
            Login Here
          </Link>
        </span>
        <LoadingButton
          loading={requestLoading}
          textColor="text-ct-blue-600"
        >
          Register
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
