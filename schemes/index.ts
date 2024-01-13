import * as z from "zod";

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
];

export const ItemAddFormSchema = z.object({
    name: z.string().min(1, { message: "Название товара не может быть пустым" }),
    tag: z.string(),
    tags: z.array(z.string()).nonempty({ message: "Добавьте хотя бы 1 тег" }),
    description: z
        .string()
        .min(1, { message: "Описание товара не может быть пустым" }),
    price: z.string().min(1, { message: "Цена товара не может быть пустая" }),
    images: z
        .custom<FileList>((val) => val instanceof FileList, "Необходимо загрузить картинки товара")
        .refine((files) => files.length > 0, `Required`)
        .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
        .refine(
            (files) => Array.from(files).every((file) => file.size <= 5242880),
            `Each file size should be less than 5 MB.`
        )
        .refine(
            (files) =>
                Array.from(files).every((file) =>
                    ALLOWED_IMAGE_TYPES.includes(file.type)
                ),
            "Only these types are allowed .jpg, .jpeg, .png and .webp"
        ),
});
