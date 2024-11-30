import { useModifyCollection } from "@/lib/query-hooks";
import { Collections } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import debounce from "lodash.debounce";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { HoverCardContent } from "../ui/hover-card";
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

type Props = {
  boxes: BoxesFormValues["boxes"];
};

export default function Group(props: Collections) {
  const { label, boxes } = props;
  const { mutate: modifyCollection, isError, isSuccess, isPending } = useModifyCollection();

  return (
      <TabsContent  value={label} className="tab-content">
        <div className="w-full flex-1 bg-green-600 p-5 flex gap-7">
          <BoxForm boxes={boxes} />
          <div className="w-72 h-full bg-green-700">left panel</div>
        </div>
      </TabsContent>
  )
}


function BoxForm({ boxes }: Props) {
    const methods = useForm<BoxesFormValues>({
      defaultValues: { boxes },
      resolver: zodResolver(BoxesFormSchema),
    });
    
    const { getValues, formState: { isDirty } } = methods;
    // const debouncedSubmit = debounce(() => onSubmit(getValues()), 300);

    // if(isDirty) debouncedSubmit();
  
    return (
        <FormProvider {...methods}>
            <form className="h-full flex-1">
                <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-3 p-5 bg-green-700 rounded-xl">
                    {boxes.map((box, index) => (
                        <BoxField key={box._id} index={index} />
                    ))}
                </div>
            </form>
        </FormProvider>
    );
}
  
function BoxField({ index }: { index: number }) {
    const { register, getValues } = useFormContext<BoxesFormValues>();
    const boxes = getValues("boxes");
  
    return (
      <HoverCard>
        <HoverCardTrigger asChild className="w-full h-full flex-center font-medium text-lg text-neutral-600 bg-blue-50 rounded-md cursor-pointer">
          <label htmlFor={`boxes.${index}.content-5`} className={cn(boxes[index].content === 5 && "!bg-blue-500 !text-blue-50")}>
            {boxes[index].label}
          </label>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="flex flex-col-reverse space-y-2 w-auto p-2 hover-card">
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