import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: { type: String, required: true, trim: true },
        image: { type: String, required: true },
        imageAlt: { type: String, trim: true },

        subcategories: {
            type: [{ type: String, trim: true }],
            default: [],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);


categorySchema.virtual("productsCount", {
    ref: "Product",
    localField: "_id",
    foreignField: "category",
    count: true,
});

export default mongoose.model("Category", categorySchema);