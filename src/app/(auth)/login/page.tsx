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
import { useToast } from "components/ui/use-toast";
import { useAuthStore } from "redux/hooks";
import { login } from "redux/slices/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/store";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Xin hãy nhập 1 username.",
  }),
  password: z.string().min(8, {
    message: "Mật khẩu phải có độ dài tối thiểu 8 kí tự.",
  }),
});

export default function Login() {
  const { toast } = useToast();
  const [onLogin, setOnLogin] = React.useState(false);
  const { stateAuthStore, authSlice } = useAuthStore();

  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setOnLogin(true);
    dispatch(login(data))
      .then((res) => {
        if (res.meta.requestStatus == "rejected") {
          throw res;
        }
        toast({
          title: "Đăng nhập thành công!",
          description: "Đang chuyển hướng về trang chủ",
        });
        window.location.reload()
      })
      .catch((err) => {
        toast({
          title: "Đăng nhập thất bại!",
          description: "Sai email hoặc mật khẩu",
        });
        setOnLogin(false);
      });
  }

  return (
    <div className="w-full p-10">
      <div className="flex justify-between md:block">
        <Logo className="h4 md:hidden" />
        <h4 className="flex justify-end">Đăng nhập</h4>
      </div>
      <div className="flex h-full items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-center space-y-2 sm:w-[350px]"
          >
            <h3 className="text-center">Đăng nhập vào tài khoản của bạn</h3>
            <p className="text-center text-muted-foreground">
              Nhập email và mật khẩu vào bên dưới để đăng nhập vào tài khoản của
              bạn
            </p>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="xuanbachdotdev"
                      {...field}
                      autoComplete="username"
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
                      {...field}
                      autoComplete="password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={onLogin}>
              Đăng nhập
            </Button>
            <p className="text-center">
              Bạn không có tài khoản?{" "}
              <Link href={"/signup"} className="font-semibold hover:underline">
                Đăng kí
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
