import Prompt from "@models/prompt";
import { connectToDd } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDd();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Faild to fetch all prompts", { status: 500 });
  }
};
