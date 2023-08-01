 
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
 
export const runtime = 'edge'
 
const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!
})
 
const openai = new OpenAIApi(apiConfig)
 
export async function POST(req: Request) {
  const { messages } = await req.json()
 
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages
  })
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
 
  // Respond with the stream
  return new StreamingTextResponse(stream)
}