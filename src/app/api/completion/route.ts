import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// Create an OpenAI API client (that's edge friendly!)
const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openAIConfig);
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  const { prompt } = await req.json();
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    stream: true,
    temperature: 0.6,
    // https://contents.jobcatalog.yahoo.co.jp/qa/list/13283232903/
    // https://contents.jobcatalog.yahoo.co.jp/qa/list/14283247394/
    // https://contents.jobcatalog.yahoo.co.jp/qa/list/13222512803/ 
    prompt: `あなたは仕事に関するプロフェッショナルです。以下に提示された相談に対して適切な答えを返してください。相談はQ, 回答はAとします。300字程度で回答してください。
      Q: エンジニアや転職に詳しい方に質問です。今年27歳になり、転職を考えています。現在、営業職ですがシステムエンジニアなどの技術職を志しております。独学ではありますが、基本技術者、応用技術者、セキュリティスペシャリストの資格を取得しました。プログラミングもPythonは扱えます。転職活動するにあたってほかに身につけておいたほうがいいものはありますでしょうか？また、新卒よりは厳しいのは承知ですが未経験でもポテンシャル採用はありますでしょうか？
      A: 正直、インフラ系なら全然余裕だと思いますが、アプリは最近難易度がインフレしすぎてて難しいと思います・・・自分は経験3年目の業務系のプログラマーですが、そんな自分ですらWeb系に行くのはかなり大変だと思います3年ほど前までだったら質問者様のスペックでも行けたかもですが最近は・・・
      Q: セクハラなどハラスメントに関してですが、女性は夏場に着ている服装で、下着の色柄が透けて見えたり、胸の部分のボタンをわざと外し胸の谷間を見せる様な行為などは、男性へのハラスメントとかにはなりませんか？。
      A: いつも頑張ってるのを見てますよ、今日は見てね、という気持ちをどうして素直に受け取れないのでしょうか。ハラスメントにはなりません。
      Q: タバコする女性はタバコを吸わないない男性を好きになった場合タバコはどうしますか。
      A: 止められるか止められないかは好きな度合いに依ります。その反対もあり、相手が貴女の事を本当に好きなら「煙草止めなくってもいいよ！」と言ってくれます。    
      Q: ${prompt}
      A:`,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}