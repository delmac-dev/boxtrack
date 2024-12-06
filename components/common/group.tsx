import { useModifyCollection, useRemoveCollection } from "@/lib/query-hooks";
import { Collections } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect, useRef } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import debounce from "lodash.debounce";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle2, CircleX, LucideIcon, Package, PackageCheck, PackageX, Printer } from "lucide-react";

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
  const { mutate: deleteCollection, isError: isDeleteError, isSuccess: isDeleteSuccess, isPending: isDeletePending } = useRemoveCollection();
  const startAtFormatted = formatDate(startAt);

  const methods = useForm<BoxesFormValues>({
    defaultValues: { boxes: boxes || [] },
    resolver: zodResolver(BoxesFormSchema),
  });

  const onSubmit = (data:BoxesFormValues["boxes"]): any => {
    modifyCollection({...props, boxes: data});
  }

  const { getValues, reset, formState: { isDirty } } = methods;
  const debouncedSubmit = debounce(() => onSubmit(getValues("boxes")), 3000);
  const disabled = isDeletePending || isPending

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

  useEffect(() => {
    if (isDeletePending) { 
      toastIdRef.current = toast.loading("Deleting Collection...");
    }

    if (isDeleteSuccess) {
      if (toastIdRef.current) toast.dismiss(toastIdRef.current);
      toast.success("Collection Deleted Successfully");
      toastIdRef.current = undefined; 
    }
  }, [isDeleteSuccess, isDeletePending]);

  useEffect(()=> {
    reset({ boxes: boxes || [] });
  }, [boxes]);

  return (
      <TabsContent  value={label} className="tab-content">
        <div className="w-full flex-1 bg-secondary p-5 flex flex-col justify-between space-y-6">
          <div className="mx-auto w-full max-w-screen-xl flex-1 flex items-center justify-between">
            <h1 className="text-3xl capitalize font-extrabold text-dark/60">GROUP {label}</h1>
            <div className="flex space-x-8">
              <CollectionInfo icon={Package} digit={boxTotal || 0} />
              <CollectionInfo icon={PackageCheck} digit={boxDone || 0} />
              <CollectionInfo icon={PackageX} digit={boxLeft || 0} />
            </div>
          </div>
          <FormProvider {...methods}>
            <form className="mx-auto grid auto-cols-[70px] grid-rows-[repeat(6,_70px)] grid-flow-col gap-4 place-content-center">
              {boxes.map((box, index) => (
                <BoxField key={box._id} index={index} label={label} disabled={disabled} />
              ))}
            </form>
          </FormProvider>
          <div className="mx-auto w-full max-w-screen-xl flex-1 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-dark/60"> {startAtFormatted} </h2>
            <div className="flex space-x-8">
              <ActionButton icon={Printer} text="Print" handleClick={() => console.log("print")} disabled={disabled}/>
              <ActionButton icon={CheckCircle2} text="Done" handleClick={() => modifyCollection({ ...props, status: "done"})} disabled={disabled}/>
              <ActionButton icon={CircleX} text="Delete" handleClick={() => deleteCollection({id: props._id || ""})} disabled={disabled}/>
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

function CollectionInfo(props: { icon: LucideIcon, digit: number}) {
  return (
    <div className="flex space-x-4 items-center p-1 px-4 bg-primary rounded-full cursor-default">
      <props.icon className="size-6 text-dark/60" />
      <div className="text-lg text-dark/60 font-semibold">{props.digit}</div>
    </div>
  )
}

function ActionButton(props: { icon: LucideIcon, text: string, handleClick: () => any, disabled?: boolean}) {
  return (
    <button className="action-button" onClick={props.handleClick} disabled>
      <props.icon className="size-6" />
      {props.text}
    </button>
  )
}