"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import inputBG from "@/assets/input.png";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";
import bg from "@/assets/bg.png";
import { AnimatePresence, motion } from "framer-motion";

const formSchema = z.object({
  id: z.string().length(10, {
    message: "กรุณากรอกรหัสนิสิตให้ครบสิบหลัก",
  }),
});

export default function Home() {
  const [thaiNum, setThaiNum] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });
  const idWatch = form.watch("id");

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { id } = values;
    async function fetchData() {
      const res = await fetch(`/api/${id}`);
      const data = await res.json();
      if (!data.group) {
        toast({
          variant: "destructive",
          title: "ไม่พบคุณชายของท่าน",
        });
        return;
      }
      router.push(`/${data.group}`);
    }
    void fetchData();
  }

  return (
    <main className="flex w-full max-w-6xl flex-col items-center justify-center mx-auto px-8">
      <Image
        src={bg}
        alt=""
        className="absolute top-0 left-0 -z-50 size-full"
      />
      <Form {...form}>
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.75 }}
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            toast({
              variant: "destructive",
              title: error.id?.message,
            });
          })}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col max-w-80 px-8 pt-8"
        >
          <Image
            src={inputBG}
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-50"
          />
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="รหัสนิสิต"
                    {...field}
                    className={cn(
                      "bg-transparent !border-0 !ring-0 !ring-offset-0 focus:!border-0 placeholder:text-input/50 text-center",
                      idWatch.length === 0
                        ? "font-sans text-xl"
                        : "font-thaiNum text-3xl"
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {idWatch.length === 10 ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, x: 50 }}
              >
                <Button
                  type="submit"
                  className="absolute -bottom-16 w-full left-1/2 -translate-x-1/2 text-2xl !bg-transparent !border-0 !ring-0 !ring-offset-0"
                >
                  คุณชายของฉันเป็นใครกันนะ?
                </Button>
              </motion.div>
            </AnimatePresence>
          ) : null}
        </motion.form>
      </Form>
    </main>
  );
}
