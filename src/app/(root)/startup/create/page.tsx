import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { CreationForm } from "./ui/CreationForm";

export default async function CreatePage() {
  const session = await auth();
  if(!session) {
    redirect('/');
  }
  return (
    <>
      <section className="heading_container">
        <h1 className="heading">Submit your startup</h1>
      </section>
      <CreationForm/>
    </>
  );
}