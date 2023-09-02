import React from "react";
import { Card, CardTitle } from "./ui/card";
import { tinh_tp } from "lib/constants/tinh_tp";
import Link from "next/link";

interface Props {
  results: {
    name: string;
    slug: string;
  }[];
}

export default function SearchResult(props: Props) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4 lg:w-[80vw]">
      {props.results.map((item, index) => (
        <Link key={index} href={"/roadmaps/" + item.slug}>
          <Card className="group flex h-24 cursor-pointer items-center justify-center p-5 text-center transition-all hover:border-foreground">
            <span className="transition-all group-hover:scale-[1.1]">
              {item.name}
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
