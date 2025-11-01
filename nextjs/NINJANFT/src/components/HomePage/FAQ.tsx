import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "什么是 Ninja Labs NFT?",
    answer:
      "Ninja Labs NFT 是一个包含 100 个独特像素赛博朋克忍者肖像的 NFT 集合。每个 Ninja 都是从不同的特征（发型、配饰、面部细节）中通过算法生成的，分为两个等级：白色背景（普通贡献者）和紫色背景（资深贡献者）。",
  },
  {
    question: "这里到底发生了什么？",
    answer:
      "Ninja Labs NFT 旨在构建一个专属的开发者社区身份系统。这是一个大规模的生成艺术作品，一种全新的数字所有权模式，以及一个内置的社区贡献激励系统。通过参与社区活动、贡献代码、分享知识等方式，你的 NFT 会随着贡献度提升而升级。",
  },
  {
    question: "如何获得一个 Ninja?",
    answer:
      "你可以前往铸造页面免费铸造你的第一个 Ninja NFT。只需要连接你的钱包，点击铸造按钮即可。铸造是完全免费的，只需要支付网络费用（Gas费）。",
  },
  {
    question: "Ninja 的图像存储在哪里？",
    answer:
      "所有 Ninja NFT 的图像和元数据都永久存储在去中心化的存储网络中，确保它们可以永久访问。智能合约部署在 Injective 区块链上，确保真正的所有权。",
  },
  {
    question: "Ninja 是 ERC-721 代币吗？",
    answer:
      "Ninja Labs NFT 部署在 Injective 区块链上，遵循类似的 NFT 标准。每个 NFT 都是唯一且不可替代的，可以在支持的市场上进行交易。",
  },
  {
    question: "网站上的市场数据来自哪里？",
    answer:
      "目前网站显示的是模拟数据。未来当我们集成真实的链上数据和市场交易后，所有数据都将来自 Injective 区块链，包括铸造、转移和交易记录。",
  },
  {
    question: "交易需要支付手续费吗？",
    answer:
      "铸造 NFT 是完全免费的，但你需要在 Injective 区块链上支付网络交易费用（Gas费）。未来如果涉及到市场交易，可能会有少量的平台手续费，这将完全透明地显示在交易界面中。",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <h2 className="title title-lg text-center mb-lg">Q&A</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleQuestion(index)}
            >
              <span>{item.question}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={`faq-icon ${openIndex === index ? "rotated" : ""}`}
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;

