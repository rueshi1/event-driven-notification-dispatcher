const { saveEvent } =
require("../services/eventService");

const { createNotification } =
require("../services/notificationService");

const { addToQueue } =
require("../services/queueWorker");

const createEvent = async (req, res) => {

  try {

    const {
      event_type,
      recipient,
      data
    } = req.body;

    if (!event_type || !recipient) {

      return res.status(400).json({
        error:
        "event_type and recipient are required"
      });
    }

    const event_id =
      await saveEvent(event_type, data);

    const notification_id =
      await createNotification(
        event_id,
        recipient
      );

    addToQueue({
      event_id,
      notification_id,
      recipient
    });

    return res.status(202).json({
      message:
      "Event accepted for processing",
      tracking_id: event_id,
      notification_id,
      status: "pending"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      error:
      "Internal server error"
    });
  }
};

module.exports = {
  createEvent
};