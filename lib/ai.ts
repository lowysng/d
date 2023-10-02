import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

export default async function f(prompt: string) {
    const llm = new OpenAI({
        temperature: 0.9,
        modelName: "gpt-4",
    });

    // const chatModel = new ChatOpenAI();

    const text = `I am going to give you a math problem to solve. Return me the steps to solve it, wrapped around $$ symbols.
Assume that a high school student is solving this problem. Do not include preambles like "First, we will factorise the equation". Just give me the steps to solve the problem.
Make sure to add \nonumber at the end of each line, so that the equation is not numbered. Add additional escape characters if necessary.
Try to generate texts as plaintexts in newline if possible, unless its short and can fit in one line (like the example below).

For example:

> Solve $6x^2 + 5 = 17x$ by factorisation.
$$
\\begin{align} \\nonumber
6x^2 + 5 &= 17x \\\\ \\nonumber
6x^2-17x+5 &= 0 \\\\ \\nonumber
(2x-5)(3x-1) &=0 \\nonumber
\\end{align}
$$

$$
\\begin{align} \\nonumber
2x-5 = 0 \\quad &\\text{or} \\quad 3x-1=0 \\\\ \\nonumber
x = \\frac{5}{2} \\quad &\\text{or} \\quad x = \\frac{1}{3} \\nonumber
\\end{align}
$$

> ${prompt}.
    `;

    console.log(">>> hitting llm");
    const llmResult = await llm.predict(text);
    console.log(">>> response", llmResult);
    // const chatModelResult = await chatModel.predict(text);

    return llmResult;
    // console.log(chatModelResult);
}
