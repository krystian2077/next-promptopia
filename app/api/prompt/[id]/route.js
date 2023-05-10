import Prompt from "@models/prompt";
import { connectToDd } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDd();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Faild to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDd();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Faild to update prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDd();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompr deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Faild to delete prompt", { status: 500 });
  }
};
