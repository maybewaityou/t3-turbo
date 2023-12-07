import { auth, signIn, signOut } from "@acme/auth";

export async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return (
      <span className="flex flex-row">
        {["github", "google"].map((item: string) => (
          <form
            key={item}
            action={async () => {
              "use server";
              await signIn(item);
            }}
          >
            <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
              Sign in with {capitalize(item)}
            </button>
          </form>
        ))}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user.name}</span>}
      </p>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
          Sign out
        </button>
      </form>
    </div>
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
