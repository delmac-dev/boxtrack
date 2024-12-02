import { useModifyCollection } from "@/lib/query-hooks";
import { Collections } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import debounce from "lodash.debounce";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
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
  const { mutate: modifyCollection, isError, isSuccess, isPending } = useModifyCollection();

  const methods = useForm<BoxesFormValues>({
    defaultValues: { boxes },
    resolver: zodResolver(BoxesFormSchema),
  });

  return (
      <TabsContent  value={label} className="tab-content">
        <div className="w-full flex-1 bg-secondary p-5">
          <FormProvider {...methods}>
            <form className="mx-auto grid auto-cols-[70px] grid-rows-[repeat(6,_70px)] grid-flow-col gap-4 place-content-center">
              {boxes.map((box, index) => (
                <BoxField key={box._id} index={index} label={label} />
              ))}
            </form>
          </FormProvider>
        </div>
      </TabsContent>
  )
}

function BoxField({ index, label }: { index: number, label: string }) {
    const { register, getValues } = useFormContext<BoxesFormValues>();
    const boxes = getValues("boxes");
    const box = boxes[index];

    // const { getValues, formState: { isDirty } } = methods;
    // const debouncedSubmit = debounce(() => onSubmit(getValues()), 300);

    // if(isDirty) debouncedSubmit();
  
    return (
      <div className="">
        <label htmlFor={`boxes.${index}.content-5`} className={cn("box-field", box.status && "")}>
          <span className="absolute z-0 text-5xl text-tertiary/10">{label}</span>
          <span className="text-xl text-tertiary">{box.digit}</span>
        </label>
      </div>
    );
}