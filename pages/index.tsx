import {Chat} from "@/components/Chat/Chat";
import {Footer} from "@/components/Layout/Footer";
import {Navbar} from "@/components/Layout/Navbar";
import {Message} from "@/types";
import Head from "next/head";
import {useEffect, useRef, useState} from "react";

export default function Home() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const handleSend = async (message: Message) => {
        const updatedMessages = [...messages, message];

        setMessages(updatedMessages);
        setLoading(true);
        const url = "https://openai-wb-demo.herokuapp.com/chat_all";
        // const url = "http://127.0.0.1:5000/chat_all";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMessages)
        });
        if (!response.ok) {
            setLoading(false);
            throw new Error(response.statusText);
        }


        const data = response.body;

        if (!data) {
            return;
        }

        setLoading(false);

        let done = false;
        let isFirst = true;

        while (!done) {
            const jsonDict = await response.json();
            done = true;
            if (isFirst) {
                isFirst = false;
                setMessages((messages) => [
                    ...messages,
                    {
                        role: "assistant",
                        content: jsonDict['content'],
                        reference: jsonDict['reference']
                    }
                ]);
            } else {
                setMessages((messages) => {
                    const lastMessage = messages[messages.length - 1];
                    const updatedMessage = {
                        ...lastMessage,
                        content: lastMessage.content + jsonDict['content'],
                        reference: jsonDict["reference"]
                    };
                    console.log(updatedMessage);
                    console.log([...messages.slice(0, -1), updatedMessage]);
                    return [...messages.slice(0, -1), updatedMessage];
                });
            }
        }
    };

    const handleReset = () => {
        setMessages([
            {
                role: "assistant",
                content: `Hi there! This is Warren Buffett from the future, How can I help you?`,
                reference: ''
            }
        ]);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        setMessages([
            {
                role: "assistant",
                content: `Hi there! This is Warren Buffett from the future, How can I help you?`,
                reference: ''
            }
        ]);
    }, []);

    return (
        <>
            <Head>
                <title>ChatGPT Warren Buffett</title>
                <meta
                    name="description"
                    content="Warren Buffett Is Here!"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>

            <div className="flex flex-col h-screen">
                <Navbar/>

                <div className="flex-1 overflow-auto sm:px-10 pb-4 sm:pb-10">
                    <div className="max-w-[800px] mx-auto mt-4 sm:mt-12">
                        <Chat
                            messages={messages}
                            loading={loading}
                            onSend={handleSend}
                            onReset={handleReset}
                        />
                        <div ref={messagesEndRef}/>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}
