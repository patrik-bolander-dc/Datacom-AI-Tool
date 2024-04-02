import { redirect } from "next/navigation";

export default function SetupPage() {

  const profile = true;

  if (profile) {
    return redirect(`/home`)
  }

  return (
    <div className="">
      log in page
    </div>
  );
}
