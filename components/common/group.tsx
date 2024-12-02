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
  const { label, boxes } = props;
  
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
        <div className="w-full flex-1 bg-secondary p-5">
          <FormProvider {...methods}>
            <form className="mx-auto grid auto-cols-[70px] grid-rows-[repeat(6,_70px)] grid-flow-col gap-4 place-content-center">
              {boxes.map((box, index) => (
                <BoxField key={box._id} index={index} label={label} disabled={isPending || isSubmitting} />
              ))}
            </form>
          </FormProvider>
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