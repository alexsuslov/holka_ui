"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusIcon, Cross1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { ItemAddFormSchema } from "@/schemes";

export function ItemAddForm() {
    const form = useForm<z.infer<typeof ItemAddFormSchema>>({
        resolver: zodResolver(ItemAddFormSchema),
        defaultValues: {
            name: "",
            tag: "",
            tags: [],
            description: "",
            price: "",
            images: undefined,
        }
    });

    const images = form.watch("images");
    const tags = form.watch("tags");

    function onSubmit(values: z.infer<typeof ItemAddFormSchema>) {
        const { name, description, price } = values;
        const result = { name, description, price, tags, images };
        console.log(result);
    }

    function handleAddTag(value: string) {
        if (value) {
            if (!tags?.includes(value)) {
                form.setValue('tags', [...tags, value])
                form.setValue("tag", "");
            }
        }
    }

    function deleteTag(tag: string) {
        const newTags = tags?.filter((v) => v !== tag);
        //@ts-ignore
        form.setValue("tags", newTags);
    }

    function deleteImage(imageName: string) {
        const newImages = Array.from(images)?.filter((v) => v.name !== imageName);
        //@ts-ignore
        form.setValue("images", newImages);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="введите наименование товара" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="введите тег"
                                        {...field} />
                                    <Button
                                        type="button"
                                        variant="success"
                                        size="icon"
                                        onClick={() => handleAddTag(field.value)}
                                    >
                                        <PlusIcon />
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                        <FormItem>
                            <FormControl>
                                {tags?.length > 0 ? (
                                    <div className="flex gap-2 flex-wrap">
                                        {tags.map((v) => (
                                            <Badge key={v} className="flex gap-2">
                                                {v}
                                                <Cross1Icon
                                                    className="text-red-500"
                                                    onClick={() => deleteTag(v)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                ) : <FormMessage />}
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="введите цену товара" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea placeholder="введите описание товара" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(event) => {
                                        const dataTransfer = new DataTransfer();
                                        if (images) {
                                            Array.from(images).forEach((image) =>
                                                dataTransfer.items.add(image)
                                            );
                                        }
                                        Array.from(event.target.files!).forEach((image) =>
                                            dataTransfer.items.add(image)
                                        );
                                        const newFiles = dataTransfer.files;
                                        field.onChange(newFiles);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {images?.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {Array.from(images)?.map((v, i) => {
                            return (
                                <div className="flex justify-center items-center" key={`key-${i}`}>
                                    <Image
                                        src={URL.createObjectURL(v)}
                                        width={100}
                                        height={100}
                                        alt="product_image"
                                    />
                                    <TrashIcon
                                        className="bg-red-500 rounded-md absolute size-6"
                                        color="white"
                                        onClick={() => deleteImage(v.name)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="flex gap-2 justify-end">
                    <Button type="submit" variant="success">
                        Добавить
                    </Button>
                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => console.log("cancel")}
                    >
                        Отмена
                    </Button>
                </div>
            </form>
        </Form>
    );
}
