import { useEffect, useRef, useState } from "react";
import { useGetMessagesQuery, useSendMessageMutation } from "@/shared/redux/rtk-apis/messages/messages.api";
import socket from "@/lib/socket";
import { useSelector } from "react-redux";
import { TRootState } from "@/shared/redux/store";
import { LuSend } from "react-icons/lu";
import { FiPaperclip } from "react-icons/fi";

export default function ClassroomChat({ classroomId }: { classroomId: string }) {
  const [messageInput, setMessageInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef(null);
  const { data: fetchedMessages, refetch } = useGetMessagesQuery(classroomId);
  const [messages, setMessages] = useState<any[]>([]);
  const [sendMessage] = useSendMessageMutation();
  const user = useSelector((state: TRootState) => state.authenticatedUser);
  const userId = user.userId;

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  useEffect(() => {
    socket.connect();
    socket.emit("joinClassroom", Number(classroomId));
    const handleNewMessage = () => {
      refetch();
    };
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.disconnect();
    };
  }, [classroomId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageInput.trim() && !selectedFile) return;
    const formData = new FormData();
    formData.append("content", messageInput);
    formData.append("userId", userId);
    formData.append("classroomId", classroomId);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    await sendMessage({ formData: formData });
    socket.emit("sendMessage", { classroomId: Number(classroomId) });
    setMessageInput("");
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col h-[80vh] w-full">
    <div className="flex-1 overflow-y-auto p-4 bg-gray-900 text-white border-[2px] border-b-0 rounded-t-[10px]">
      {messages &&
        messages.length > 0 &&
        messages.map((message, index) => {
          const isSameSenderAsPrevious =
            index > 0 && messages[index - 1].sender.id === message.sender.id;
          return (
            <div
              key={message.id}
              className={`flex items-end mb-4 ${
                message.sender.id === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex items-start">
                {!isSameSenderAsPrevious && message.sender.id !== userId ? (
                  <div className="mr-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-red-500 text-white text-md font-bold">
                      {`${message.sender.firstName.charAt(0)}${message.sender.lastName.charAt(0)}`}
                    </div>
                  </div>
                ) : (
                  <div className="mr-2 w-9 h-9"></div> 
                )}
                <div
                  className={`max-w-md rounded-lg px-4 py-2 ${
                    message.sender.id === userId
                      ? "bg-[#27B981]"
                      : message.sender.role === "teacher"
                      ? "bg-[#3162EB]"
                      : "bg-gray-700"
                  } break-words`}
                >
                  <div className="flex justify-between">
                    {!isSameSenderAsPrevious && (
                      <span className="font-bold">{`${message.sender.firstName} ${message.sender.lastName}`}</span>
                    )}
                  </div>
                  <div className="mt-1 break-words">
                    {message.content}
                  </div>
                  {message.downloadUrl && (
                    <a
                      href={message.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-white text-black px-3 py-3 rounded-[5px] hover:bg-gray-200 my-2 transition"
                    >
                      <FiPaperclip className="text-sm mr-1" />
                      <span className='text-sm'>Attachment</span>
                    </a>
                  )}

                  <div className="text-sm text-gray-200 break-words">
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase()}
                  </div>

                </div>
                {!isSameSenderAsPrevious && message.sender.id === userId ? (
                  <div className="ml-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-500 text-white text-md font-bold">
                      {`${message.sender.firstName.charAt(0)}${message.sender.lastName.charAt(0)}`}
                    </div>
                  </div>
                ) : (
                  <div className="ml-2 w-9 h-9"></div> 
                )}
              </div>
            </div>
          );
        })}
      <div ref={messagesEndRef} />
    </div>
      <hr />
      <form onSubmit={handleSubmit} className="flex flex-col p-4 bg-gray-900 gap-2 border-[2px] border-t-0 rounded-b-[10px]">
        {selectedFile && (
          <div className="flex items-center justify-between bg-gray-700 text-white px-4 py-2 rounded-lg max-w-xs ml-11">
            <span className="truncate">
              {selectedFile.name.length > 15
                ? `${selectedFile.name.substring(0, 15)}...${selectedFile.name.split('.').pop()}`
                : selectedFile.name}
            </span>
            <button
              type="button"
              onClick={() => setSelectedFile(null)}
              className="text-red-400 hover:text-red-600"
            >
              ✖
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <label htmlFor="fileUpload" className="cursor-pointer p-2 bg-white rounded">
            <FiPaperclip className="text-xl text-black hover:text-blue-400 transition" />
          </label>
          <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} />
          <div className="relative flex-1">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Your message here"
              className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-700 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
            >
              <LuSend className="text-xl" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}