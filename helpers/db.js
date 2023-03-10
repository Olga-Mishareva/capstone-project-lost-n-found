import mongoose, { model, models, Schema } from "mongoose";

const ItemSchema = new Schema({
  initiallyLost: Boolean,
  title: String,
  description: String,
  itemId: String,
  userName: String,
  userEmail: String,
  userId: String,
  userRole: String,
  longitude: String,
  latitude: String,
  inDiscuss: Boolean,
  isFinished: Boolean,
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
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

  if (item) {
    const messages = await Message.find({ item: item._id }).populate({
      path: "item",
      model: "Message",
    });
    return messages;
  }
}

async function updateItem(id, data) {
  await connectDatabase();

  if (data.text) {
    const updatedItem = await Item.findOneAndUpdate(
      { itemId: id },
      {
        $push: {
          messages: data._id,
        },
      },
      {
        new: true,
      }
    );
    return updatedItem;
  } else {
    const updatedItem = Item.findOneAndUpdate({ itemId: id }, data);
    return updatedItem;
  }
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
