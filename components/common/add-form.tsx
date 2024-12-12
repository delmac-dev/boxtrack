import { useAddCollection } from "@/lib/query-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    letter: z.string().toUpperCase().min(1)
});

export type FormSchemaProp = z.infer<typeof FormSchema>;

export default function AddForm(props: { callback: () => void }) {
    const { callback } = props;
    const { mutate: addCollection, isError, isSuccess, isPending } = useAddCollection();

    const form = useForm<FormSchemaProp>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            letter: ""
        }
    });

    const { handleSubmit, formState: { isDirty, isSubmitting }, register } = form;

    function onSubmit(data: FormSchemaProp) {
        addCollection({ collection: data });
    };

    useEffect(() => {
        let toastId: string | number | undefined;

        if (isPending && !isSuccess) {
            toastId = toast.loading("Adding Collection...");
        }

        if (isSuccess) {
            toast.dismiss(toastId);
            toast.success("Collection added successfully");
            callback();
        }
    }, [isSuccess, isPending]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input {...register("letter")} placeholder="box letter" className="block input-field uppercase" autoComplete="off" />
            <button disabled={!isDirty || isSubmitting} className="button disabled:cursor-not-allowed">
                Add
            </button>
        </form>
    )
}