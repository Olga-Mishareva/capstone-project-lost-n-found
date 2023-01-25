import mongoose, { model, models, Schema } from "mongoose";

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
  await mongoose.connect(process.env.MONGODB_URI);
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

async function updateItem(id, item) {
  await connectDatabase();

  const newItem = await Item.findOneAndUpdate({ itemId: id }, item);
  return newItem;
}

export { getAllItems, getItem, updateItem };
