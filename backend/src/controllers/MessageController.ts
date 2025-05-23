import { Request, Response } from "express";
import { MessageModel } from "../db/message";
import { messageSchema } from "../_helpers/validators";

class MessageController {

  public async getAllMessage(request: Request, response: Response) {

    try {
      const messages = await MessageModel.find()
        .populate('to', '_id name email')
        .populate('sender', '_id name email');
      // Added where clause for deleted messages
      // const messages = await MessageModel.find({ status: { $ne: 3 } });

      response.status(200).json({ data: messages });
      return;
    } catch (error) {
      response.status(400).json({ status: false, message: error });
      return;
    }
  }

  public async getMessage(request: Request, response: Response) {

    try {
      const { id } = request.params;
      const message = await MessageModel.findById(id);
      response.status(200).json({ data: message });
      return;
    } catch (error) {
      response.status(400).json({ status: false, message: error });
      return;
    }
  }

  public async createMessage(request: Request, response: Response) {

    try {
      const { sender, to, subject, body } = request.body;
      messageSchema.parse({ sender, to, subject, body });

      const message = new MessageModel({
        sender,
        to,
        subject,
        body,
        status: 1
      })
      await message.save();

      response.status(200).json({ message: "Message Sent!", data: message });
      return;
    } catch (error) {
      response.status(400).json({ status: false, message: error });
      return;
    }
  }

  public async readMessage(request: Request, response: Response) {

    try {
      const { id } = request.params;
      const message = await MessageModel.findById(id);

      if (message) {
        message.status = 2;
        await message.save();
        response.status(200).json({ message: "Message Updated!", data: message });
        return;
      }
    } catch (error) {
      response.status(400).json({ status: false, error });
      return;
    }
  }

  public async deleteMessage(request: Request, response: Response) {

    try {
      const { id } = request.params;
      const message = await MessageModel.findById(id);

      if (message) {
        message.status = 3;
        await message.save();
        response.status(200).json({ message: "Message Deleted!", data: message });
        return;
      }
    } catch (error) {
      response.status(400).json({ status: false, error });
      return;
    }
  }
}

export default new MessageController();
