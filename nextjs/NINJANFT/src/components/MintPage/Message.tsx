interface MessageProps {
  message: string
}

function Message({ message }: MessageProps) {
  if (!message) return null

  const isError = message.includes('失败') || message.includes('错误')

  return (
    <div className={`message ${isError ? 'error' : 'success'}`}>
      {message}
    </div>
  )
}

export default Message

