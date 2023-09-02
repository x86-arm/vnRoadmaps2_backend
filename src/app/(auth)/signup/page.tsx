"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import Link from "next/link";
import Logo from "components/Logo";
import authServices from "services/auth";
import { useToast } from "components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  fullname: z.string().min(1, {
    message: "Xin hãy nhập đúng tên của bạn.",
  }),
  username: z.string().min(1, {
    message: "Xin hãy nhập 1 username.",
  }),
  password: z.string().min(8, {
    message: "Mật khẩu phải có độ dài tối thiểu 8 kí tự.",
  }),
});

export default function Signup() {
  const { push } = useRouter();

  const [onSignup, setOnSignup] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setOnSignup(true);
    authServices
      .signup(data)
      .then((res) => {
        toast({
          title: "Đăng kí Thành công!",
          description: "Đang chuyển hướng về trang đăng nhập",
        });
        setTimeout(() => push("/login"), 3000);
      })
      .catch((err) => {
        toast({
          title: "Đăng kí thất bại!",
          description: err.message || "Xin hãy kiểm tra lại thông tin!",
        });
        setOnSignup(false);
      });
  }

  return (
    <div className="w-full p-10">
      <div className="flex justify-between md:block">
        <Logo className="h4 md:hidden" />
        <h4 className="flex justify-end">Đăng kí</h4>
      </div>
      <div className="flex h-full items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-center space-y-2 sm:w-[350px]"
          >
            <h3 className="text-center">Tạo tài khoản mới</h3>
            <p className="text-center text-muted-foreground">
              Nhập tên đầy đủ, email và mật khẩu để tạo tài khoản mới
            </p>
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đầy đủ</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Do Xuan Bach"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      autoComplete="off"
                      placeholder="xuanbachdotdev"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Ab*1js(1sn#d"
                      autoComplete="off"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={onSignup}>
              Đăng kí
            </Button>
            <p className="text-center">
              Bạn đã có tài khoản?{" "}
              <Link href={"/login"} className="font-semibold hover:underline">
                Đăng nhập
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
