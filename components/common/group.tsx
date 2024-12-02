import { useModifyCollection } from "@/lib/query-hooks";
import { Collections } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect, useRef } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import debounce from "lodash.debounce";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Bath, Bomb, LucideIcon } from "lucide-react";
import CartonTotal from "../icons/carton-total";
import CartonDone from "../icons/carton-done";
import CartonLeft from "../icons/carton-left";

const BoxSchema = z.object({
  _id: z.string(),
  digit: z.number(),
  status: z.boolean()
});

export const BoxesFormSchema = z.object({
  boxes: z.array(BoxSchema),
});

export type BoxesFormValues = z.infer<typeof BoxesFormSchema>;

export default function Group(props: Collections) {
  const { label, boxes, boxDone, boxLeft, boxTotal, startAt, endAt, status } = props;
  
  const toastIdRef = useRef<string | number | undefined>();
  const { mutate: modifyCollection, isError, isSuccess, isPending } = useModifyCollection();

  const methods = useForm<BoxesFormValues>({
    defaultValues: { boxes: boxes || [] },
    resolver: zodResolver(BoxesFormSchema),
  });

  const onSubmit = (data:BoxesFormValues["boxes"]): any => {
    modifyCollection({collection: {...props, boxes: data}});
  }

  const { getValues, reset, formState: { isDirty, isSubmitting } } = methods;
  const debouncedSubmit = debounce(() => onSubmit(getValues("boxes")), 3000);

  useEffect(() => {
    if (isDirty) debouncedSubmit();
  }, [isDirty]);

  useEffect(() => {
    if (isPending) { 
      toastIdRef.current = toast.loading("Updating Collection...");
    }

    if (isSuccess) {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
      toast.success("Collection Updated Successfully");
      toastIdRef.current = undefined; 
    }
  }, [isSuccess, isPending]);

  useEffect(()=> {
    reset({ boxes: boxes || [] });
  }, [boxes]);

  return (
      <TabsContent  value={label} className="tab-content">
        <div className="w-full flex-1 bg-secondary p-5 flex flex-col justify-between space-y-6">
          <div className="mx-auto w-full max-w-screen-xl flex-1 flex items-center justify-between">
            <h1 className="text-3xl capitalize font-extrabold text-dark/60">Group {label}</h1>
            <div className="flex space-x-8">
              <Info icon={CartonTotal} digit={100} />
              <Info icon={CartonDone} digit={20} />
              <Info icon={CartonLeft} digit={80} />
            </div>
          </div>
          <FormProvider {...methods}>
            <form className="mx-auto grid auto-cols-[70px] grid-rows-[repeat(6,_70px)] grid-flow-col gap-4 place-content-center">
              {boxes.map((box, index) => (
                <BoxField key={box._id} index={index} label={label} disabled={isPending || isSubmitting} />
              ))}
            </form>
          </FormProvider>
          <div className="mx-auto w-full max-w-screen-xl flex-1 flex items-center justify-between">
            <div className="">
              date started
            </div>
            <div className="">
              print, done, delete
            </div>
          </div>
        </div>
      </TabsContent>
  )
}

function BoxField({ index, label, disabled }: { index: number, label: string, disabled?: boolean }) {
    const { register} = useFormContext<BoxesFormValues>();
  
    return (
      <label htmlFor={`boxes.${index}.status`} className={"group box-field has-[:checked]:box-field-gradient"}>
        <span className="absolute z-0 text-5xl text-tertiary/10 group-has-[:checked]:text-light/20">{label}</span>
        <span className="text-xl text-tertiary group-has-[:checked]:text-light">{index+1}</span>
        <input type="checkbox" {...register(`boxes.${index}.status`)} id={`boxes.${index}.status`} disabled={disabled} hidden />
      </label>
    );
}

function Info(props: { icon: JSX.ElementType, digit: number}) {
  return (
    <div className="flex space-x-4 items-center p-1 px-4 bg-primary rounded-full border-light shadow-inner border-4">
      <props.icon className="size-8" />
      <div className="text-lg text-dark/60 font-bold">{props.digit}</div>
    </div>
  )
}