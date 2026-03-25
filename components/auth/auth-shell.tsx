import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import { icons } from "@/constants/icons";

type AuthShellProps = {
  title: string;
  formTitle: string;
  description: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  reverse?: boolean;
  children: React.ReactNode;
};

export function AuthShell({
  title,
  formTitle,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  children,
}: Readonly<AuthShellProps>) {
  return (
    <main className="min-h-screen bg-slate-100/30">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section
          className={reverse ? "order-2 hidden lg:block" : "hidden lg:block"}
        >
          <div className="relative h-full overflow-hidden flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-6 px-4">
              <div className="max-w-121 w-full text-center">
                <h1 className="text-center text-2xl md:text-4xl font-semibold leading-tight text-[#1E1E1E]">
                  {title}
                </h1>
                <p className="max-w-lg text-sm md:text-[22px] text-[#707070] font-medium">
                  {description}
                </p>
              </div>
              <div className="h-137.5 w-162.75">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  className="object-cover h-full w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className={
            reverse
              ? "order-1 flex items-center justify-center px-6 py-12"
              : "flex items-center justify-center px-6 py-12"
          }
        >
          <div className="w-full max-w-127 p-5">
            <div className="space-y-3">
              <div className="flex flex-col justify-center items-center gap-6">
                <h1 className="text-4xl font-semibold text-center">
                  {formTitle}
                </h1>
                <div className="flex justify-center items-center gap-6">
                  <Image
                    src={icons.facebook}
                    alt="facebook icon"
                    width={40}
                    height={40}
                    className="text-primary border-primary"
                  />
                  <Image
                    src={icons.google}
                    alt="facebook icon"
                    width={40}
                    height={40}
                    className="text-primary border-primary"
                  />
                </div>
                <p className="font-medium text-xl">Or use your account</p>
              </div>
              <div>{children}</div>
              <div></div>
            </div>
          </div>
        </section>

        <section className={reverse ? "order-1 lg:hidden" : "lg:hidden"} />
      </div>
    </main>
  );
}
