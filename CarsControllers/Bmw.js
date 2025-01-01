const bmwRestrictionMessage = require("../Carsmodel/Bmw");
const openai = require("../Configuration/Configuration");

const createBmwRestrictionMessage = async (req, res) => {
  try {
    // Validate request body
    const {
      recipientName,
      userInput,
      reason,
      alternativeSuggestion,
      closingStatement,
    } = req.body;
    if (!recipientName || !userInput || !reason) {
      return res.status(400).json({
        message: "Missing required fields: recipientName, userInput, reason",
      });
    }

    // Generate apology message using OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates apology messages for BMW restrictions.",
        },
        {
          role: "user",
          content: `Generate an apology message for a BMW restriction. Reason: ${reason}`,
        },
      ],
      max_tokens: 100000000000000,
    });

    const apologyMessage = response.choices[0].message.content.trim();

    // Save the message to MongoDB
    const newMessage = new bmwRestrictionMessage({
      recipientName,
      userInput,
      apologyMessage,
      reason,
      alternativeSuggestion,
      closingStatement,
    });

    await newMessage.save();

    // Send success response
    res.status(201).json({
      message: "BMW Restriction Message created successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error creating BMW Restriction Message",
      error: error.message,
    });
  }
};

module.exports = {
  createBmwRestrictionMessage,
};
