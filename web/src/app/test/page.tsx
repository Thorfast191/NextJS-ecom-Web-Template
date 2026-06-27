import { seedAdmin } from "@/actions/auth.actions";

export default function TestPage() {
  return (
    <div className="p-10">
      <form action={seedAdmin}>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Create Admin
        </button>
      </form>
    </div>
  );
}
