import { cookies } from "next/headers";
import Image from "next/image";
import { Mail } from "./components/mail";
import { accounts, mails } from "./data";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Release Grooming",
  description: "Release Grooming Page",
};

export default function MailPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  console.log(layout, collapsed, "aaaaaaaa");

  const defaultLayout = layout ? JSON.parse(layout.value || "") : undefined;
  const defaultCollapsed = collapsed
    ? JSON.parse(collapsed.value || "")
    : undefined;

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Mail"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Mail
          accounts={accounts}
          mails={mails}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
