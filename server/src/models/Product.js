import mongoose from "mongoose";

const priceOptionSchema = new mongoose.Schema(
    {
        people: { type: Number, required: true, min: 1 },
        value: { type: Number, required: true, min: 0 },
    },
    { _id: false } // no need for an id on each option
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        image: { type: String, required: true },
        description: { type: String, required: true, trim: true },

        priceOptions: {
            type: [priceOptionSchema],
            validate: [(v) => v.length > 0, "At least one price option is required"],
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
            index: true,
        },

        // optional, must match one of the category's subcategories
        subcategory: { type: String, trim: true },

        likesCount: { type: Number, default: 0 }, // from the likes discussion
    },
    { timestamps: true }
);

// fast filtering by category + subcategory
productSchema.index({ category: 1, subcategory: 1 });


export default mongoose.model("Product", productSchema);