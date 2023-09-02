'use client'

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "components/ui/button";
import Footer from "components/layout/Footer";
import Header from "components/layout/Header";

import {
  useQuery,
} from 'react-query'
import usersServices from "services/users";

export default function Home() {

  const info: any = useQuery('info', usersServices.info)

  return (
    <div>
      <Header />
      <main className="flex h-screen flex-1 justify-center">
        <div className="relative max-w-[1524px] px-8">
          <section className="flex flex-col justify-center px-4 pb-8 pt-8 md:flex-row md:pt-12">
            <div className="flex flex-col items-start gap-5 md:items-center">
              <Link
                href="#"
                className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
              >
                🎉 <div className="mx-2 h-4 w-[1px] shrink-0 bg-border" />Hello {info.data?.fullname || "..."}<ChevronRight className="ml-1 h-4 w-4" />
              </Link>
              <h1>
                NextJS{" "}
                <strong className=" bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Typescript
                </strong>{" "}
              </h1>
              <span className="h4 font-normal text-muted-foreground">
                A template for NextJS and Typescript
              </span>
              <div>
                <Button asChild>
                  <Link href={"/login"}>Solid Button</Link>
                </Button>
                <Button variant="gradient" className="ml-5">
                  Gradient Button
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
