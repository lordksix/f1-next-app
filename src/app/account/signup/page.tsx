import RegisterForm from "@/components/accounts/register-form";

export default async function RegisterPage() {

  return (
    <>
      <section className="grid min-h-screen py-8 bg-ct-blue-600 place-items-center">
        <div className="w-full">
          <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
            Welcome to F1mania!
          </h1>
          <h2 className="mb-4 text-lg text-center text-ct-dark-200">
            Sign Up To Get Started!
          </h2>
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
