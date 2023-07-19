'use client';

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
      return router.push('/api/auth/signin?callbackUrl=/');
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

  const onSubmitHandler: SubmitHandler<FormDataRegister> = async (values) => {
    await RegisterUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full max-w-md p-8 mx-auto space-y-5 overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl"
      >
        <FormInput label="Name" name="name" required={true} />
        <FormInput label="Username" name="username" required={true} />
        <FormInput label="Email" name="email" type="email" required={true} />
        <FormInput label="Password" name="userpassword" type="password" required={true} />
        <FormInput
          label="Confirm Password"
          name="passwordConfirm"
          type="password"
        />
        <span className="block text-black">
          Already have an account?{" "}
          <Link href="/api/auth/signin?callbackUrl=/" className="text-ct-blue-600">
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
