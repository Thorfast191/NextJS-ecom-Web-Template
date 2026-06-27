import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen pt-32 bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="uppercase tracking-[6px] text-blue-400 text-sm mb-4">
            Join PoshmanStyle
          </p>

          <h1 className="text-5xl font-black">Register</h1>

          <p className="text-slate-400 mt-4">Create your customer account</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}
