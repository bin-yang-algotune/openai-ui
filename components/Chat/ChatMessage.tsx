import {Message} from "@/types";
import {FC} from "react";
import {ChatLoader} from "@/components/Chat/ChatLoader";

interface Props {
    message: Message;
}

export const ChatMessage: FC<Props> = ({message}) => {
    return (
        <div className={`flex flex-col ${message.role === "assistant" ? "items-start" : "items-end"}`}>
            <div
                className={`flex items-center ${message.role === "assistant" ? "bg-neutral-200 text-neutral-900" : "bg-blue-500 text-white"} rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
                style={{overflowWrap: "anywhere"}}
            >
                {message.content.replace(/['"]+/g, '')}
            </div>
            {message.reference && message.reference != '' && (
                <div
                    className={`flex items-center ${message.role === "assistant" ? "bg-neutral-200 text-neutral-900" : "bg-blue-500 text-white"} rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
                    style={{overflowWrap: "anywhere"}}
                >
                    <a href={message.reference} className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">{message.reference}</a>
                </div>
            )}

        </div>
    );
};
