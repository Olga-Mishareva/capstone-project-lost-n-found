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
  messages: {
    type: [{ type: Schema.Types.ObjectId }],
    ref: "Message",
    default: [],
  },
});

const MessageSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Item" },
  userId: String,
  userName: String,
  text: String,
});

const Item = models.Item || model("Item", ItemSchema);
const Message = models.Message || model("Message", MessageSchema);

async function connectDatabase() {
  await mongoose.connect(process.env.MONGODB_URI);
}

async function getAllItems() {
  await connectDatabase();

  const items = await Item.find({}).populate({
    path: "messages",
    model: "Item",
  });
  return items;
}

async function getItem(id) {
  await connectDatabase();

  const item = await Item.findOne({ itemId: id }).populate({
    path: "messages",
    model: "Item",
  });
  return item;
}

async function getMessages(id) {
  await connectDatabase();

  const item = await Item.findOne({ itemId: id });

  const messages = await Message.find({ item: item._id }).populate({
    path: "item",
    model: "Message",
  });

  return messages;
}

async function updateItem(id, message) {
  await connectDatabase();

  const updatedItem = await Item.findOneAndUpdate(
    { itemId: id },
    {
      $push: {
        messages: message._id,
      },
    },
    {
      new: true,
    }
  );
  return updatedItem;
}

async function createItem(item) {
  await connectDatabase();

  const newItem = await Item.create(item);
  return newItem;
}

async function createMessage(message) {
  await connectDatabase();

  const newMessage = await Message.create(message);
  return newMessage;
}

async function editItem(id, item) {
  await connectDatabase();

  const editedItem = await Item.findOneAndUpdate({ itemId: id }, item, {
    new: true,
  });
  return editedItem;
}

async function deleteItem(id) {
  await connectDatabase();

  const deletedItem = await Item.findOneAndRemove({ itemId: id });
  return deletedItem;
}

export {
  getAllItems,
  getItem,
  updateItem,
  createItem,
  editItem,
  deleteItem,
  createMessage,
  getMessages,
};
