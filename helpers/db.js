import mongoose, { model, models, Schema } from "mongoose";

const URI = `mongodb+srv://mooowik:${process.env.MONGODB_PASSWORD}@lost-n-found.dp2d557.mongodb.net/?retryWrites=true&w=majority`;

const ItemSchema = new Schema({
  initiallyLost: Boolean,
  title: String,
  description: String,
  itemId: String,
  userName: String,
  userId: String,
  userRole: String,
  longitude: String,
  latitude: String,
  inDiscuss: Boolean,
  isFinished: Boolean,
  messages: [{ userName: String, userId: String, message: String }],
});

const Item = models.Item || model("Item", ItemSchema);

async function connectDatabase() {
  await mongoose.connect(URI);
}

async function getAllItems() {
  await connectDatabase();

  const items = await Item.find({});
  return items;
}

async function getItem(id) {
  await connectDatabase();

  const item = await Item.findOne({ itemId: id });
  return item;
}

export { getAllItems, getItem };
