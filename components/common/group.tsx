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
  label: z.string(),
  modifiedAt: z.string().datetime(),
  _id: z.string(),
  content: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
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
                <BoxField key={box._id} index={index} />
              ))}
            </form>
          </FormProvider>
        </div>
      </TabsContent>
  )
}

function BoxField({ index }: { index: number }) {
    const { register, getValues } = useFormContext<BoxesFormValues>();
    const boxes = getValues("boxes");

    // const { getValues, formState: { isDirty } } = methods;
    // const debouncedSubmit = debounce(() => onSubmit(getValues()), 300);

    // if(isDirty) debouncedSubmit();
  
    return (
      <HoverCard>
        <HoverCardTrigger asChild className="w-full h-full flex-center font-bold text-sm text-tertiary bg-primary rounded-md cursor-pointer border-4 border-light shadow-inner">
          <label htmlFor={`boxes.${index}.content-5`} className={cn(boxes[index].content === 5 && "!bg-blue-500 !text-blue-50")}>
            {boxes[index].label}
          </label>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="hover-content flex flex-col-reverse space-y-2 w-auto p-2 hover-card">
          {Array.from({ length: 5 }, (_, i) => 5 - i).map((value) => (
            <React.Fragment key={value}>
              <input type="radio" value={value} {...register(`boxes.${index}.content`)} id={`boxes.${index}.content-${value}`} hidden />
              <label htmlFor={`boxes.${index}.content-${value}`} key={value} className="inline-flex items-center space-x-2 px-4 py-0.5 cursor-pointer">{value}</label>
            </React.Fragment>
          ))}
        </HoverCardContent>
      </HoverCard>
    );
}