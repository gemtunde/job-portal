import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      //required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      //required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      //required: true,
    },
  },
  {
    timestamps: true,
  }
);
//delete old model
if (mongoose.models.applications) {
  const applicationModel = mongoose.model("applications");
  mongoose.deleteModel(applicationModel.modelName);
}

//create new model
const Application = mongoose.model("applications", applicationSchema);
export default Application;
