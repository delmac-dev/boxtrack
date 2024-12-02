import { useAddCollection } from "@/lib/query-hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    letter: z.string().min(1),
    total: z.number().min(1, "Must be 1 or more")
});

export type FormSchemaProp = z.infer<typeof FormSchema>;

export default function AddForm(props:{callback: ()=>void}) {
    const { callback } = props;
    const { mutate: addCollection, isError, isSuccess, isPending } = useAddCollection();

    const form = useForm<FormSchemaProp>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            letter: "",
            total: 0
        }
    });

    const {handleSubmit, formState: { isDirty, isSubmitting }, register} = form;

    function onSubmit(data: FormSchemaProp) {
        addCollection({ collection: data});
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Collection added successfully");
            callback();
        }
    }, [isSuccess]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input {...register("letter")} placeholder="box letter" className="block input-field" />
            <input {...register("total")} placeholder="box total" className="block input-field" />
            <button disabled={!isDirty || isSubmitting } className="button">
                { isSubmitting || isPending ? "Adding" : "Add" }
            </button>
        </form>
    )
}