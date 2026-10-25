import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap grid min-h-svh content-center gap-6 py-24">
      <div className="eyebrow"><b>404</b>Not found</div>
      <h1 className="display text-[clamp(32px,5vw,64px)]">This piece <span className="lit">isn&apos;t on the shelf.</span></h1>
      <Link href="/" className="btn w-fit">Back to the shop</Link>
    </main>
  );
}
